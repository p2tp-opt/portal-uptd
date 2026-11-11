import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Bell, BookOpen, Phone, MessageSquare, Clock, ShieldAlert } from 'lucide-react';
import { SampleBadge } from '../common/SampleBadge';

export const Sidebar: React.FC = () => {
  return (
    <aside aria-label="Sidebar Informasi Pelayanan" className="flex flex-col gap-6">
      {/* WIDGET 1: Peringatan Dini & Status Cuaca OPT */}
      <div className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl p-6 shadow-md border border-secondary/50 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-kaltim-gold/15 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 bg-badge-opt-bg text-badge-opt-text text-xs font-heading font-bold px-3 py-1 rounded-full shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Peringatan Dini OPT</span>
          </span>
          <SampleBadge label="Simulasi" />
        </div>

        <h3 className="text-base font-heading font-bold text-tertiary-fixed mb-2">
          Kesiapsiagaan Cuaca Lembab & Hujan Tinggi
        </h3>

        <p className="text-xs text-surface-container-high mb-4 leading-relaxed">
          Waspadai potensi penyebaran jamur akar putih pada tanaman karet dan penyakit busuk buah kakao saat curah hujan meningkat di sentra perkebunan rakyat.
        </p>

        <div className="bg-primary/50 rounded-xl p-3 flex flex-col gap-2 mb-4 text-xs border border-secondary/40">
          <div className="flex items-center justify-between">
            <span className="text-surface-container-low">Indeks Kelembaban:</span>
            <span className="font-bold text-tertiary-fixed-dim">Tinggi (Musim Penghujan)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-surface-container-low">Status Posko:</span>
            <span className="font-bold text-primary-fixed">Siaga Lapangan</span>
          </div>
        </div>

        <Link
          to="/kontak"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-heading text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Informasi Kontak Petugas Wilayah</span>
        </Link>
      </div>

      {/* WIDGET 2: Agenda Singkat */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-border-subtle flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <h3 className="text-sm font-heading font-bold text-primary flex items-center gap-2">
            <Bell className="w-4 h-4 text-secondary" />
            <span>Agenda Singkat</span>
          </h3>
          <SampleBadge />
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-kaltim-gold mt-1.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-on-surface">Penyaluran Bantuan Agens Hayati</span>
              <span className="text-text-muted text-[11px]">Bimtek Poktan Perkebunan Berau</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-on-surface">Uji Efektivitas Trichoderma</span>
              <span className="text-text-muted text-[11px]">Kebun Percobaan Lapangan</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-on-surface">Monitoring Gejala Ganoderma</span>
              <span className="text-text-muted text-[11px]">Surveilans Sawit Rakyat</span>
            </div>
          </div>
        </div>
      </div>

      {/* WIDGET 3: Panduan Populer Petani */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-border-subtle flex flex-col gap-4">
        <h3 className="text-sm font-heading font-bold text-primary flex items-center gap-2 pb-3 border-b border-border-subtle">
          <BookOpen className="w-4 h-4 text-secondary" />
          <span>Panduan Populer Petani</span>
        </h3>

        <div className="flex flex-col gap-3">
          <Link
            to="/publikasi"
            className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-xs text-on-surface truncate group-hover:text-secondary">
                Identifikasi Hama Ulat Api
              </span>
              <span className="text-[11px] text-text-muted">Ringkasan Pengendalian Hayati</span>
            </div>
          </Link>

          <Link
            to="/publikasi"
            className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-xs text-on-surface truncate group-hover:text-secondary">
                Gejala Jamur Akar Putih (JAP)
              </span>
              <span className="text-[11px] text-text-muted">Pedoman Pengendalian Karet</span>
            </div>
          </Link>
        </div>
      </div>

      {/* WIDGET 4: Jam Pelayanan & Kontak Cepat */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-border-subtle flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-badge-activity-bg text-secondary flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-heading font-bold text-primary">Jam Pelayanan & Siaga</h3>
            <span className="text-[11px] text-text-muted">UPTD P2TP Prov. Kaltim</span>
          </div>
        </div>

        <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Senin - Kamis:</span>
            <span className="font-bold text-primary">08.00 - 16.00 WITA</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Jumat:</span>
            <span className="font-bold text-primary">08.00 - 11.00 WITA</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Sabtu - Minggu:</span>
            <span className="font-bold text-error">Tutup</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <a
            href="tel:0541743488"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-on-primary hover:bg-secondary font-heading text-xs font-bold rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Telepon: (0541) 743488</span>
          </a>
          <Link
            to="/kontak"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-badge-activity-bg text-badge-activity-text hover:bg-secondary-container font-heading text-xs font-bold rounded-xl transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Pusat Informasi & Kontak Lengkap</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
