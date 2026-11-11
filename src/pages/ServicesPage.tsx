import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Radio, FlaskConical, Stethoscope, CheckCircle, PhoneCall, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SampleBadge } from '../components/common/SampleBadge';

export const ServicesPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full pb-16">
      <div className="bg-surface-container-lowest border-b border-border-subtle">
        <Breadcrumb items={[{ label: 'Layanan Publik' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary font-heading text-xs uppercase tracking-wider font-bold">
              Pelayanan Masyarakat
            </span>
            <SampleBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            Layanan Perlindungan Tanaman Perkebunan
          </h1>
          <p className="text-sm sm:text-base text-text-muted mt-2 max-w-3xl">
            Informasi komprehensif seputar pilar pelayanan teknis, laboratorium agens hayati, dan pendampingan klinik tanaman bagi pekebun se-Kalimantan Timur.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-10">
        {/* Layanan 1: Pengamatan & Pengendalian */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col md:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-badge-activity-bg text-badge-activity-text flex items-center justify-center flex-shrink-0">
            <Radio className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold text-primary">
                1. Pengamatan & Pengendalian OPT Perkebunan
              </h2>
              <span className="text-xs bg-surface-container-low text-secondary font-bold px-3 py-1 rounded-full">
                Surveilans Lapang
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Pelayanan pengamatan berkala untuk memonitor kepadatan populasi dan intensitas serangan hama utama (seperti ulat api, kumbang tanduk, penggerek batang) dan penyakit tanaman perkebunan rakyat.
            </p>
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 text-xs">
              <span className="font-heading font-bold text-primary">Cakupan Kegiatan:</span>
              <ul className="flex flex-col gap-1.5 text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span>Surveilans rutin di sentra perkebunan sawit, karet, kakao, dan lada.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span>Penerbitan peringatan dini (early warning system) potensi ledakan hama.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span>Gerakan pengendalian massal bersama kelompok tani saat terjadi serangan darurat.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Layanan 2: Laboratorium Agens Hayati */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col md:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center flex-shrink-0">
            <FlaskConical className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold text-primary">
                2. Laboratorium Agens Pengendali Hayati (APH)
              </h2>
              <span className="text-xs bg-surface-container-low text-secondary font-bold px-3 py-1 rounded-full">
                Produksi Mikroba
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Laboratorium APH UPTD P2TP memproduksi, mengembangbiakkan, dan memelihara isolat mikroba bermanfaat untuk mengendalikan patogen tanaman secara aman dan ramah lingkungan.
            </p>
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 text-xs">
              <span className="font-heading font-bold text-primary">Jenis Agens Hayati yang Dikelola:</span>
              <ul className="flex flex-col gap-1.5 text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span><strong>Trichoderma sp.</strong> — Pengendali jamur akar putih karet & busuk pangkal batang.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span><strong>Beauveria bassiana & Metarhizium</strong> — Jamur entomopatogen pembasmi hama serangga.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span>Bimbingan teknis perbanyakan mandiri skala petani dengan media jagung dan dedak.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Layanan 3: Klinik Tanaman */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col md:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-gold-light text-tertiary flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold text-primary">
                3. Klinik Tanaman Perkebunan & Konsultasi
              </h2>
              <span className="text-xs bg-surface-container-low text-tertiary font-bold px-3 py-1 rounded-full">
                Konsultasi & Diagnosa
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Pekebun dapat membawa atau mengirimkan sampel tanaman yang menunjukkan gejala sakit atau terserang hama untuk diperiksa dan didiagnosa oleh tenaga teknis perlindungan tanaman.
            </p>
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 text-xs">
              <span className="font-heading font-bold text-primary">Alur Konsultasi Sederhana:</span>
              <ul className="flex flex-col gap-1.5 text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span>Petani mendokumentasikan gejala tanaman atau membawa sampel ke kantor/posko wilayah.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span>Petugas mengidentifikasi penyebab penyakit (jamur, bakteri, virus, atau defisiensi hara).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  <span>Pemberian rekomendasi penanganan teknis dan pembagian agens hayati sesuai ketersediaan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info Alur Permohonan & Bantuan */}
        <div className="bg-primary text-on-primary p-6 sm:p-8 rounded-2xl shadow-md border border-secondary flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-kaltim-gold flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-tertiary-fixed">
                Ingin Mengajukan Bimbingan Teknis atau Konsultasi?
              </h3>
              <p className="text-xs text-surface-container-high mt-1 max-w-xl">
                Kelompok tani (Poktan) maupun pekebun mandiri dapat menghubungi nomor hotline resmi kami atau datang langsung pada hari dan jam kerja.
              </p>
            </div>
          </div>

          <Link
            to="/kontak"
            className="inline-flex items-center gap-2 bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-heading font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm flex-shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Lihat Alamat & Kontak Resmi</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
