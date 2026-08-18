import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AdminRole = 'super_admin' | 'sub_admin';

export interface SiteSetting {
  key: string;
  value: unknown;
  updated_at: string;
  updated_by: string | null;
}

export interface CaseStudy {
  id: string;
  title: string;
  tags: string[];
  image_url: string;
  description: string;
  category: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Insight {
  id: string;
  title: string;
  category: string;
  image_url: string;
  excerpt: string;
  content: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  page: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size_bytes: number;
  uploaded_by: string | null;
  created_at: string;
}

export async function getSetting(key: string): Promise<unknown> {
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();
  return data?.value ?? null;
}

export async function trackEvent(event_type: string, page: string, metadata: Record<string, unknown> = {}) {
  await supabase.from('analytics_events').insert({ event_type, page, metadata });
}
