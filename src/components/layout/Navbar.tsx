import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShieldAlert } from 'lucide-react';
import { useSiteContext } from '../../context/useSiteContext';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Beranda', path: '/' },
  { label: 'Profil', path: '/profil' },
  { label: 'Layanan', path: '/layanan' },
  { label: 'Berita', path: '/berita' },
  { label: 'Agenda', path: '/agenda' },
  { label: 'Publikasi', path: '/publikasi' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'Kontak', path: '/kontak' },
];

export const Navbar: React.FC = () => {
  const { siteSettings } = useSiteContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const ctaText = siteSettings.navbar?.ctaText || 'Info Siaga OPT';
  const ctaLink = siteSettings.navbar?.ctaLink || '/kontak';

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Tutup drawer saat rute berpindah
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle tombol Escape untuk menutup menu mobile (A11y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Kunci scroll saat drawer mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/berita?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-primary-container text-on-primary sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between gap-4">
          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center gap-1 font-heading text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 transition-colors rounded-lg font-medium ${
                    isActive
                      ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                      : 'text-on-primary-container hover:bg-secondary/70 hover:text-on-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Tombol Hamburger Mobile */}
          <div className="lg:hidden flex items-center">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-on-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-kaltim-gold"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <span className="ml-2 font-heading font-bold text-sm lg:hidden">Menu Navigasi</span>
          </div>

          {/* Pencarian Cepat & Tombol Info Siaga */}
          <div className="flex items-center gap-3 ml-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari info OPT, kegiatan..."
                className="w-40 sm:w-56 lg:w-64 pl-8 pr-3 py-1 bg-surface-container-lowest text-on-surface text-xs rounded-full focus:outline-none focus:ring-2 focus:ring-kaltim-gold placeholder:text-outline shadow-inner"
                aria-label="Cari informasi"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-outline pointer-events-none" />
            </form>

            {/* Tombol Tautan Info Siaga OPT Dinamis */}
            <NavLink
              to={ctaLink}
              className="hidden sm:inline-flex items-center gap-1.5 bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-heading font-bold text-xs px-3.5 py-1.5 rounded-full transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{ctaText}</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Drawer Menu Mobile */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={drawerRef}
          className="lg:hidden fixed inset-0 top-[110px] bg-primary/95 z-50 backdrop-blur-sm overflow-y-auto p-6 flex flex-col gap-4 animate-fadeIn"
        >
          <div className="flex flex-col gap-2 font-heading text-base">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-secondary text-on-secondary font-bold'
                      : 'text-on-primary hover:bg-secondary/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-secondary mt-2">
            <NavLink
              to={ctaLink}
              className="flex items-center justify-center gap-2 bg-kaltim-gold text-on-tertiary-fixed font-heading font-bold py-3 px-4 rounded-xl text-center shadow-md"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>{ctaText}</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
