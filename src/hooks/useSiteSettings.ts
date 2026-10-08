import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { registerPrerenderTask } from '../lib/prerenderReady';

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const done = registerPrerenderTask('site_settings');
    Promise.resolve(supabase.from('site_settings').select('key, value'))
      .then(({ data }) => {
        const map: Record<string, unknown> = {};
        (data ?? []).forEach((s) => { map[s.key] = s.value; });
        setSettings(map);
        setLoaded(true);
        done();
      })
      .catch(() => {
        done();
      });
  }, []);

  return { settings, loaded };
}
