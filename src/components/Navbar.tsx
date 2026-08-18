import { useState, useEffect } from 'react';
import { Menu, X, LogIn, UserPlus, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import { Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'Enterprise Solutions', to: '/services' },
  { label: 'Training', to: '/training' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; tab: 'login' | 'register' }>({ open: false, tab: 'login' });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, adminRole, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function openLogin() { setAuthModal({ open: true, tab: 'login' }); setMobileOpen(false); }
  function openRegister() { setAuthModal({ open: true, tab: 'register' }); setMobileOpen(false); }

  async function handleSignOut() {
    await signOut();
    setUserMenuOpen(false);
    navigate('/');
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="bg-white rounded px-3 py-1.5">
                <img src="/Main_Logo.png" alt="Greenatech" className="h-8 w-auto" />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Auth */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 border border-brand-border text-gray-300 hover:text-white hover:border-gray-500 px-4 py-2 text-sm transition-all duration-200"
                  >
                    <User size={14} />
                    <span className="max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-[#141414] border border-brand-border shadow-xl z-50">
                      {adminRole && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-brand-green hover:bg-brand-green/10 transition-colors border-b border-brand-border"
                        >
                          <Shield size={14} />
                          Admin Panel
                        </Link>
                      )}
                      <div className="px-4 py-3 border-b border-brand-border">
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        {adminRole && (
                          <span className="text-xs text-brand-green capitalize font-semibold">
                            {adminRole.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={openLogin}
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors px-3 py-2"
                  >
                    <LogIn size={14} />
                    Sign In
                  </button>
                  <button
                    onClick={openRegister}
                    className="flex items-center gap-2 border border-brand-border text-gray-300 hover:border-brand-green hover:text-brand-green text-sm px-4 py-2 transition-all duration-200"
                  >
                    <UserPlus size={14} />
                    Register
                  </button>
                </>
              )}
              <Link
                to="/contact"
                className="bg-brand-green text-black text-sm font-semibold px-6 py-2.5 hover:bg-lime-400 transition-colors duration-200 ml-1"
              >
                Work with us
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-brand-dark border-t border-brand-border">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-300 hover:text-white py-3 text-sm border-b border-brand-border last:border-0 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {adminRole && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-brand-green py-3 text-sm border-b border-brand-border"
                >
                  <Shield size={14} />
                  Admin Panel
                </Link>
              )}
              <div className="pt-4 space-y-3">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-400 text-sm w-full"
                  >
                    <LogOut size={14} />
                    Sign Out ({user.email?.split('@')[0]})
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={openLogin}
                      className="flex-1 flex items-center justify-center gap-2 border border-brand-border text-gray-300 text-sm py-3 hover:border-gray-500 hover:text-white transition-all"
                    >
                      <LogIn size={14} />
                      Sign In
                    </button>
                    <button
                      onClick={openRegister}
                      className="flex-1 flex items-center justify-center gap-2 border border-brand-green text-brand-green text-sm py-3"
                    >
                      <UserPlus size={14} />
                      Register
                    </button>
                  </div>
                )}
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-brand-green text-black text-sm font-semibold px-6 py-3 text-center hover:bg-lime-400 transition-colors"
                >
                  Work with us
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}

      <AuthModal
        isOpen={authModal.open}
        onClose={() => setAuthModal({ open: false, tab: 'login' })}
        defaultTab={authModal.tab}
      />
    </>
  );
}
