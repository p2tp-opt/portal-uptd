// src/data/mockData.ts
// Satu-satunya tempat data contoh lokal (Tahap 1 MVP)
// PERHATIAN: Komponen DILARANG meng-import berkas ini secara langsung.
// Gunakan selalu ContentRepository dari src/services/contentRepository.ts

import { News, Agenda, Publication, Photo, Video, ProfileContact } from '../types/content';

// PLACEHOLDER — Data profil resmi menunggu konfirmasi instansi
export const mockProfile: ProfileContact = {
  institutionName: 'UPTD Pengembangan Perlindungan Tanaman Perkebunan (P2TP)',
  motto: 'Profesional, Amanah dan Peduli',
  description:
    'Unit Pelaksana Teknis Daerah Pengembangan Perlindungan Tanaman Perkebunan pada Dinas Perkebunan Provinsi Kalimantan Timur bertugas mengawal kesehatan, kelestarian, dan ketahanan tanaman komoditas strategis perkebunan di Benua Etam.',
  logoUrl: '', // Bisa diunggah atau diisi URL logo melalui menu CMS Pengaturan Profil
  // Alamat resmi
  address: 'Jl. Slamet Riyadi, Kel. Karang Asam Ilir, Kec. Sungai Kunjang, Samarinda, Kalimantan Timur',
  // Nomor telepon resmi yang diminta
  phone: '(0541) 273580 / (0541) 743488',
  email: 'uptd.p2tp@kaltimprov.go.id',
  officeHours: 'Senin - Kamis: 08.00 - 16.00 WITA | Jumat: 08.00 - 11.00 WITA',
  socialLinks: [
    { platform: 'youtube', url: 'https://www.youtube.com', label: 'YouTube Resmi P2TP' },
    { platform: 'instagram', url: 'https://www.instagram.com', label: 'Instagram Resmi P2TP' },
    { platform: 'whatsapp', url: 'https://wa.me/', label: 'Konsultasi WhatsApp Lapangan' },
  ],
  verified: false,
};

// PLACEHOLDER — Berita & Artikel Terkini (Contoh)
export const mockNews: News[] = [
  {
    id: 'news-1',
    title: 'Gerakan Pengendalian Hama Ulat Api pada Perkebunan Kelapa Sawit Rakyat',
    slug: 'gerakan-pengendalian-hama-ulat-api-kelapa-sawit',
    excerpt:
      'Upaya terpadu petugas pengamat perlindungan tanaman bersama kelompok tani dalam mengendalikan serangan ulat api menggunakan agens hayati ramah lingkungan.',
    content: `Perlindungan komoditas kelapa sawit rakyat dari ancaman ledakan populasi hama pemakan daun, khususnya ulat api (*Setothosea asigna*), memerlukan respon terpadu berbasis Pengendalian Hama Terpadu (PHT).

Tim pengamat lapangan UPTD P2TP Dinas Perkebunan Provinsi Kalimantan Timur bersama para pekebun swadaya melaksanakan bimbingan teknis dan gerakan aplikasi agens pengendali hayati (*Bacillus thuringiensis* serta virus *Borrelinavirus*).

Pendekatan hayati ini terbukti efektif menekan populasi ulat tanpa merusak keseimbangan musuh alami seperti predator *Sycanus dichotomus* dan *Eocanthecona furcellata* yang menjaga kebun tetap lestari.`,
    category: 'Gerakan Pengendalian',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-02-24T09:00:00+08:00',
    author: 'Tim Lapangan P2TP',
    status: 'published',
    isSample: true,
  },
  {
    id: 'news-2',
    title: 'Edukasi dan Perbanyakan Jamur Trichoderma sp. untuk Pengendalian Jamur Akar Putih',
    slug: 'edukasi-perbanyakan-jamur-trichoderma-akar-putih',
    excerpt:
      'Petani karet diberikan pelatihan teknik isolasi dan perbanyakan mandiri agens hayati Trichoderma sp. guna mencegah kerugian ekonomi akibat jamur akar putih.',
    content: `Penyakit jamur akar putih (*Rigidoporus microporus*) masih menjadi salah satu tantangan terbesar pada perkebunan karet rakyat di Kalimantan Timur.

Dalam upaya memperkuat kemandirian pekebun, Laboratorium Agens Pengendali Hayati (APH) UPTD P2TP menyelenggarakan pendampingan pembuatan biakan Trichoderma pada media tumbuh sederhana berbasis dedak dan beras jagung.

Dengan penerapan agens antagonis ini sejak awal penanaman atau peremajaan kebun, infeksi perakaran dapat dicegah secara berkelanjutan tanpa ketergantungan pada fungisida kimia sintetis yang mahal.`,
    category: 'Inovasi Hayati',
    coverImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-02-20T10:30:00+08:00',
    author: 'Seksi Agens Hayati P2TP',
    status: 'published',
    isSample: true,
  },
  {
    id: 'news-3',
    title: 'Kesiapsiagaan Dampak Cuaca Ekstrem terhadap Kesehatan Tanaman Perkebunan',
    slug: 'kesiapsiagaan-dampak-cuaca-ekstrem-tanaman-perkebunan',
    excerpt:
      'Pemantauan rutin dan peringatan dini kelembaban tinggi guna mengantisipasi penyebaran penyakit tanaman pada musim penghujan di Kalimantan Timur.',
    content: `Tingginya curah hujan dan kelembaban udara yang berkepanjangan dapat memicu peningkatan insidensi penyakit tanaman, seperti busuk pupus pada kelapa sawit dan penyakit busuk buah (*Phytophthora*) pada tanaman kakao.

UPTD P2TP mengimbau seluruh kelompok tani untuk mengintensifkan sanitasi kebun, memperbaiki drainase rorak, dan melaporkan gejala serangan dini kepada petugas pengamat di kecamatan setempat.

Langkah preventif dini merupakan kunci utama dalam menjaga keberlanjutan produktivitas komoditas perkebunan masyarakat.`,
    category: 'Mitigasi Iklim',
    coverImage: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-02-17T08:15:00+08:00',
    author: 'Subbag Peramalan OPT',
    status: 'published',
    isSample: true,
  },
];

