// src/data/defaultSiteSettings.ts
import { SiteSettings } from '../types/siteSettings';

export const defaultSiteSettings: SiteSettings = {
  header: {
    topNotice: 'Portal Resmi Informasi UPTD Pengembangan Perlindungan Tanaman Perkebunan Kaltim',
    hotlineTag: 'Siaga Pengamatan OPT',
    tickerText: 'Kesiapsiagaan Dampak Cuaca Ekstrem terhadap Kesehatan Tanaman Perkebunan Rakyat Benua Etam',
    tickerLink: '/berita',
  },
  navbar: {
    brandTitle: 'UPTD P2TP Prov. Kaltim',
    brandSubtitle: 'Dinas Perkebunan Provinsi Kalimantan Timur',
    ctaText: 'Info Siaga OPT',
    ctaLink: '/kontak',
  },
  hero: {
    headlinePrefix: 'Mendukung Perlindungan',
    headlineHighlight: 'Tanaman Perkebunan',
    headlineSuffix: 'Kalimantan Timur',
    subheadline:
      '“Profesional, Amanah dan Peduli” dalam mewujudkan tanaman perkebunan yang sehat, lestari, dan berdaya saing tinggi untuk kesejahteraan pekebun Kalimantan Timur.',
    primaryCtaText: 'Kenali Layanan Kami',
    primaryCtaLink: '/layanan',
    secondaryCtaText: 'Lihat Publikasi & Panduan OPT',
    secondaryCtaLink: '/publikasi',
    slides: [
      {
        id: 1,
        title: 'Kantor UPTD P2TP',
        subtitle: 'Kantor Pelayanan Pengendalian',
        description:
          'Pendekatan ramah lingkungan berbasis kearifan ekologi dan pelestarian musuh alami untuk menjaga produktivitas kebun masyarakat.',
        imageUrl: '/images/slides/slide-1.jpg',
      },
      {
        id: 2,
        title: 'Pengendalian Bercak Daun Kelapa Sawit',
        subtitle: 'Serangan Alga pada tanaman kelapa sawit',
        description:
          'Isolasi, perbanyakan, dan distribusi Trichoderma sp., Beauveria bassiana, dan Metarhizium anisopliae untuk pekebun mandiri.',
        imageUrl: '/images/slides/slide-2.jpg',
      },
      {
        id: 3,
        title: 'Sapras Pengendalian',
        subtitle: 'Pendampingan Teknis Langsung Bersama Petani Lapangan',
        description:
          'Peningkatan kapasitas pekebun dalam identifikasi dini gejala penyakit perakaran dan aplikasi pestisida nabati.',
        imageUrl: '/images/slides/slide-3.jpg',
      },
      {
        id: 4,
        title: 'Demplot APH',
        subtitle: 'Sistem Informasi Pemantauan Iklim Perkebunan',
        description:
          'Kesiapsiagaan menghadapi kelembaban tinggi guna mencegah ledakan jamur akar dan penyakit busuk pupus.',
        imageUrl: '/images/slides/slide-4.jpg',
      },
    ],
    stats: [
      {
        value: '10',
        label: 'Kabupaten & Kota',
        sublabel: 'Wilayah Jangkauan Pemantauan Lapangan',
      },
      {
        value: '24/7',
        label: 'Layanan Siaga Lapor OPT',
        sublabel: 'Respon Cepat Petugas Lapangan Posko',
      },
      {
        value: '100%',
        label: 'Hayati Ramah Lingkungan',
        sublabel: 'Prioritas Formulasi Agens Hayati & Non-Kimia',
      },
    ],
  },
  welcome: {
    badge: 'Komitmen Pelayanan Publik',
    title: 'Menjaga Produktivitas & Kelestarian Perkebunan Bumi Etam',
    leaderName: 'Mahmud Kahfi, S.P., M.P.',
    leaderTitle: 'Kepala UPTD Pengembangan Perlindungan Tanaman Perkebunan',
    leaderPhoto: '/images/leader-mahmud-kahfi.png',
    speechContent:
      'Melalui prinsip Profesional, Amanah dan Peduli, UPTD P2TP Dinas Perkebunan Provinsi Kalimantan Timur berdiri teguh di garda terdepan melindungi komoditas unggulan daerah — Kelapa Sawit, Karet, Kakao, Lada, dan Kelapa Dalam — dari ancaman hama dan penyakit. Kami mengedepankan pendekatan Pengendalian Hama Terpadu (PHT) yang berbasis biologi dan kelestarian ekosistem.',
  },
  sidebar: {
    alertTitle: 'Kesiapsiagaan Cuaca Lembab & Hujan Tinggi',
    alertDescription:
      'Waspadai potensi penyebaran jamur akar putih pada tanaman karet dan penyakit busuk buah kakao saat curah hujan meningkat di sentra perkebunan rakyat.',
    alertCommodity: 'Kelapa Sawit, Karet & Kakao',
    alertLevel: 'SIAGA II (PENGAMATAN INTENSIF)',
    alertCtaText: 'Informasi Kontak Petugas Wilayah',
    alertCtaLink: '/kontak',
    hotlinePhone: '(0541) 273580 ',
    hotlineHoursWeekday: '08.00 - 16.00 WITA',
    hotlineHoursFriday: '08.00 - 11.00 WITA',
  },
  agendaPubSection: {
    title: 'Agenda & Publikasi Teknis',
    subtitle: 'Jadwal pendampingan lapangan dan rujukan operasional standar terkini UPTD P2TP',
    agendaCtaText: 'Lihat Semua Agenda Kegiatan UPTD',
    agendaCtaLink: '/agenda',
    pubCtaText: 'Unduh Publikasi & Dokumen SOP Lengkap',
    pubCtaLink: '/publikasi',
  },
  gallerySection: {
    badge: 'Dokumentasi Tindakan Nyata',
    title: 'Galeri Kegiatan Perlindungan',
    subtitle: 'Aktivitas pengawalan kesehatan tanaman perkebunan bersama petani dan penyuluh se-Kalimantan Timur.',
    ctaText: 'Lihat Semua Dokumentasi Foto',
    ctaLink: '/galeri',
  },
  videoSection: {
    badge: 'Media Audio Visual Edukasi',
    title: 'Video Edukasi & Pengendalian OPT',
    subtitle: 'Panduan praktis berformat video untuk mempermudah pekebun mengendalikan hama dan penyakit secara terpadu.',
    ctaText: 'Saluran Video YouTube UPTD',
    ctaLink: 'https://www.youtube.com',
  },
  footer: {
    description:
      'Unit Pelaksana Teknis Daerah Pengembangan Perlindungan Tanaman Perkebunan pada Dinas Perkebunan Provinsi Kalimantan Timur mengawal ketahanan dan perlindungan komoditas strategis perkebunan di Benua Etam.',
    copyrightText: 'Hak Cipta Dilindungi. UPTD P2TP Pemerintah Provinsi Kalimantan Timur.',
    quickLinksTitle: 'Tautan Cepat & Layanan',
    channelsTitle: 'Saluran Informasi Publik',
  },
};
