// src/data/defaultProfileDetail.ts
import { ProfileDetail } from '../types/content';

export const defaultProfileDetail: ProfileDetail = {
  aboutTitle: 'Tentang UPTD P2TP',
  aboutParagraphs: [
    'Unit Pelaksana Teknis Daerah Pengembangan Perlindungan Tanaman Perkebunan (UPTD P2TP) berada di bawah naungan Dinas Perkebunan Provinsi Kalimantan Timur. Lembaga ini memiliki mandat strategis dalam melaksanakan kebijakan teknis perlindungan tanaman perkebunan dari serangan Organisme Pengganggu Tumbuhan (OPT) serta dampak perubahan iklim global.',
    'Fokus komoditas utama perlindungan mencakup tanaman perkebunan strategis rakyat seperti Kelapa Sawit, Karet, Kakao, Lada, dan Kelapa Dalam yang menjadi tulang punggung perekonomian masyarakat pedesaan di Kalimantan Timur.',
  ],
  vision:
    'Terwujudnya perlindungan tanaman perkebunan yang tangguh, lestari, dan ramah lingkungan untuk kesejahteraan pekebun Kalimantan Timur.',
  missions: [
    'Meningkatkan efektivitas pengamatan dan pengendalian dini serangan organisme pengganggu tumbuhan (OPT).',
    'Mengembangkan dan menyebarluaskan penggunaan Agens Pengendali Hayati (APH) serta ramah lingkungan.',
    'Meningkatkan kapasitas dan kemandirian pekebun dalam pengelolaan hama terpadu (PHT).',
    'Mengoptimalkan pelayanan laboratorium dan klinik tanaman perkebunan.',
  ],
  dutiesTitle: 'Tugas Pokok & Fungsi',
  duties: [
    'Pelaksanaan surveilans, peramalan, dan pemetaan serangan organisme pengganggu tumbuhan (OPT).',
    'Eksplorasi, isolasi, perbanyakan, dan distribusi agens pengendali hayati (APH) ramah lingkungan.',
    'Penyelenggaraan klinik tanaman, diagnosa hama/penyakit, dan konsultasi kesehatan kebun pekebun.',
    'Bimbingan teknis dan gerakan pengendalian hama terpadu bersama kelompok tani perkebunan.',
  ],
  structureTitle: 'Struktur Organisasi',
  structureDescription:
    'Struktur organisasi resmi dan susunan pejabat fungsional UPTD P2TP Dinas Perkebunan Provinsi Kalimantan Timur.',
  structureImageUrl: '',
  organizationMembers: [
    {
      id: 'mem-1',
      role: 'Kepala UPTD P2TP',
      name: 'Mahmud Kahfi, S.P., M.P.',
      section: 'Pimpinan',
    },
    {
      id: 'mem-2',
      role: 'Kepala Sub-Bagian Tata Usaha',
      name: '-',
      section: 'Tata Usaha',
    },
    {
      id: 'mem-3',
      role: 'Seksi Pelayanan & Laboratorium',
      name: '-',
      section: 'Seksi Teknis',
    },
  ],
};
