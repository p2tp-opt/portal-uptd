// src/pages/ProfilePage.tsx
import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ShieldCheck, Target, Award, Users, CheckCircle, Compass } from 'lucide-react';
import { useSiteContext } from '../context/useSiteContext';

export const ProfilePage: React.FC = () => {
  const { profile, profileDetail } = useSiteContext();

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Header Banner Halaman Profil */}
      <div className="bg-surface-container-lowest border-b border-border-subtle">
        <Breadcrumb items={[{ label: 'Profil Instansi' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary font-heading text-xs uppercase tracking-wider font-bold">
              Profil Kelembagaan
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            {profile.institutionName || 'UPTD Pengembangan Perlindungan Tanaman Perkebunan'}
          </h1>
          <p className="text-sm sm:text-base text-text-muted mt-2 max-w-3xl">
            Dinas Perkebunan Pemerintah Provinsi Kalimantan Timur — Berkomitmen Mengawal Ketahanan dan Kesehatan Komoditas Perkebunan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-10">
        {/* Motto Pelayanan Resmi */}
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
                “{profile.motto || 'Profesional, Amanah dan Peduli'}”
              </div>
            </div>
          </div>
        </div>

        {/* Tentang Lembaga & Tugas Pokok Fungsi (Grid 2 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kolom Kiri: Tentang Lembaga */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <h2>{profileDetail.aboutTitle || 'Tentang UPTD P2TP'}</h2>
            </div>
            <div className="flex flex-col gap-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {profileDetail.aboutParagraphs && profileDetail.aboutParagraphs.length > 0 ? (
                profileDetail.aboutParagraphs.map((par, pIdx) => (
                  <p key={pIdx}>{par}</p>
                ))
              ) : (
                <p>
                  Unit Pelaksana Teknis Daerah Pengembangan Perlindungan Tanaman Perkebunan (UPTD P2TP) berada di bawah naungan Dinas Perkebunan Provinsi Kalimantan Timur.
                </p>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Tugas Pokok & Fungsi */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
              <Target className="w-5 h-5 text-secondary" />
              <h2>{profileDetail.dutiesTitle || 'Tugas Pokok & Fungsi'}</h2>
            </div>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-on-surface-variant">
              {profileDetail.duties && profileDetail.duties.length > 0 ? (
                profileDetail.duties.map((duty, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{duty}</span>
                  </li>
                ))
              ) : (
                <li className="text-text-muted italic">Belum ada rincian tugas pokok yang ditambahkan.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Visi & Misi Lembaga (Jika Ada) */}
        {(profileDetail.vision || (profileDetail.missions && profileDetail.missions.length > 0)) && (
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-6">
            <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg border-b border-border-subtle pb-3">
              <Compass className="w-5 h-5 text-secondary" />
              <h2>Visi & Misi Kelembagaan</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Visi */}
              {profileDetail.vision && (
                <div className="md:col-span-5 bg-surface-container-low p-6 rounded-2xl border border-border-subtle flex flex-col gap-2">
                  <span className="text-xs font-heading font-bold text-secondary uppercase tracking-wider">
                    Visi Institusi
                  </span>
                  <p className="text-sm font-heading font-bold text-primary italic leading-relaxed">
                    “{profileDetail.vision}”
                  </p>
                </div>
              )}

              {/* Misi */}
              {profileDetail.missions && profileDetail.missions.length > 0 && (
                <div className={`${profileDetail.vision ? 'md:col-span-7' : 'md:col-span-12'} flex flex-col gap-3`}>
                  <span className="text-xs font-heading font-bold text-secondary uppercase tracking-wider">
                    Misi Utama
                  </span>
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-on-surface-variant">
                    {profileDetail.missions.map((m, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {mIdx + 1}
                        </span>
                        <span className="leading-relaxed">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Struktur Organisasi */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
              <Users className="w-5 h-5 text-secondary" />
              <h2>{profileDetail.structureTitle || 'Struktur Organisasi'}</h2>
            </div>
            <span className="text-xs text-secondary font-bold bg-surface-container-low px-3 py-1 rounded-full">
              Pemerintah Provinsi Kalimantan Timur
            </span>
          </div>

          <p className="text-xs sm:text-sm text-text-muted">
            {profileDetail.structureDescription ||
              'Struktur organisasi resmi dan susunan pejabat fungsional UPTD P2TP Dinas Perkebunan Provinsi Kalimantan Timur.'}
          </p>

          {/* Gambar Bagan Struktur Organisasi (Jika Diunggah) */}
          {profileDetail.structureImageUrl && (
            <div className="bg-surface-container-low p-4 rounded-2xl border border-border-subtle flex justify-center overflow-hidden">
              <img
                src={profileDetail.structureImageUrl}
                alt="Bagan Struktur Organisasi UPTD P2TP"
                className="max-w-full h-auto rounded-xl shadow-xs object-contain"
              />
            </div>
          )}

          {/* Kotak Pejabat / Seksi / Unit Kerja */}
          {profileDetail.organizationMembers && profileDetail.organizationMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileDetail.organizationMembers.map((mem) => (
                <div
                  key={mem.id}
                  className="p-5 rounded-xl bg-surface-container-low border border-border-subtle flex flex-col justify-between transition-transform hover:-translate-y-0.5 shadow-xs"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-secondary bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs">
                      {mem.section || 'Unit Kerja'}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-primary mt-2">
                      {mem.role}
                    </h3>
                  </div>
                  <div className="pt-3 mt-3 border-t border-border-subtle">
                    <span className="text-xs font-semibold text-on-surface">
                      {mem.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-text-muted border border-dashed border-border-subtle rounded-xl">
              Susunan pejabat fungsional dapat disesuaikan melalui panel CMS Pengaturan Profil.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
