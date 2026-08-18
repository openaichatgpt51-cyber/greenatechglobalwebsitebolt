import { useEffect, useState } from 'react';
import { supabase, Insight } from '../lib/supabase';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';

const empty: Omit<Insight, 'id' | 'created_at' | 'updated_at'> = {
  title: '',
  category: 'AI & Tech',
  image_url: '',
  excerpt: '',
  content: '',
  sort_order: 0,
  published: true,
};

const categories = ['AI & Tech', 'Sustainability', 'How-to Guides', 'Entrepreneurship', 'General'];

export default function AdminInsights() {
  const [items, setItems] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Partial<Insight> }>({ open: false, editing: { ...empty } });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('insights').select('*').order('sort_order', { ascending: true });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openCreate() { setModal({ open: true, editing: { ...empty } }); setError(null); }
  function openEdit(item: Insight) { setModal({ open: true, editing: { ...item } }); setError(null); }

  async function save() {
    setError(null);
    if (!modal.editing.title?.trim()) { setError('Title is required'); return; }
    setSaving(true);
    if (modal.editing.id) {
      const { error } = await supabase.from('insights').update({
        title: modal.editing.title,
        category: modal.editing.category,
        image_url: modal.editing.image_url,
        excerpt: modal.editing.excerpt,
        content: modal.editing.content,
        sort_order: modal.editing.sort_order,
        published: modal.editing.published,
        updated_at: new Date().toISOString(),
      }).eq('id', modal.editing.id);
      if (error) { setError(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('insights').insert({
        title: modal.editing.title,
        category: modal.editing.category ?? 'General',
        image_url: modal.editing.image_url ?? '',
        excerpt: modal.editing.excerpt ?? '',
        content: modal.editing.content ?? '',
        sort_order: modal.editing.sort_order ?? 0,
        published: modal.editing.published ?? true,
      });
      if (error) { setError(error.message); setSaving(false); return; }
    }
    setSaving(false);
    setModal({ open: false, editing: { ...empty } });
    load();
  }

  async function togglePublished(item: Insight) {
    await supabase.from('insights').update({ published: !item.published, updated_at: new Date().toISOString() }).eq('id', item.id);
    load();
  }

  async function remove(id: string) {
    if (!confirm('Delete this insight?')) return;
    await supabase.from('insights').delete().eq('id', id);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Insights</h1>
          <p className="text-gray-500 text-sm mt-1">Manage blog articles and insights</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-brand-green text-black text-sm font-semibold px-5 py-2.5 hover:bg-lime-400 transition-colors">
          <Plus size={14} /> Add Insight
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#141414] border border-[#1a1a1a] p-10 text-center">
          <p className="text-gray-500 text-sm">No insights yet. Create your first one.</p>
        </div>
      ) : (
        <div className="bg-[#141414] border border-[#1a1a1a] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                {['Title', 'Category', 'Status', 'Sort', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs text-gray-500 font-semibold uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/2 group">
                  <td className="px-5 py-3.5 text-white font-medium max-w-xs truncate">{item.title}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{item.category}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 ${item.published ? 'bg-brand-green/10 text-brand-green' : 'bg-gray-500/10 text-gray-500'}`}>
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs">{item.sort_order}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => togglePublished(item)} className="p-1.5 text-gray-500 hover:text-white transition-colors">
                        {item.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => openEdit(item)} className="p-1.5 text-gray-500 hover:text-brand-green transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => remove(item.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setModal({ open: false, editing: { ...empty } })} />
          <div className="relative w-full max-w-2xl bg-[#141414] border border-[#222] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#222]">
              <h3 className="font-black text-white">{modal.editing.id ? 'Edit Insight' : 'New Insight'}</h3>
              <button onClick={() => setModal({ open: false, editing: { ...empty } })} className="text-gray-500 hover:text-white"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-5">
              {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3">{error}</p>}
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Title</label>
                <input value={modal.editing.title ?? ''} onChange={(e) => setModal((m) => ({ ...m, editing: { ...m.editing, title: e.target.value } }))} className="admin-input w-full" placeholder="Article title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Category</label>
                  <select value={modal.editing.category ?? 'General'} onChange={(e) => setModal((m) => ({ ...m, editing: { ...m.editing, category: e.target.value } }))} className="admin-input w-full">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Sort Order</label>
                  <input type="number" value={modal.editing.sort_order ?? 0} onChange={(e) => setModal((m) => ({ ...m, editing: { ...m.editing, sort_order: +e.target.value } }))} className="admin-input w-full" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Image URL</label>
                <input value={modal.editing.image_url ?? ''} onChange={(e) => setModal((m) => ({ ...m, editing: { ...m.editing, image_url: e.target.value } }))} className="admin-input w-full" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Excerpt</label>
                <textarea rows={2} value={modal.editing.excerpt ?? ''} onChange={(e) => setModal((m) => ({ ...m, editing: { ...m.editing, excerpt: e.target.value } }))} className="admin-input w-full resize-none" placeholder="Short summary..." />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Full Content</label>
                <textarea rows={6} value={modal.editing.content ?? ''} onChange={(e) => setModal((m) => ({ ...m, editing: { ...m.editing, content: e.target.value } }))} className="admin-input w-full resize-none font-mono text-xs" placeholder="Article content..." />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={modal.editing.published ?? true} onChange={(e) => setModal((m) => ({ ...m, editing: { ...m.editing, published: e.target.checked } }))} className="w-4 h-4 accent-brand-green" />
                <span className="text-sm text-gray-300">Published</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#222]">
              <button onClick={() => setModal({ open: false, editing: { ...empty } })} className="px-5 py-2 text-sm text-gray-400 hover:text-white border border-[#333] hover:border-gray-500 transition-colors">Cancel</button>
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
