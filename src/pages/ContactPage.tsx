import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { MapPin, Phone, Mail, Clock, MessageSquare, AlertCircle, ShieldAlert } from 'lucide-react';
import { useSiteContext } from '../context/useSiteContext';

export const ContactPage: React.FC = () => {
  const { profile } = useSiteContext();

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="bg-surface-container-lowest border-b border-border-subtle">
        <Breadcrumb items={[{ label: 'Kontak & Alamat' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary font-heading text-xs uppercase tracking-wider font-bold">
              Pusat Pelayanan & Pengaduan
            </span>
            {!profile?.verified && <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-gold-light text-tertiary-container border border-kaltim-gold/40">Menunggu Data Resmi</span>}
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            Alamat & Kontak Resmi UPTD P2TP
          </h1>
          <p className="text-sm sm:text-base text-text-muted mt-2 max-w-2xl">
            Hubungi kantor pelayanan atau posko pengamat perlindungan tanaman perkebunan untuk konsultasi dan informasi teknis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-10">
        {/* Catatan Transparansi Data Placeholder */}
        {!profile?.verified && (
          <div className="bg-gold-light border-l-4 border-kaltim-gold p-4 rounded-r-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-tertiary-container flex-shrink-0 mt-0.5" />
            <div className="text-xs text-on-surface">
              <strong className="font-heading font-bold text-tertiary-container block mb-0.5">
                Pemberitahuan Data Sementara (Placeholder)
              </strong>
              Alamat, nomor telepon, dan email di halaman ini merupakan data contoh sementara sampai penetapan resmi disahkan oleh instansi terkait.
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kartu Informasi Kontak Lengkap */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-6">
            <h2 className="text-xl font-heading font-bold text-primary border-b border-border-subtle pb-4">
              Kantor Pusat UPTD P2TP
            </h2>

            <div className="flex flex-col gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-on-surface">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-primary">Alamat Kantor</span>
                  <span className="text-text-muted mt-0.5">{profile?.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-on-surface">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-primary">Telepon & Hotline</span>
                  <span className="text-text-muted mt-0.5">{profile?.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-on-surface">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-primary">Email Resmi</span>
                  <span className="text-text-muted mt-0.5">{profile?.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-on-surface">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-primary">Jam Kerja Pelayanan</span>
                  <span className="text-text-muted mt-0.5">{profile?.officeHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0541273580"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 bg-primary text-on-primary hover:bg-secondary rounded-xl font-heading text-xs font-bold transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi via Telepon: (0541) 273580</span>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 bg-badge-activity-bg text-badge-activity-text hover:bg-secondary-container rounded-xl font-heading text-xs font-bold transition-colors border border-secondary"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Hotline</span>
              </a>
            </div>
          </div>

          {/* Panduan Pelaporan Gejala OPT */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-kaltim-gold" />
              <h2 className="text-xl font-heading font-bold text-primary">
                Panduan Konsultasi & Pengaduan OPT
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Bagi petani atau kelompok tani perkebunan di Kalimantan Timur yang mengalami kendala serangan hama atau gejala penyakit tidak dikenal di kebunnya, silakan persiapkan informasi berikut sebelum berkonsultasi:
            </p>

            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-on-surface-variant">
              <li className="p-3 rounded-xl bg-surface-container-low flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="font-heading font-bold text-primary block">Foto Gejala Tanaman:</strong>
                  Ambil foto jelas bagian tanaman yang sakit (daun, batang, buah, atau perakaran).
                </div>
              </li>

              <li className="p-3 rounded-xl bg-surface-container-low flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="font-heading font-bold text-primary block">Lokasi & Luas Areal:</strong>
                  Sebutkan desa/kecamatan lokasi kebun dan perkiraan luas area yang terserang.
                </div>
              </li>

              <li className="p-3 rounded-xl bg-surface-container-low flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="font-heading font-bold text-primary block">Kontak Kelompok Tani:</strong>
                  Sertakan nomor kontak ketua atau perwakilan poktan untuk tindak lanjut petugas lapangan.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
