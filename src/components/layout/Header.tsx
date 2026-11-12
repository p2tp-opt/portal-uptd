import React, { useState, useEffect } from 'react';
import { CalendarDays, Megaphone, Phone, Clock } from 'lucide-react';
import { getCurrentDateHeaderWITA } from '../../utils/date';
import { Link } from 'react-router-dom';
import { useSiteContext } from '../../context/useSiteContext';

export const Header: React.FC = () => {
  const currentDate = getCurrentDateHeaderWITA();
  const { profile, siteSettings } = useSiteContext();
  const [realtimeClock, setRealtimeClock] = useState<string>('');

  // Realtime Clock berdetak setiap detik dengan zona waktu WITA (Asia/Makassar)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Makassar',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setRealtimeClock(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const headerSettings = siteSettings?.header;

  return (
    <header className="w-full shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40">
      {/* TOP BAR */}
      <div className="bg-primary text-on-primary py-1.5 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Tanggal & Realtime Jam WITA */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-tertiary-fixed-dim" aria-hidden="true" />
              <span className="font-medium">{currentDate}</span>
            </div>

            {/* Jam Digital Realtime WITA */}
            {realtimeClock && (
              <div className="flex items-center gap-1 bg-primary-container px-2 py-0.5 rounded text-[11px] font-mono text-tertiary-fixed font-bold border border-secondary shadow-xs">
                <Clock className="w-3 h-3 text-kaltim-gold animate-pulse" />
                <span>{realtimeClock} WITA</span>
              </div>
            )}

            <span className="hidden sm:inline text-on-primary-container">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-surface-container-low max-w-md truncate">
              <Megaphone className="w-3.5 h-3.5 text-tertiary-fixed-dim flex-shrink-0" aria-hidden="true" />
              {headerSettings?.tickerText ? (
                <Link
                  to={headerSettings.tickerLink || '/berita'}
                  className="hover:text-tertiary-fixed transition-colors truncate"
                >
                  <span className="font-bold text-kaltim-gold mr-1">[{headerSettings.hotlineTag || 'INFO SIAGA'}]:</span>
                  {headerSettings.tickerText}
                </Link>
              ) : (
                <span>{headerSettings?.topNotice || 'Portal Resmi Informasi Perlindungan Tanaman Perkebunan Kaltim'}</span>
              )}
            </div>
          </div>

          {/* Hotline / Telepon Resmi */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-tertiary-fixed-dim" aria-hidden="true" />
              <a
                href={`tel:${(profile?.phone || '0541273580').replace(/[^0-9]/g, '')}`}
                className="font-medium hover:text-tertiary-fixed-dim transition-colors"
              >
                {profile?.phone || '(0541) 273580 / (0541) 743488'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BRAND BAR */}
      <div className="bg-surface-container-lowest py-3.5 px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Identitas Lembaga */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-kaltim-gold rounded-lg p-1"
          >
            {/* Logo Instansi Dinamis */}
            {profile?.logoUrl ? (
              <img
                src={profile.logoUrl}
                alt="Logo UPTD P2TP"
                className="h-12 w-auto max-w-[120px] object-contain flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-primary-container text-kaltim-gold flex items-center justify-center font-heading font-extrabold text-base shadow-sm border border-secondary flex-shrink-0">
                P2TP
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
                Pemerintah Provinsi Kalimantan Timur
              </span>
              <span className="text-lg sm:text-xl text-primary font-heading font-extrabold leading-tight tracking-tight">
                Dinas Perkebunan
              </span>
              <span className="text-xs sm:text-sm text-on-surface-variant font-medium">
                {profile?.institutionName || 'UPTD Pengembangan Perlindungan Tanaman Perkebunan'}
              </span>
            </div>
          </Link>

          {/* Motto Box (Visible on large screens) */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="bg-gold-light border-l-4 border-kaltim-gold px-4 py-2 rounded-r-lg shadow-sm">
              <div className="text-[11px] text-tertiary uppercase tracking-wider font-bold">
                Motto Pelayanan
              </div>
              <div className="text-sm font-heading text-tertiary-container italic font-bold">
                “{profile?.motto || 'Profesional, Amanah dan Peduli'}”
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
