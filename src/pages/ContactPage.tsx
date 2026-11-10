import { useMemo, useState } from 'react';
import { ArrowRight, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

const services = [
  'Enterprise Solutions',
  'AI & Machine Learning',
  'Cloud Solutions',
  'Cybersecurity',
  'Digital Transformation',
  'Corporate Training',
  'The Next Generation Hub',
  'Careers / Join the team',
  'General Enquiry',
];

const timeSlots = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
];

const meetingFormats = ['Video call', 'Phone call', 'In person (Yaba, Lagos)'];

type RequestType = 'enquiry' | 'booking';

const enquiryTypes: { title: string; desc: string; href: string; requestType?: RequestType }[] = [
  { title: 'Book a discovery call', desc: 'Pick a time and we will confirm it by email.', href: '#contact-form', requestType: 'booking' },
  { title: 'Work with us', desc: "Have a challenge? We'll engineer the solution.", href: '#contact-form', requestType: 'enquiry' },
  { title: 'Grow your career', desc: 'Join our mission-driven collective.', href: '#contact-form', requestType: 'enquiry' },
  { title: 'General enquiries', desc: 'Questions about our company or products.', href: '#contact-form', requestType: 'enquiry' },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    requestType: 'enquiry' as RequestType,
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    date: '',
    time: '',
    format: meetingFormats[0],
    website: '', // honeypot: real visitors never fill this in
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const isBooking = form.requestType === 'booking';

  // Earliest bookable day is tomorrow (Africa/Lagos weekdays only, enforced on submit)
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    // Honeypot: bots fill hidden fields. Pretend success and drop it.
    if (form.website) {
      setStatus('success');
      return;
    }

    if (isBooking) {
      const day = new Date(`${form.date}T12:00:00`).getDay();
      if (!form.date || !form.time) {
        setStatus('error');
        setErrorMsg('Please choose a preferred date and time.');
        return;
      }
      if (day === 0 || day === 6) {
        setStatus('error');
        setErrorMsg('We take calls on weekdays. Please choose a Monday to Friday date.');
        return;
      }
    }

    setStatus('submitting');

    const timeLabel = timeSlots.find((t) => t.value === form.time)?.label ?? form.time;
    const bookingLine = isBooking
      ? `BOOKING REQUEST: ${form.date} at ${timeLabel} WAT (${form.format})`
      : null;
    const fullMessage = [bookingLine, form.message.trim()].filter(Boolean).join('\n\n');
    const serviceValue = isBooking
      ? `Discovery call${form.service ? ` - ${form.service}` : ''}`
      : form.service || null;

    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      company: form.company || null,
      service: serviceValue,
      message: fullMessage,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
      return;
    }

    // The submission is already saved above; the email notification is best-effort.
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        company: form.company || null,
        service: serviceValue,
        message: fullMessage,
        request_type: form.requestType,
        preferred_date: isBooking ? form.date : null,
        preferred_time: isBooking ? timeLabel : null,
        meeting_format: isBooking ? form.format : null,
      }),
    }).catch(() => {});

    setStatus('success');
    setForm((prev) => ({
      ...prev,
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
      date: '',
      time: '',
    }));
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Navbar />
      <PageHero
        eyebrow="Contact Us"
        title={<>Let's build what's next.</>}
        subtitle="Tell us about your challenge. We'll engineer the AI solution that automates your growth and secures your lead, or answer any questions about our services, products, and training programmes."
        image="https://images.pexels.com/photos/8439695/pexels-photo-8439695.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Enquiry type cards */}
      <section className="py-16 lg:py-20 bg-brand-dark">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border">
            {enquiryTypes.map((t) => (
              <a
                key={t.title}
                href={t.href}
                onClick={() => t.requestType && updateField('requestType', t.requestType)}
                className="bg-brand-dark p-8 group hover:bg-brand-card transition-colors duration-300"
              >
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-brand-green transition-colors">
                  {t.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section id="contact-form" className="py-24 lg:py-32 bg-[#0a0a0a] scroll-mt-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left — info */}
            <div className="lg:col-span-4">
              <div className="flex items-center mb-6">
                <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                  Get in touch
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6">
                Are you ready to scale?
              </h2>
              <p className="text-gray-400 leading-relaxed mb-10">
                Drop us a line and we'll be in touch within 24 hours. Whether you need an enterprise
                solution, corporate training, or want to join our team — we'd love to hear from you.
              </p>

              <div className="space-y-5">
                <a
                  href="mailto:info@greenatechglobal.com"
                  className="flex items-start gap-3 text-gray-400 text-sm hover:text-white transition-colors group"
                >
                  <Mail size={18} className="mt-0.5 flex-shrink-0 text-brand-green" />
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Email</div>
                    info@greenatechglobal.com
                  </div>
                </a>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0 text-brand-green" />
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Office</div>
                    294 Herbert Macaulay Way,<br />Yaba, Lagos, Nigeria
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-8">
              {status === 'success' ? (
                <div className="border border-brand-green/30 bg-brand-green/5 p-10 lg:p-14 text-center">
                  <div className="w-16 h-16 bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={28} className="text-brand-green" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">
                    {isBooking ? 'Request received.' : 'Message received.'}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">
                    {isBooking
                      ? "Thank you. We'll confirm your slot, or suggest the nearest alternative, by email within 24 hours."
                      : "Thank you for reaching out. We'll get back to you within 24 hours."}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-6 py-3 hover:bg-white hover:text-brand-dark transition-all duration-200"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-px bg-brand-border" role="group" aria-label="Request type">
                    {([
                      { value: 'enquiry', label: 'Make an enquiry' },
                      { value: 'booking', label: 'Book a discovery call' },
                    ] as { value: RequestType; label: string }[]).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateField('requestType', opt.value)}
                        aria-pressed={form.requestType === opt.value}
                        className={`px-4 py-3.5 text-sm font-semibold transition-colors ${
                          form.requestType === opt.value
                            ? 'bg-brand-green text-black'
                            : 'bg-brand-dark text-gray-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(e) => updateField('website', e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                        Full name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full bg-brand-dark border border-brand-border text-white text-sm px-4 py-3.5 outline-none focus:border-brand-green transition-colors"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full bg-brand-dark border border-brand-border text-white text-sm px-4 py-3.5 outline-none focus:border-brand-green transition-colors"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        className="w-full bg-brand-dark border border-brand-border text-white text-sm px-4 py-3.5 outline-none focus:border-brand-green transition-colors"
                        placeholder="Company name (optional)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                        What can we help with?
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => updateField('service', e.target.value)}
                        className="w-full bg-brand-dark border border-brand-border text-white text-sm px-4 py-3.5 outline-none focus:border-brand-green transition-colors"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {isBooking && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                          Preferred date *
                        </label>
                        <input
                          type="date"
                          required
                          min={minDate}
                          value={form.date}
                          onChange={(e) => updateField('date', e.target.value)}
                          className="w-full bg-brand-dark border border-brand-border text-white text-sm px-4 py-3.5 outline-none focus:border-brand-green transition-colors [color-scheme:dark]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                          Preferred time (WAT) *
                        </label>
                        <select
                          required
                          value={form.time}
                          onChange={(e) => updateField('time', e.target.value)}
                          className="w-full bg-brand-dark border border-brand-border text-white text-sm px-4 py-3.5 outline-none focus:border-brand-green transition-colors"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                          Format
                        </label>
                        <select
                          value={form.format}
                          onChange={(e) => updateField('format', e.target.value)}
                          className="w-full bg-brand-dark border border-brand-border text-white text-sm px-4 py-3.5 outline-none focus:border-brand-green transition-colors"
                        >
                          {meetingFormats.map((f) => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                      {isBooking ? 'Anything we should prepare? (optional)' : 'Your message *'}
                    </label>
                    <textarea
                      required={!isBooking}
                      rows={isBooking ? 4 : 6}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className="w-full bg-brand-dark border border-brand-border text-white text-sm px-4 py-3.5 outline-none focus:border-brand-green transition-colors resize-none"
                      placeholder={isBooking ? 'A line or two on what you would like to cover...' : 'Tell us about your challenge, goals, or question...'}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 border border-rose-500/30 bg-rose-500/5 p-4">
                      <AlertCircle size={18} className="text-rose-400 mt-0.5 flex-shrink-0" />
                      <p className="text-rose-300 text-sm">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center gap-3 bg-brand-green text-black text-sm font-semibold px-8 py-4 hover:bg-lime-400 transition-colors duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Sending...' : isBooking ? 'Request this time' : 'Share your challenge'}
                    {status !== 'submitting' && (
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
