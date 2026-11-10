/*
# Stop exposing notification_email to the public

1. Problem
- The original policy "public_read_settings" allowed anon SELECT on every
  site_settings row. The frontend uses the public anon key, so anyone could
  read notification_email through the Supabase REST API.

2. Changes
- public_read_settings now excludes the notification_email key.
- A new policy lets signed-in admins read every setting, so the admin
  Settings panel keeps working.

3. Notes
- The contact notification function should read CONTACT_NOTIFY_EMAIL from its
  secrets first; this table value is only a fallback.
- If an address was already saved in this setting, treat it as having been
  publicly readable until this migration is applied.
*/

DROP POLICY IF EXISTS "public_read_settings" ON site_settings;
CREATE POLICY "public_read_settings" ON site_settings FOR SELECT
TO anon, authenticated
USING (key NOT IN ('notification_email'));

DROP POLICY IF EXISTS "admin_read_all_settings" ON site_settings;
CREATE POLICY "admin_read_all_settings" ON site_settings FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));
