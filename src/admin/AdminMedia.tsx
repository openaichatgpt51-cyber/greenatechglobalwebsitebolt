import { useEffect, useState } from 'react';
import { supabase, MediaItem } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Trash2, Image, FileText, Video, X, Save, Copy, CheckCheck } from 'lucide-react';

export default function AdminMedia() {
  const { user } = useAuth();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', url: '', type: 'image' as MediaItem['type'] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('media_library').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function save() {
    setError(null);
    if (!form.name.trim() || !form.url.trim()) { setError('Name and URL are required'); return; }
    setSaving(true);
    const { error } = await supabase.from('media_library').insert({
      name: form.name,
      url: form.url,
      type: form.type,
      size_bytes: 0,
      uploaded_by: user?.id,
    });
    if (error) { setError(error.message); setSaving(false); return; }
    setSaving(false);
    setModal(false);
    setForm({ name: '', url: '', type: 'image' });
    load();
  }

  async function remove(id: string) {
    if (!confirm('Delete this media item?')) return;
    await supabase.from('media_library').delete().eq('id', id);
    load();
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  function TypeIcon({ type }: { type: MediaItem['type'] }) {
    if (type === 'video') return <Video size={14} className="text-sky-400" />;
    if (type === 'document') return <FileText size={14} className="text-amber-400" />;
    return <Image size={14} className="text-brand-green" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Media Library</h1>
          <p className="text-gray-500 text-sm mt-1">Manage images, videos, and documents</p>
        </div>
        <button onClick={() => { setModal(true); setError(null); }} className="flex items-center gap-2 bg-brand-green text-black text-sm font-semibold px-5 py-2.5 hover:bg-lime-400 transition-colors">
          <Plus size={14} /> Add Media
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#141414] border border-[#1a1a1a] p-10 text-center">
          <Image size={32} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No media yet. Add your first item.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group bg-[#141414] border border-[#1a1a1a] overflow-hidden hover:border-brand-green/30 transition-colors">
              {item.type === 'image' ? (
                <div className="aspect-square overflow-hidden bg-[#0a0a0a]">
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text y="18" font-size="16">🖼</text></svg>'; }} />
                </div>
              ) : (
                <div className="aspect-square bg-[#0a0a0a] flex items-center justify-center">
                  <TypeIcon type={item.type} />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <TypeIcon type={item.type} />
                  <span className="text-xs text-white font-medium truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <button onClick={() => copyUrl(item.url)} className="flex-1 flex items-center justify-center gap-1 py-1 text-xs text-gray-500 hover:text-white border border-[#222] hover:border-gray-500 transition-colors">
                    {copied === item.url ? <CheckCheck size={11} className="text-brand-green" /> : <Copy size={11} />}
                    {copied === item.url ? 'Copied' : 'Copy URL'}
                  </button>
                  <button onClick={() => remove(item.id)} className="p-1 text-gray-600 hover:text-red-400 transition-colors border border-[#222] hover:border-red-400">
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setModal(false)} />
          <div className="relative w-full max-w-md bg-[#141414] border border-[#222] shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#222]">
              <h3 className="font-black text-white">Add Media</h3>
              <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-5">
              {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3">{error}</p>}
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Name</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="admin-input w-full" placeholder="Display name" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">URL</label>
                <input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} className="admin-input w-full" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Type</label>
                <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as MediaItem['type'] }))} className="admin-input w-full">
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#222]">
              <button onClick={() => setModal(false)} className="px-5 py-2 text-sm text-gray-400 hover:text-white border border-[#333] hover:border-gray-500 transition-colors">Cancel</button>
              <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-brand-green text-black text-sm font-semibold hover:bg-lime-400 transition-colors disabled:opacity-60">
                {saving ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Save size={14} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