// PLACEHOLDER — Agenda Kegiatan Terdekat (Contoh)
export const mockAgenda: Agenda[] = [
  {
    id: 'agenda-1',
    title: 'Bimbingan Teknis Pengendalian Hama Helopeltis pada Tanaman Kakao',
    description:
      'Pelatihan lapangan pengenalan gejala tusukan buah kakao dan teknik pengendalian ramah lingkungan bersama penyuluh dan kelompok tani.',
    eventDate: '2026-03-04',
    startTime: '08:30',
    endTime: '12:30',
    location: 'Balai Pertemuan Kelompok Tani (Placeholder)',
    status: 'akan-datang',
    isSample: true,
  },
  {
    id: 'agenda-2',
    title: 'Workshop Pembuatan Pestisida Nabati Berbahan Mimba & Serai Wangi',
    description:
      'Praktik pembuatan ekstrak daun mimba dan minyak serai wangi sebagai repellent alami hama penggerek batang dan kutu daun.',
    eventDate: '2026-03-12',
    startTime: '09:00',
    endTime: '14:00',
    location: 'Laboratorium APH UPTD P2TP Samarinda (Placeholder)',
    status: 'akan-datang',
    isSample: true,
  },
  {
    id: 'agenda-3',
    title: 'Rapat Koordinasi Peramalan dan Pemetaan Serangan Kumbang Tanduk',
    description:
      'Evaluasi pemantauan populasi Oryctes rhinoceros di areal peremajaan (replanting) sawit rakyat.',
    eventDate: '2026-03-19',
    startTime: '09:00',
    endTime: '12:00',
    location: 'Aula Kantor Dinas Perkebunan (Placeholder)',
    status: 'akan-datang',
    isSample: true,
  },
];

