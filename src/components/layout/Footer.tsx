import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ChevronRight, ExternalLink, ShieldCheck, Video, Camera, MessageCircle } from 'lucide-react';
import { SampleBadge } from '../common/SampleBadge';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-on-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Kolom 1: Profil Singkat */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-kaltim-gold flex items-center justify-center font-heading font-extrabold text-sm border border-secondary flex-shrink-0">
                P2TP
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-heading font-bold uppercase text-tertiary-fixed">
                  Pemprov Kaltim
                </span>
                <span className="text-base font-heading font-bold leading-tight">
                  UPTD P2TP
                </span>
              </div>
            </div>
            <p className="text-xs text-surface-container-high leading-relaxed">
              Unit Pelaksana Teknis Daerah Pengembangan Perlindungan Tanaman Perkebunan pada Dinas Perkebunan Provinsi Kalimantan Timur mengawal ketahanan dan perlindungan komoditas strategis perkebunan.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary-container px-3 py-1.5 rounded-lg border border-secondary text-xs">
              <ShieldCheck className="w-4 h-4 text-kaltim-gold" aria-hidden="true" />
              <span className="font-heading font-semibold text-tertiary-fixed">
                Profesional, Amanah dan Peduli
              </span>
            </div>
          </div>

          {/* Kolom 2: Alamat & Kontak Resmi (Placeholder Bertanda) */}
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-primary-container pb-2">
              <h3 className="font-heading font-bold text-sm text-tertiary-fixed">
                Alamat & Kontak Resmi
              </h3>
              <SampleBadge label="Placeholder" />
            </div>

            <div className="flex items-start gap-2.5 text-surface-container-high">
              <MapPin className="w-4 h-4 text-kaltim-gold flex-shrink-0 mt-0.5" />
              <span>
                Jl. Slamet Riyadi, Kel. Karang Asam Ilir, Kec. Sungai Kunjang, Samarinda, Kalimantan Timur
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-surface-container-high">
              <Phone className="w-4 h-4 text-kaltim-gold flex-shrink-0" />
              <span>(0541) 743488 / (0541) 741753</span>
            </div>

            <div className="flex items-center gap-2.5 text-surface-container-high">
              <Mail className="w-4 h-4 text-kaltim-gold flex-shrink-0" />
              <span>uptd.p2tp@kaltimprov.go.id</span>
            </div>

            <div className="flex items-start gap-2.5 text-surface-container-high pt-1">
              <Clock className="w-4 h-4 text-kaltim-gold flex-shrink-0 mt-0.5" />
              <span>
                Senin - Kamis: 08.00 - 16.00 WITA<br />
                Jum'at: 08.00 - 11.00 WITA<br />
                Sabtu, Minggu & Hari Libur: Tutup
              </span>
            </div>
          </div>

          {/* Kolom 3: Tautan Cepat & Layanan */}
          <div className="flex flex-col gap-3 text-xs">
            <h3 className="font-heading font-bold text-sm text-tertiary-fixed border-b border-primary-container pb-2">
              Tautan Cepat & Layanan
            </h3>
            <ul className="flex flex-col gap-2 text-surface-container-high">
              <li>
                <Link to="/layanan" className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Klinik Konsultasi Tanaman</span>
                </Link>
              </li>
              <li>
                <Link to="/berita" className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Peringatan Dini & Pemantauan OPT</span>
                </Link>
              </li>
              <li>
                <Link to="/publikasi" className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Unduh SOP & Pedoman Teknis</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://disbun.kaltimprov.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Dinas Perkebunan Prov. Kaltim</span>
                </a>
              </li>
              <li>
                <a
                  href="https://kaltimprov.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Pemerintah Provinsi Kalimantan Timur</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Saluran Komunikasi Publik */}
          <div className="flex flex-col gap-4 text-xs">
            <h3 className="font-heading font-bold text-sm text-tertiary-fixed border-b border-primary-container pb-2">
              Saluran Informasi Publik
            </h3>
            <p className="text-surface-container-high leading-relaxed">
              Ikuti informasi terkini, agenda bimtek, dan edukasi seputar perlindungan komoditas perkebunan di Benua Etam.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Resmi P2TP"
                className="w-9 h-9 rounded-full bg-primary-container hover:bg-secondary flex items-center justify-center text-on-primary transition-colors focus:ring-2 focus:ring-kaltim-gold"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Resmi P2TP"
                className="w-9 h-9 rounded-full bg-primary-container hover:bg-secondary flex items-center justify-center text-on-primary transition-colors focus:ring-2 focus:ring-kaltim-gold"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Hotline Petani"
                className="w-9 h-9 rounded-full bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center transition-colors focus:ring-2 focus:ring-secondary"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-primary-container p-3 rounded-lg border border-secondary mt-1">
              <div className="font-heading font-bold text-tertiary-fixed text-xs flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                <span>Helpdesk Petani Perkebunan</span>
              </div>
              <p className="text-[11px] text-surface-container-high mt-1">
                Layanan konsultasi seputar agens hayati dan identifikasi gejala OPT secara ramah lingkungan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Baris Bawah */}
      <div className="bg-on-tertiary-fixed text-surface-container-high py-4 px-4 sm:px-6 lg:px-8 text-center text-xs border-t border-primary-container">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {currentYear} UPTD Pengembangan Perlindungan Tanaman Perkebunan — Pemerintah Provinsi Kalimantan Timur.
          </span>
          <div className="flex items-center gap-3">
            <span className="text-outline">
              Hak Cipta Dilindungi Undang-Undang Republik Indonesia.
            </span>
            <span className="text-outline">|</span>
            <Link
              to="/admin/login"
              className="text-tertiary-fixed hover:text-white transition-colors underline font-medium"
            >
              Login Operator
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
