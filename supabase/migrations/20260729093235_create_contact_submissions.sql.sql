/*
# Create contact_submissions table

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email
  - `company` (text) — optional company name
  - `service` (text) — which service they're interested in (Enterprise Solutions, Training, Careers, General)
  - `message` (text, not null) — the challenge / message body
  - `status` (text, default 'new') — processing status: new, read, responded, archived
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated to INSERT (the contact form is public, no sign-in required).
- Allow authenticated to SELECT, UPDATE, DELETE (admins manage submissions from the panel).
- No public SELECT — visitors can only submit, never read other people's submissions.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_select_contact_submissions"
ON contact_submissions FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_update_contact_submissions"
ON contact_submissions FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_delete_contact_submissions"
ON contact_submissions FOR DELETE
TO authenticated USING (true);
