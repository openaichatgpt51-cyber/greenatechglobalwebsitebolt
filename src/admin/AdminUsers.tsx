import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { AdminRole } from '../lib/supabase';
import { Plus, Trash2, Shield, X, Save, AlertCircle } from 'lucide-react';

interface AdminUser {
  id: string;
  user_id: string;
  role: AdminRole;
  created_at: string;
  email?: string;
}

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ email: '', role: 'sub_admin' as AdminRole });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('admin_roles').select('*').order('created_at', { ascending: false });
    setUsers((data as AdminUser[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addAdmin() {
    setError(null);
    setSuccess(null);
    if (!form.email.trim()) { setError('Email is required'); return; }
    setSaving(true);

    // Look up the user by email via a sign-up attempt with a random password
    // Since we can't look up users from frontend, we note the user must sign up first
    // We'll look up using auth metadata
    const { data: existingUsers, error: lookupError } = await supabase
      .from('admin_roles')
      .select('user_id')
      .limit(1);

    if (lookupError) { setError(lookupError.message); setSaving(false); return; }

    // Inform the admin the user needs to exist first
    setError('To grant admin access: the user must first register on the site. Then provide their user ID (from the Supabase dashboard) or ask them to share their UUID. Direct email-based admin assignment requires a server-side function.');
    setSaving(false);
  }

  async function removeAdmin(userId: string) {
    if (userId === currentUser?.id) { alert('You cannot remove your own admin role.'); return; }
    if (!confirm('Remove this admin?')) return;
    await supabase.from('admin_roles').delete().eq('user_id', userId);
    load();
  }

  async function addByUserId(userId: string, role: AdminRole) {
    setError(null);
    if (!userId.trim()) { setError('User ID is required'); return; }
    setSaving(true);
    const { error } = await supabase.from('admin_roles').upsert({ user_id: userId, role });
    if (error) { setError(error.message); setSaving(false); return; }
    setSuccess('Admin role granted successfully.');
    setSaving(false);
    setModal(false);
    load();
    setTimeout(() => setSuccess(null), 3000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage admin access and roles</p>
        </div>
        <button onClick={() => { setModal(true); setError(null); setSuccess(null); }} className="flex items-center gap-2 bg-brand-green text-black text-sm font-semibold px-5 py-2.5 hover:bg-lime-400 transition-colors">
          <Plus size={14} /> Add Admin
        </button>
      </div>

      {success && (
        <div className="bg-brand-green/10 border border-brand-green/20 px-4 py-3 text-brand-green text-sm">
          {success}
        </div>
      )}

      <div className="bg-[#141414] border border-[#1a1a1a] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1a1a1a]">
          <p className="text-xs text-gray-500">
            Admin users can access the admin portal. Super admins have full access including settings and user management. Sub-admins can manage content only.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-5 h-5 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center">
            <Shield size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No admins configured.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                {['User ID', 'Role', 'Added', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs text-gray-500 font-semibold uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {users.map((u) => (
                <tr key={u.id} className="group hover:bg-white/2">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-white text-xs font-mono">{u.user_id}</p>
                      {u.user_id === currentUser?.id && (
                        <span className="text-xs text-brand-green">(you)</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Shield size={12} className={u.role === 'super_admin' ? 'text-brand-green' : 'text-gray-500'} />
                      <span className={`text-xs font-semibold capitalize ${u.role === 'super_admin' ? 'text-brand-green' : 'text-gray-400'}`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => removeAdmin(u.user_id)}
                      disabled={u.user_id === currentUser?.id}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-red-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setModal(false)} />
          <GrantAdminModal onClose={() => setModal(false)} onGrant={addByUserId} />
        </div>
      )}
    </div>
  );
}

function GrantAdminModal({ onClose, onGrant }: { onClose: () => void; onGrant: (userId: string, role: AdminRole) => void }) {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState<AdminRole>('sub_admin');
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-md bg-[#141414] border border-[#222] shadow-2xl">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#222]">
        <h3 className="font-black text-white">Grant Admin Access</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={16} /></button>
      </div>
      <div className="p-6 space-y-5">
        <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-amber-400 text-xs flex gap-2">
          <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
          The user must register on the site first. Get their UUID from the Supabase Auth dashboard or from their profile.
        </div>
        {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3">{error}</p>}
        <div>
          <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">User ID (UUID)</label>
          <input value={userId} onChange={(e) => setUserId(e.target.value)} className="admin-input w-full font-mono text-xs" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as AdminRole)} className="admin-input w-full">
            <option value="sub_admin">Sub Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#222]">
        <button onClick={onClose} className="px-5 py-2 text-sm text-gray-400 hover:text-white border border-[#333] hover:border-gray-500 transition-colors">Cancel</button>
        <button
          onClick={() => {
            if (!userId.trim()) { setError('User ID is required'); return; }
            onGrant(userId, role);
          }}
          className="flex items-center gap-2 px-5 py-2 bg-brand-green text-black text-sm font-semibold hover:bg-lime-400 transition-colors"
        >
          <Save size={14} />
          Grant Access
        </button>
      </div>
    </div>
  );
}
