# CHANGELOG

Semua perubahan penting pada proyek **Website UPTD Pengembangan Perlindungan Tanaman Perkebunan** dicatat di sini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/) dan versi mengikuti [Semantic Versioning](https://semver.org/lang/id/). Selama belum rilis publik, versi berada di `0.x`.

## Aturan Pencatatan

- Setiap perubahan yang memengaruhi perilaku, tampilan, struktur data, konfigurasi, atau keamanan **wajib** dicatat pada commit yang sama.
- Tulis di bagian `[Belum Dirilis]`; pindahkan ke nomor versi saat rilis.
- Gunakan kategori: `Ditambahkan`, `Diubah`, `Diperbaiki`, `Dihapus`, `Keamanan`, `Dokumentasi`.
- Satu baris per perubahan, kalimat singkat, bahasa Indonesia, tanpa rahasia atau data pribadi.
- Tanggal format `TAHUN-BULAN-HARI`.
- Perubahan yang menambah, menghapus, atau mengganti data placeholder juga dicatat.
- AI agent tidak boleh menghapus entri lama atau menulis ulang riwayat.

---

## [Belum Dirilis]

### Ditambahkan
- Inisialisasi React + Vite + TypeScript + Tailwind CSS + React Router DOM + Lucide React.
- Konfigurasi Tailwind dengan sistem token warna Kaltim dan tipografi Plus Jakarta Sans & Inter.
- Lapisan abstraksi data `ContentRepository` dan `StaticContentRepository` di `src/services/contentRepository.ts`.
- Definisi tipe data komprehensif di `src/types/content.ts`.
- Data contoh statis aman di `src/data/mockData.ts` dengan penanda `isSample: true` dan placeholder bertanda.
- Layout global: `Header` (tanggal dinamis WITA), `Navbar` (menu responsif + keyboard accessible mobile drawer), dan `Footer`.
- Halaman Beranda lengkap: `HeroSlider` (aksesibilitas slider, jeda/putar), `QuickStats`, `WelcomeSection`, `FeaturedServices`, `NewsSection`, `AgendaPublicationSection`, `Sidebar`, `GallerySection`, `VideoSection`, dan `CtaBanner`.
- Halaman publik lainnya: Profil, Layanan, Berita (daftar & detail), Agenda (daftar & detail), Publikasi (daftar & detail), Galeri, Kontak, dan 404 Not Found.
- File konfigurasi hosting Cloudflare Pages: `public/_redirects` dan `public/_headers`.

---

## [0.0.1] — 2026-11-11

### Dokumentasi
- Menambahkan `AGENTS.md`: aturan kerja AI agent (Antigravity Desktop dan OpenCode Desktop), lingkup Tahap 1, larangan, perintah, dan gerbang kualitas.
- Menambahkan `DESIGN.md`: token warna, tipografi, spasi, layout, komponen, dan keputusan selisih antara mock `code.html` dan PRD.
- Menambahkan `SCHEMA.md`: tipe TypeScript, antarmuka repository, rancangan tabel/RLS/storage Supabase (draft, belum dijalankan).
- Menambahkan `SECURITY.md`: aturan rahasia, XSS, embed, header Cloudflare, dependensi, aturan AI agent, dan daftar periksa rilis.
- Menambahkan `CHANGELOG.md`.

### Keamanan
- Menetapkan larangan menyimpan rahasia di frontend dan keharusan RLS pada Tahap 2.
- Menetapkan bahwa data resmi (alamat, kontak, nama pejabat, logo) tidak boleh dikarang.

### Catatan
- Tidak ada proyek Supabase yang dibuat dan tidak ada kode aplikasi yang ditulis pada versi ini.

---

## Pertanyaan Terbuka (dari PRD bagian 18)

- [ ] Nama resmi UPTD yang ditampilkan persis
- [ ] Sumber file logo resmi Pemprov Kaltim
- [ ] Alamat, telepon, email, dan media sosial resmi
- [ ] Domain/subdomain pemerintah yang dipakai
- [ ] Jenis layanan yang tampil saat peluncuran
- [ ] Penanggung jawab persetujuan konten dan keamanan
