import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ChevronRight, ExternalLink, ShieldCheck, Video, Camera, MessageCircle } from 'lucide-react';
import { contentRepository } from '../../services/contentRepository';
import { ProfileContact } from '../../types/content';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = useState<ProfileContact | null>(null);

  useEffect(() => {
    contentRepository.getProfile().then(setProfile);
  }, []);

  const footerSettings = profile?.siteSettings?.footer;

  return (
    <footer className="w-full bg-primary text-on-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Kolom 1: Profil Singkat & Logo */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {profile?.logoUrl ? (
                <img
                  src={profile.logoUrl}
                  alt="Logo UPTD P2TP"
                  className="h-11 w-auto max-w-[100px] object-contain bg-white rounded-lg p-1 flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-primary-container text-kaltim-gold flex items-center justify-center font-heading font-extrabold text-sm border border-secondary flex-shrink-0">
                  P2TP
                </div>
              )}
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
              {footerSettings?.description ||
                profile?.description ||
                'Unit Pelaksana Teknis Daerah Pengembangan Perlindungan Tanaman Perkebunan pada Dinas Perkebunan Provinsi Kalimantan Timur mengawal ketahanan dan perlindungan komoditas strategis perkebunan.'}
            </p>
            <div className="inline-flex items-center gap-2 bg-primary-container px-3 py-1.5 rounded-lg border border-secondary text-xs">
              <ShieldCheck className="w-4 h-4 text-kaltim-gold" aria-hidden="true" />
              <span className="font-heading font-semibold text-tertiary-fixed">
                {profile?.motto || 'Profesional, Amanah dan Peduli'}
              </span>
            </div>
          </div>

          {/* Kolom 2: Alamat & Kontak Resmi */}
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-primary-container pb-2">
              <h3 className="font-heading font-bold text-sm text-tertiary-fixed">
                Alamat & Kontak Resmi
              </h3>
            </div>

            <div className="flex items-start gap-2.5 text-surface-container-high">
              <MapPin className="w-4 h-4 text-kaltim-gold flex-shrink-0 mt-0.5" />
              <span>
                {profile?.address ||
                  'Jl. Slamet Riyadi, Kel. Karang Asam Ilir, Kec. Sungai Kunjang, Samarinda, Kalimantan Timur'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-surface-container-high">
              <Phone className="w-4 h-4 text-kaltim-gold flex-shrink-0" />
              <span>{profile?.phone || '(0541) 273580 / (0541) 743488'}</span>
            </div>

            <div className="flex items-center gap-2.5 text-surface-container-high">
              <Mail className="w-4 h-4 text-kaltim-gold flex-shrink-0" />
              <span>{profile?.email || 'uptd.p2tp@kaltimprov.go.id'}</span>
            </div>

            <div className="flex items-start gap-2.5 text-surface-container-high pt-1">
              <Clock className="w-4 h-4 text-kaltim-gold flex-shrink-0 mt-0.5" />
              <span className="whitespace-pre-line">
                {profile?.officeHours ||
                  "Senin - Kamis: 08.00 - 16.00 WITA\nJum'at: 08.00 - 11.00 WITA\nSabtu, Minggu & Hari Libur: Tutup"}
              </span>
            </div>
          </div>

          {/* Kolom 3: Tautan Cepat & Layanan */}
          <div className="flex flex-col gap-3 text-xs">
            <h3 className="font-heading font-bold text-sm text-tertiary-fixed border-b border-primary-container pb-2">
              {footerSettings?.quickLinksTitle || 'Tautan Cepat & Layanan'}
            </h3>
            <ul className="flex flex-col gap-2 text-surface-container-high">
              <li>
                <Link to="/layanan" className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Klinik Konsultasi Tanaman</span>
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Laboratorium Agens Pengendali Hayati</span>
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Pengamatan & Surveilans OPT</span>
                </Link>
              </li>
              <li>
                <Link to="/publikasi" className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Standar Operasional Prosedur (SOP)</span>
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Posko Siaga Pengaduan Petani</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1.5 text-tertiary-fixed font-semibold pt-1">
                  <ChevronRight className="w-3.5 h-3.5 text-kaltim-gold" />
                  <span>Login Operator CMS</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Saluran Informasi & Media Sosial */}
          <div className="flex flex-col gap-4 text-xs">
            <h3 className="font-heading font-bold text-sm text-tertiary-fixed border-b border-primary-container pb-2">
              {footerSettings?.channelsTitle || 'Saluran Informasi Publik'}
            </h3>
            <p className="text-surface-container-high leading-relaxed">
              Ikuti perkembangan kegiatan bimbingan teknis, gerakan pengendalian OPT, dan rilis publikasi berkala:
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-primary-container hover:bg-secondary text-surface-container-high hover:text-on-primary transition-colors"
              >
                <Video className="w-4 h-4 text-kaltim-gold" />
                <span>YouTube Resmi UPTD P2TP</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-primary-container hover:bg-secondary text-surface-container-high hover:text-on-primary transition-colors"
              >
                <Camera className="w-4 h-4 text-kaltim-gold" />
                <span>Instagram @uptdp2tp_kaltim</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-primary-container hover:bg-secondary text-surface-container-high hover:text-on-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-kaltim-gold" />
                <span>Konsultasi WhatsApp Lapangan</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Bilah Hak Cipta & Keamanan Bawah */}
        <div className="mt-12 pt-6 border-t border-primary-container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-container-high">
          <div>
            <p>
              {footerSettings?.copyrightText ||
                `© ${currentYear} UPTD Pengembangan Perlindungan Tanaman Perkebunan Provinsi Kalimantan Timur. Hak Cipta Dilindungi.`}
            </p>
            <p className="text-[11px] text-tertiary-fixed-dim mt-0.5">
              Dinas Perkebunan Pemerintah Provinsi Kalimantan Timur • Samarinda
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/profil" className="hover:text-tertiary-fixed transition-colors">
              Profil Instansi
            </Link>
            <span>•</span>
            <Link to="/kontak" className="hover:text-tertiary-fixed transition-colors">
              Kontak & Pengaduan
            </Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-tertiary-fixed transition-colors">
              Panel Operator
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
