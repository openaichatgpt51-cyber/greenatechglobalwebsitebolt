import { useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Image, FileText, BookOpen, Users,
  LogOut, Menu, X, ChevronRight, Shield, Mail, Lock, Eye, EyeOff, AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import AdminCaseStudies from './AdminCaseStudies';
import AdminInsights from './AdminInsights';
import AdminSettings from './AdminSettings';
import AdminMedia from './AdminMedia';
import AdminUsers from './AdminUsers';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: FileText, label: 'Case Studies', path: '/admin/case-studies' },
  { icon: BookOpen, label: 'Insights', path: '/admin/insights' },
  { icon: Image, label: 'Media Library', path: '/admin/media' },
  { icon: Users, label: 'User Management', path: '/admin/users', superOnly: true },
  { icon: Settings, label: 'Settings', path: '/admin/settings', superOnly: true },
];

function AuthForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-red-400 text-xs">
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Email</label>
        <div className="relative">
          <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-[#333] text-white text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-brand-green transition-colors placeholder:text-gray-600"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Password</label>
        <div className="relative">
          <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-[#333] text-white text-sm pl-10 pr-10 py-3 focus:outline-none focus:border-brand-green transition-colors placeholder:text-gray-600"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-green text-black text-sm font-semibold py-3.5 hover:bg-lime-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}

export default function AdminLayout() {
  const { user, adminRole, signOut, loading } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !adminRole) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#141414] border border-[#222] p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white rounded px-2 py-1">
                <img src="/Main_Logo.png" alt="Greenatech" className="h-5 w-auto" />
              </div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Admin</span>
            </div>
            <h2 className="text-xl font-black text-white mb-2">Admin Sign In</h2>
            <p className="text-gray-500 text-xs mb-6">
              {user
                ? 'Your account does not have admin access.'
                : 'Sign in with your admin account to access the panel.'}
            </p>
            <AuthForm />
          </div>
        </div>
      </div>
    );
  }

  const filteredNav = navItems.filter(item => !item.superOnly || adminRole === 'super_admin');

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded px-2 py-1">
              <img src="/Main_Logo.png" alt="Greenatech" className="h-5 w-auto" />
            </div>
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-5 py-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-brand-green" />
            <span className="text-brand-green text-xs font-semibold uppercase tracking-wider">
              {adminRole === 'super_admin' ? 'Super Admin' : 'Sub Admin'}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1 truncate">{user.email}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {filteredNav.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150 group ${
                  active
                    ? 'bg-brand-green/10 text-brand-green border-l-2 border-brand-green'
                    : 'text-gray-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <Icon size={15} />
                <span className="font-medium">{label}</span>
                {active && <ChevronRight size={12} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-[#1a1a1a]">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronRight size={15} className="rotate-180" />
            Back to site
          </Link>
          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-500 hover:text-red-400 transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0d0d0d]/95 backdrop-blur border-b border-[#1a1a1a] flex items-center gap-4 px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-2 h-2 bg-brand-green rounded-full" />
            Greenatech Admin Portal
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="case-studies" element={<AdminCaseStudies />} />
            <Route path="insights" element={<AdminInsights />} />
            <Route path="media" element={<AdminMedia />} />
            {adminRole === 'super_admin' && (
              <>
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<AdminSettings />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
