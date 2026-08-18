import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Save, RefreshCw, ToggleLeft, ToggleRight, AlertCircle, CheckCircle } from 'lucide-react';

interface Setting {
  key: string;
  value: unknown;
  updated_at: string;
}

const settingMeta: Record<string, { label: string; description: string; type: 'toggle' | 'text' }> = {
  venture_studio_enabled: {
    label: 'Venture Studio Section',
    description: 'Show or hide the Venture Studio section on the main site.',
    type: 'toggle',
  },
  site_announcement: {
    label: 'Site Announcement',
    description: 'Show a banner announcement at the top of the site. Leave null to disable.',
    type: 'text',
  },
  maintenance_mode: {
    label: 'Maintenance Mode',
    description: 'Enable to show a maintenance message to site visitors.',
    type: 'toggle',
  },
};

export default function AdminSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ key: string; ok: boolean; msg: string } | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('site_settings').select('*');
    setSettings(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateSetting(key: string, value: unknown) {
    setSaving(key);
    setFeedback(null);
    const { error } = await supabase.from('site_settings').upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
      updated_by: user?.id,
    });
    if (error) {
      setFeedback({ key, ok: false, msg: error.message });
    } else {
      setFeedback({ key, ok: true, msg: 'Saved' });
      load();
      setTimeout(() => setFeedback(null), 3000);
    }
    setSaving(null);
  }

  function getValue(key: string): unknown {
    return settings.find((s) => s.key === key)?.value ?? null;
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Site Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Control site-wide features and configuration</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(settingMeta).map(([key, meta]) => {
          const value = getValue(key);
          const isSaving = saving === key;
          const thisFeedback = feedback?.key === key ? feedback : null;

          return (
            <div key={key} className="bg-[#141414] border border-[#1a1a1a] p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm">{meta.label}</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{meta.description}</p>
                  <p className="text-gray-700 text-xs mt-2 font-mono">key: {key}</p>
                  {thisFeedback && (
                    <div className={`flex items-center gap-2 mt-3 text-xs ${thisFeedback.ok ? 'text-brand-green' : 'text-red-400'}`}>
                      {thisFeedback.ok ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      {thisFeedback.msg}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 flex items-center gap-3">
                  {meta.type === 'toggle' ? (
                    <button
                      onClick={() => updateSetting(key, !value)}
                      disabled={isSaving}
                      className="flex items-center gap-2 text-sm transition-colors disabled:opacity-60"
                    >
                      {isSaving ? (
                        <span className="w-4 h-4 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
                      ) : value ? (
                        <ToggleRight size={28} className="text-brand-green" />
                      ) : (
                        <ToggleLeft size={28} className="text-gray-600" />
                      )}
                      <span className={`text-xs font-semibold ${value ? 'text-brand-green' : 'text-gray-600'}`}>
                        {value ? 'Enabled' : 'Disabled'}
                      </span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        defaultValue={typeof value === 'string' ? value : ''}
                        onBlur={(e) => updateSetting(key, e.target.value || null)}
                        className="admin-input w-48 text-xs"
                        placeholder="null (disabled)"
                      />
                      {isSaving && <span className="w-4 h-4 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom settings section */}
      <div className="bg-[#141414] border border-[#1a1a1a] p-6">
        <h3 className="text-sm font-semibold text-white mb-4">All Settings (Raw)</h3>
        <div className="space-y-2 font-mono text-xs">
          {settings.map((s) => (
            <div key={s.key} className="flex items-center gap-4 py-2 border-b border-[#1a1a1a] last:border-0">
              <span className="text-gray-500 w-48 truncate">{s.key}</span>
              <span className="text-brand-green flex-1 truncate">{JSON.stringify(s.value)}</span>
              <span className="text-gray-700">{new Date(s.updated_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
