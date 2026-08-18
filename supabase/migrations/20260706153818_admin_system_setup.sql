
/*
# Admin System & Site Settings Setup

## Overview
Creates the full backend structure for:
1. Admin role management (super_admin and sub_admin roles)
2. Site settings / feature flags (e.g. venture_studio_enabled)
3. Site content management (case studies, insights, services, etc.)
4. Analytics/visitor tracking events
5. Media library

## New Tables

### admin_roles
Tracks which Supabase auth users are admins and their role level.
- `id` (uuid, pk)
- `user_id` (uuid, FK → auth.users)
- `role` (text: 'super_admin' | 'sub_admin')
- `created_at` (timestamptz)

### site_settings
Key-value store for feature flags and configurable settings.
- `key` (text, pk)
- `value` (jsonb)
- `updated_at` (timestamptz)
- `updated_by` (uuid, FK → auth.users)

### case_studies
Manageable case study entries shown on the site.
- `id` (uuid, pk)
- `title` (text)
- `tags` (text[])
- `image_url` (text)
- `description` (text)
- `category` (text)
- `sort_order` (int)
- `published` (boolean)
- `created_at`, `updated_at`

### insights
Blog/insights articles.
- `id` (uuid, pk)
- `title` (text)
- `category` (text)
- `image_url` (text)
- `excerpt` (text)
- `content` (text)
- `sort_order` (int)
- `published` (boolean)
- `created_at`, `updated_at`

### media_library
Uploaded or referenced media assets.
- `id` (uuid, pk)
- `name` (text)
- `url` (text)
- `type` (text: 'image' | 'video' | 'document')
- `size_bytes` (bigint)
- `uploaded_by` (uuid)
- `created_at`

### analytics_events
Simple visitor event tracking.
- `id` (uuid, pk)
- `event_type` (text)
- `page` (text)
- `metadata` (jsonb)
- `created_at`

## Security
- RLS enabled on all tables.
- admin_roles: only authenticated users who are admins can read; only super_admins can write.
- site_settings: public read for anon (so frontend can read feature flags); admin write only.
- case_studies/insights: public read for published; admin write only.
- media_library: admin only.
- analytics_events: anon insert (tracking); admin read.

## Seed Data
- Inserts default site_settings for venture_studio_enabled = false.
*/

-- Admin roles table
CREATE TABLE IF NOT EXISTS admin_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('super_admin', 'sub_admin')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins_select_roles" ON admin_roles;
CREATE POLICY "admins_select_roles" ON admin_roles FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid())
);

DROP POLICY IF EXISTS "super_admin_insert_roles" ON admin_roles;
CREATE POLICY "super_admin_insert_roles" ON admin_roles FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin')
);

DROP POLICY IF EXISTS "super_admin_update_roles" ON admin_roles;
CREATE POLICY "super_admin_update_roles" ON admin_roles FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin'))
WITH CHECK (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin'));

DROP POLICY IF EXISTS "super_admin_delete_roles" ON admin_roles;
CREATE POLICY "super_admin_delete_roles" ON admin_roles FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin'));

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT 'null',
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_settings" ON site_settings;
CREATE POLICY "public_read_settings" ON site_settings FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "admin_insert_settings" ON site_settings;
CREATE POLICY "admin_insert_settings" ON site_settings FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_update_settings" ON site_settings;
CREATE POLICY "admin_update_settings" ON site_settings FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_delete_settings" ON site_settings;
CREATE POLICY "admin_delete_settings" ON site_settings FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin'));

-- Case studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  image_url text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_case_studies" ON case_studies;
CREATE POLICY "public_read_case_studies" ON case_studies FOR SELECT
TO anon, authenticated
USING (published = true);

DROP POLICY IF EXISTS "admin_read_all_case_studies" ON case_studies;
CREATE POLICY "admin_read_all_case_studies" ON case_studies FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_insert_case_studies" ON case_studies;
CREATE POLICY "admin_insert_case_studies" ON case_studies FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_update_case_studies" ON case_studies;
CREATE POLICY "admin_update_case_studies" ON case_studies FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_delete_case_studies" ON case_studies;
CREATE POLICY "admin_delete_case_studies" ON case_studies FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

-- Insights / articles table
CREATE TABLE IF NOT EXISTS insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  image_url text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_insights" ON insights;
CREATE POLICY "public_read_insights" ON insights FOR SELECT
TO anon, authenticated
USING (published = true);

DROP POLICY IF EXISTS "admin_insert_insights" ON insights;
CREATE POLICY "admin_insert_insights" ON insights FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_update_insights" ON insights;
CREATE POLICY "admin_update_insights" ON insights FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_delete_insights" ON insights;
CREATE POLICY "admin_delete_insights" ON insights FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

-- Media library table
CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  type text NOT NULL DEFAULT 'image' CHECK (type IN ('image','video','document')),
  size_bytes bigint NOT NULL DEFAULT 0,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_select_media" ON media_library;
CREATE POLICY "admin_select_media" ON media_library FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_insert_media" ON media_library;
CREATE POLICY "admin_insert_media" ON media_library FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_update_media" ON media_library;
CREATE POLICY "admin_update_media" ON media_library FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_delete_media" ON media_library;
CREATE POLICY "admin_delete_media" ON media_library FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

-- Analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  page text NOT NULL DEFAULT '/',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_analytics" ON analytics_events;
CREATE POLICY "anon_insert_analytics" ON analytics_events FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_analytics" ON analytics_events;
CREATE POLICY "admin_select_analytics" ON analytics_events FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_delete_analytics" ON analytics_events;
CREATE POLICY "admin_delete_analytics" ON analytics_events FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin'));

-- Seed default site settings
INSERT INTO site_settings (key, value) VALUES
  ('venture_studio_enabled', 'false'),
  ('site_announcement', 'null'),
  ('maintenance_mode', 'false')
ON CONFLICT (key) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_admin_roles_user_id ON admin_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(published, sort_order);
CREATE INDEX IF NOT EXISTS idx_insights_published ON insights(published, sort_order);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
