# Product Requirements Document (PRD)
## Website UPTD Pengembangan Perlindungan Tanaman Perkebunan

**Versi:** 1.0  
**Tanggal:** 11 November 2026  
**Status:** Draft kebutuhan produk  
**Nama produk:** Website UPTD Pengembangan Perlindungan Tanaman Perkebunan

---

## 1. Ringkasan Produk

Website UPTD Pengembangan Perlindungan Tanaman Perkebunan merupakan portal informasi resmi yang berfungsi sebagai pusat publikasi profil instansi, layanan dan kegiatan perlindungan tanaman perkebunan, berita, agenda, dokumentasi foto, serta video edukasi.

Motto: "Profesional, Amanah dan Peduli".

Pada tahap pertama, produk hanya mencakup frontend tanpa database dan tanpa autentikasi/admin panel. Struktur aplikasi disiapkan agar integrasi Supabase pada tahap berikutnya dapat dilakukan tanpa merombak antarmuka.

---

## 2. Fitur Fungsional Tahap 1 (MVP)

- FR-01: Header (Logo Pemprov Kaltim, nama UPTD, motto)
- FR-02: Navbar & Menu Mobile Responsif
- FR-03: Hero Slider dengan Kontrol, Jeda/Putar, A11y
- FR-04: Konten Utama Beranda
- FR-05: Sidebar Desktop / Ditumpuk di Mobile
- FR-06: Agenda dan Publikasi
- FR-07: Kolom Video Edukasi
- FR-08: Kolom Foto/Galeri Dokumentasi
- FR-09: Footer Resmi (Alamat, Kontak, Jam Layanan, Medsos, Copyright Dinamis)
- FR-10: Halaman Detail Berita, Agenda, Publikasi dengan Breadcrumb
- FR-11: Pencarian & Kategori Lokal

---

## 3. Aturan Data & Kepatuhan

- Larangan keras mengarang data resmi. Placeholder diberi penanda khusus.
- Tidak ada secret di frontend bundle.
- Komponen hanya membaca data via ContentRepository.
