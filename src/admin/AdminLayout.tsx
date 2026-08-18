import { useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Image, FileText, BookOpen, Users,
  LogOut, Menu, X, ChevronRight, Shield
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
    return <Navigate to="/" replace />;
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
