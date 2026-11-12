// src/data/defaultServices.ts
import { ServiceItem } from '../types/content';

export const defaultServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Pengamatan & Pengendalian OPT Perkebunan',
    tag: 'Surveilans Lapang',
    description:
      'Pelayanan pengamatan berkala untuk memonitor kepadatan populasi dan intensitas serangan hama utama (seperti ulat api, kumbang tanduk, penggerek batang) dan penyakit tanaman perkebunan rakyat.',
    icon: 'radio',
    pointsTitle: 'Cakupan Kegiatan:',
    points: [
      'Surveilans rutin di sentra perkebunan sawit, karet, kakao, dan lada.',
      'Penerbitan peringatan dini (early warning system) potensi ledakan hama.',
      'Gerakan pengendalian massal bersama kelompok tani saat terjadi serangan darurat.',
    ],
  },
  {
    id: 'srv-2',
    title: 'Laboratorium Agens Pengendali Hayati (APH)',
    tag: 'Produksi Mikroba',
    description:
      'Laboratorium APH UPTD P2TP memproduksi, mengembangbiakkan, dan memelihara isolat mikroba bermanfaat untuk mengendalikan patogen tanaman secara aman dan ramah lingkungan.',
    icon: 'flask',
    pointsTitle: 'Jenis Agens Hayati yang Dikelola:',
    points: [
      'Trichoderma sp. — Pengendali jamur akar putih karet & busuk pangkal batang.',
      'Beauveria bassiana & Metarhizium — Jamur entomopatogen pembasmi hama serangga.',
      'Bimbingan teknis perbanyakan mandiri skala petani dengan media jagung dan dedak.',
    ],
  },
  {
    id: 'srv-3',
    title: 'Klinik Tanaman Perkebunan & Konsultasi',
    tag: 'Konsultasi & Diagnosa',
    description:
      'Pekebun dapat membawa atau mengirimkan sampel tanaman yang menunjukkan gejala sakit atau terserang hama untuk diperiksa dan didiagnosa oleh tenaga teknis perlindungan tanaman.',
    icon: 'stethoscope',
    pointsTitle: 'Alur Konsultasi Sederhana:',
    points: [
      'Petani mendokumentasikan gejala tanaman atau membawa sampel ke kantor/posko wilayah.',
      'Petugas mengidentifikasi penyebab penyakit (jamur, bakteri, virus, atau defisiensi hara).',
      'Pemberian rekomendasi penanganan teknis dan pembagian agens hayati sesuai ketersediaan.',
    ],
  },
];
