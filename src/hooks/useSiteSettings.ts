import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from('site_settings').select('key, value').then(({ data }) => {
      const map: Record<string, unknown> = {};
      (data ?? []).forEach((s) => { map[s.key] = s.value; });
      setSettings(map);
      setLoaded(true);
    });
  }, []);

  return { settings, loaded };
}
