import React from 'react';
import { CalendarDays, Megaphone, Phone } from 'lucide-react';
import { getCurrentDateHeaderWITA } from '../../utils/date';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const currentDate = getCurrentDateHeaderWITA();

  return (
    <header className="w-full shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40">
      {/* TOP BAR */}
      <div className="bg-primary text-on-primary py-1.5 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Tanggal & Informasi Singkat */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-tertiary-fixed-dim" aria-hidden="true" />
              <span className="font-medium">{currentDate} (WITA)</span>
            </div>
            <span className="hidden sm:inline text-on-primary-container">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-surface-container-low">
              <Megaphone className="w-3.5 h-3.5 text-tertiary-fixed-dim" aria-hidden="true" />
              <span>Portal Resmi Informasi Perlindungan Tanaman Perkebunan Kaltim</span>
            </div>
          </div>

          {/* Hotline */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-tertiary-fixed-dim" aria-hidden="true" />
              <span className="font-medium">(0541) 743488 / Hotline P2TP</span>
            </div>
          </div>
        </div>
      </div>

      {/* BRAND BAR */}
      <div className="bg-surface-container-lowest py-3.5 px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Identitas Lembaga */}
          <Link to="/" className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-kaltim-gold rounded-lg p-1">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-kaltim-gold flex items-center justify-center font-heading font-extrabold text-base shadow-sm border border-secondary flex-shrink-0">
              P2TP
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
                Pemerintah Provinsi Kalimantan Timur
              </span>
              <span className="text-lg sm:text-xl text-primary font-heading font-extrabold leading-tight tracking-tight">
                Dinas Perkebunan
              </span>
              <span className="text-xs sm:text-sm text-on-surface-variant font-medium">
                UPTD Pengembangan Perlindungan Tanaman Perkebunan
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
                “Profesional, Amanah dan Peduli”
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