// PLACEHOLDER — Publikasi & Buku Saku Teknis (Contoh)
export const mockPublications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Buku Saku Pengenalan Organisme Pengganggu Tumbuhan (OPT) Perkebunan Kaltim',
    slug: 'buku-saku-pengenalan-opt-perkebunan-kaltim',
    description:
      'Panduan ringkas bergambar untuk mengenali gejala serangan hama utama pada tanaman kelapa sawit, karet, kakao, dan lada di Kalimantan Timur.',
    documentUrl: '#',
    publishedAt: '2026-01-15T08:00:00+08:00',
    category: 'Buku Saku Teknis',
    fileSize: '8.4 MB (Contoh)',
    fileType: 'PDF',
    status: 'published',
    isSample: true,
  },
  {
    id: 'pub-2',
    title: 'Standar Operasional Prosedur (SOP) Perbanyakan Mandiri Jamur Beauveria bassiana',
    slug: 'sop-perbanyakan-mandiri-jamur-beauveria-bassiana',
    description:
      'Petunjuk teknis langkah demi langkah pembiakan isolat Beauveria pada media beras jagung untuk skala kelompok tani mandiri.',
    documentUrl: '#',
    publishedAt: '2026-01-20T09:00:00+08:00',
    category: 'Pedoman Teknis',
    fileSize: '3.2 MB (Contoh)',
    fileType: 'PDF',
    status: 'published',
    isSample: true,
  },
  {
    id: 'pub-3',
    title: 'Pedoman Pengendalian Hama Terpadu (PHT) pada Tanaman Kelapa Sawit Rakyat',
    slug: 'pedoman-pht-kelapa-sawit-rakyat',
    description:
      'Strategi integrasi pemantauan populasi, pelestarian predator alami, dan sanitasi kebun sawit berkelanjutan.',
    documentUrl: '#',
    publishedAt: '2026-02-01T10:00:00+08:00',
    category: 'Regulasi & SOP',
    fileSize: '5.9 MB (Contoh)',
    fileType: 'PDF',
    status: 'published',
    isSample: true,
  },
];

// PLACEHOLDER — Dokumentasi Galeri Foto Kegiatan (Contoh)
export const mockPhotos: Photo[] = [
  {
    id: 'photo-1',
    title: 'Pengamatan Lapangan Serangan Hama di Kebun Kelapa Sawit',
    description: 'Petugas perlindungan tanaman melakukan surveilans rutin tingkat kerusakan pelepah sawit.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    takenAt: '2026-02-18',
    category: 'Pengamatan Lapangan',
    altText: 'Petugas pengamat perkebunan memeriksa pelepah kelapa sawit di lapangan terbuka',
    isSample: true,
  },
  {
    id: 'photo-2',
    title: 'Produksi dan Perbanyakan Agens Pengendali Hayati di Laboratorium',
    description: 'Proses inokulasi biakan murni jamur antagonis pada media steril di Lab APH.',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    takenAt: '2026-02-15',
    category: 'Laboratorium APH',
    altText: 'Staf laboratorium membiakkan isolat jamur hayati di dalam biosafety cabinet',
    isSample: true,
  },
  {
    id: 'photo-3',
    title: 'Bimbingan Teknis Pembuatan Pestisida Nabati untuk Kelompok Tani',
    description: 'Praktik langsung peracikan pestisida nabati bersama para anggota kelompok tani perkebunan.',
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    takenAt: '2026-02-11',
    category: 'Penyuluhan & Bimtek',
    altText: 'Instruktur mendemonstrasikan alat ekstraksi pestisida nabati kepada petani perkebunan',
    isSample: true,
  },
  {
    id: 'photo-4',
    title: 'Pemeriksaan Kesehatan Perakaran Tanaman Karet',
    description: 'Diagnosa dini gejala jamur akar putih pada tegakan karet masyarakat.',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    takenAt: '2026-02-08',
    category: 'Pengamatan Lapangan',
    altText: 'Pemeriksaan sistem perakaran tanaman karet dari serangan miselium jamur',
    isSample: true,
  },
];

// PLACEHOLDER — Video Edukasi & Pengendalian OPT (Contoh)
export const mockVideos: Video[] = [
  {
    id: 'video-1',
    title: 'Video Panduan Pengendalian Hama Ulat Api Berbasis Hayati',
    description:
      'Tata cara aplikasi virus Borrelinavirus dan agens hayati Bacillus thuringiensis dalam menekan serangan ulat api.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    publishedAt: '2026-02-14T10:00:00+08:00',
    category: 'Pengendalian Hayati',
    duration: '08:42',
    isSample: true,
  },
  {
    id: 'video-2',
    title: 'Mengenal Predator Alami Hama: Sycanus dan Eocanthecona',
    description:
      'Karakteristik biologis serangga predator sahabat petani perkebunan yang memangsa ulat kantung dan ulat api.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    publishedAt: '2026-02-05T09:00:00+08:00',
    category: 'Edukasi Ekologi',
    duration: '05:15',
    isSample: true,
  },
  {
    id: 'video-3',
    title: 'Teknik Perbanyakan Sederhana Jamur Beauveria bassiana pada Jagung',
    description:
      'Tutorial praktis perbanyakan inokulum jamur entomopatogen pada media jagung giling skala rumah tangga tani.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    publishedAt: '2026-01-25T11:00:00+08:00',
    category: 'Praktik Lapang',
    duration: '07:20',
    isSample: true,
  },
];
