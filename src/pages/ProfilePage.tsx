import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ShieldCheck, Target, Award, Users, CheckCircle } from 'lucide-react';
import { SampleBadge } from '../components/common/SampleBadge';

export const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full pb-16">
      <div className="bg-surface-container-lowest border-b border-border-subtle">
        <Breadcrumb items={[{ label: 'Profil Instansi' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary font-heading text-xs uppercase tracking-wider font-bold">
              Profil Kelembagaan
            </span>
            <SampleBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            UPTD Pengembangan Perlindungan Tanaman Perkebunan
          </h1>
          <p className="text-sm sm:text-base text-text-muted mt-2 max-w-3xl">
            Dinas Perkebunan Pemerintah Provinsi Kalimantan Timur — Berkomitmen Mengawal Ketahanan dan Kesehatan Komoditas Perkebunan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-10">
        {/* Motto Pelayanan */}
        <div className="bg-gold-light border-l-4 border-kaltim-gold p-6 rounded-r-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-kaltim-gold text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase font-heading font-bold text-tertiary tracking-wider">
                Motto Pelayanan Resmi
              </div>
              <div className="text-xl sm:text-2xl font-heading font-extrabold text-tertiary-container italic">
                “Profesional, Amanah dan Peduli”
              </div>
            </div>
          </div>
        </div>

        {/* Tentang & Landasan Tugas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <h2>Tentang UPTD P2TP</h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Unit Pelaksana Teknis Daerah Pengembangan Perlindungan Tanaman Perkebunan (UPTD P2TP) berada di bawah naungan Dinas Perkebunan Provinsi Kalimantan Timur. Lembaga ini memiliki mandat strategis dalam melaksanakan kebijakan teknis perlindungan tanaman perkebunan dari serangan Organisme Pengganggu Tumbuhan (OPT) serta dampak perubahan iklim global.
            </p>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Fokus komoditas utama perlindungan mencakup tanaman perkebunan strategis rakyat seperti Kelapa Sawit, Karet, Kakao, Lada, dan Kelapa Dalam yang menjadi tulang punggung perekonomian masyarakat pedesaan di Kalimantan Timur.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
              <Target className="w-5 h-5 text-secondary" />
              <h2>Tugas Pokok & Fungsi</h2>
            </div>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-on-surface-variant">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>Pelaksanaan surveilans, peramalan, dan pemetaan serangan organisme pengganggu tumbuhan (OPT).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>Eksplorasi, isolasi, perbanyakan, dan distribusi agens pengendali hayati (APH) ramah lingkungan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>Penyelenggaraan klinik tanaman, diagnosa hama/penyakit, dan konsultasi kesehatan kebun pekebun.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>Bimbingan teknis dan gerakan pengendalian hama terpadu bersama kelompok tani perkebunan.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Struktur Organisasi (Placeholder Resmi) */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
              <Users className="w-5 h-5 text-secondary" />
              <h2>Struktur Organisasi</h2>
            </div>
            <SampleBadge label="Menunggu Data Resmi" />
          </div>

          <p className="text-xs sm:text-sm text-text-muted">
            Struktur organisasi resmi dan susunan pejabat fungsional UPTD P2TP Dinas Perkebunan Provinsi Kalimantan Timur akan ditampilkan secara lengkap setelah konfirmasi penetapan resmi dari instansi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle">
              <span className="text-xs text-text-muted">Pimpinan</span>
              <h3 className="font-heading font-bold text-sm text-primary mt-1">Kepala UPTD P2TP</h3>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle">
              <span className="text-xs text-text-muted">Sub-Bagian</span>
              <h3 className="font-heading font-bold text-sm text-primary mt-1">Tata Usaha</h3>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle">
              <span className="text-xs text-text-muted">Seksi Teknis</span>
              <h3 className="font-heading font-bold text-sm text-primary mt-1">Seksi Pelayanan & Laboratorium</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
