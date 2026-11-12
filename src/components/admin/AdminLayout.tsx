import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  FileText,
  Image,
  Settings,
  Sliders,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { contentRepository } from '../../services/contentRepository';

const adminNavItems = [
  { label: 'Ringkasan Dashboard', path: '/admin', end: true, icon: LayoutDashboard },
  { label: 'Edit Tampilan & Konten Web', path: '/admin/tampilan', icon: Sliders },
  { label: 'Kelola Layanan Publik', path: '/admin/layanan', icon: Sparkles },
  { label: 'Kelola Berita', path: '/admin/berita', icon: Newspaper },
  { label: 'Kelola Agenda', path: '/admin/agenda', icon: Calendar },
  { label: 'Kelola Publikasi & SOP', path: '/admin/publikasi', icon: FileText },
  { label: 'Kelola Galeri & Video', path: '/admin/galeri', icon: Image },
  { label: 'Pengaturan Profil, Tupoksi & Struktur', path: '/admin/pengaturan', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleResetData = async () => {
    if (window.confirm('Kembalikan semua data konten ke contoh awal (sample)? Perubahan kustom akan direset.')) {
      await contentRepository.resetToSampleData();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans text-on-surface">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-primary text-on-primary border-r border-secondary flex-shrink-0 z-30">
        <div className="p-5 border-b border-primary-container flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-kaltim-gold text-on-tertiary-fixed flex items-center justify-center font-heading font-extrabold text-sm shadow-sm flex-shrink-0">
            CMS
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-bold text-sm text-tertiary-fixed truncate">
              Panel Operator
            </span>
            <span className="text-[11px] text-surface-container-high truncate">
              UPTD P2TP Kaltim
            </span>
          </div>
        </div>

        {/* Menu Navigasi Admin */}
        <nav className="flex-1 p-3 flex flex-col gap-1.5 overflow-y-auto">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold transition-colors ${
                    isActive
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : 'text-surface-container-high hover:bg-primary-container hover:text-on-primary'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Tombol Reset & Bawah */}
        <div className="p-4 border-t border-primary-container flex flex-col gap-2">
          <button
            type="button"
            onClick={handleResetData}
            title="Reset ke data contoh awal"
            className="flex items-center gap-2 px-3 py-2 text-[11px] text-surface-container-high hover:text-tertiary-fixed transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data Sample</span>
          </button>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 bg-primary-container hover:bg-secondary text-on-primary rounded-xl text-xs font-heading font-semibold transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-kaltim-gold" />
              <span>Lihat Website</span>
            </div>
            <span className="text-[10px] text-tertiary-fixed">Publik</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Admin */}
        <header className="h-16 bg-surface-container-lowest border-b border-border-subtle flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-surface-container focus:outline-none"
              aria-label="Toggle menu operator"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary hidden sm:inline" />
              <span className="text-xs font-heading font-bold text-primary">
                Sistem Pengelolaan Konten (CMS)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-right">
              <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-heading font-bold text-xs">
                OP
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-heading font-bold text-primary leading-tight">
                  {user?.name}
                </span>
                <span className="text-[10px] text-text-muted">{user?.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low hover:bg-error hover:text-white text-error font-heading text-xs font-bold rounded-lg transition-colors"
              title="Keluar dari sesi operator"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        {/* Drawer Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-primary text-on-primary p-4 border-b border-primary-container flex flex-col gap-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold ${
                      isActive
                        ? 'bg-secondary text-on-secondary'
                        : 'text-surface-container-high hover:bg-primary-container'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-2.5 text-xs text-kaltim-gold font-bold"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Lihat Website Publik</span>
            </Link>
          </div>
        )}

        {/* Isi Halaman Admin */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
