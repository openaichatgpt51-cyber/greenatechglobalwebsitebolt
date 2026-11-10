import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

// Keep header-style fields to one line and a sane length.
const oneLine = (value: unknown, max: number) =>
  String(value ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const name = oneLine(body.name, 120);
    const email = oneLine(body.email, 200);
    const company = oneLine(body.company, 160);
    const service = oneLine(body.service, 160);
    const message = String(body.message ?? "").trim().slice(0, 5000);
    const isBooking = body.request_type === "booking";
    const preferredDate = oneLine(body.preferred_date, 20);
    const preferredTime = oneLine(body.preferred_time, 20);
    const meetingFormat = oneLine(body.meeting_format, 60);

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: jsonHeaders,
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: jsonHeaders,
      });
    }

    // Destination. A function secret is preferred because it is never readable
    // from the browser. The site_settings value is only a fallback.
    let notifyEmail = Deno.env.get("CONTACT_NOTIFY_EMAIL") ?? null;

    if (!notifyEmail) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );
      const { data: setting } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "notification_email")
        .maybeSingle();
      notifyEmail = (setting?.value as string | null) ?? null;
    }

    if (!notifyEmail) {
      return new Response(
        JSON.stringify({ ok: true, message: "No notification email configured" }),
        { status: 200, headers: jsonHeaders }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ ok: true, message: "No email service configured" }),
        { status: 200, headers: jsonHeaders }
      );
    }

    // Resend's shared onboarding@resend.dev sender only delivers to the Resend
    // account owner's own address. Verify greenatechglobal.com in Resend and set
    // CONTACT_FROM_EMAIL (e.g. "Greenatech <no-reply@greenatechglobal.com>").
    const from =
      Deno.env.get("CONTACT_FROM_EMAIL") ?? "Greenatech Contact <onboarding@resend.dev>";

    const emailBody = [
      isBooking ? "New discovery call booking request" : "New contact form submission",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      service ? `Service: ${service}` : null,
      isBooking ? `Preferred date: ${preferredDate}` : null,
      isBooking ? `Preferred time (WAT): ${preferredTime}` : null,
      isBooking && meetingFormat ? `Format: ${meetingFormat}` : null,
      "",
      "Message:",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const subject = isBooking
      ? `Booking request from ${name}: ${preferredDate} ${preferredTime}`
      : `New contact form submission from ${name}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: notifyEmail,
        reply_to: email,
        subject,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend API error:", errText);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: jsonHeaders,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
});
