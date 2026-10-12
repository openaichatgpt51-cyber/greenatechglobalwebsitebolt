/*
# Add notification_email site setting

1. Changes
- Inserts a new site_settings row with key 'notification_email' and value null.
- This email address will receive a notification when the contact form is submitted.
- It is editable from the admin settings panel and never exposed on the public frontend.

2. Security
- No schema changes. RLS already allows public SELECT on site_settings (needed for frontend feature flags).
- The notification_email value is only read by the edge function (server-side, service role key), never by the frontend.
*/

INSERT INTO site_settings (key, value) VALUES
  ('notification_email', 'null')
ON CONFLICT (key) DO NOTHING;
