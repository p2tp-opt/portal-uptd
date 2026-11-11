# AGENTS.md — Aturan Kerja untuk AI Coding Agent

Proyek: **Website UPTD Pengembangan Perlindungan Tanaman Perkebunan (P2TP)** — Dinas Perkebunan, Pemerintah Provinsi Kalimantan Timur.
Motto: "Profesional, Amanah dan Peduli".

Berkas ini adalah pintu masuk utama untuk agent apa pun, termasuk **Antigravity Desktop** dan **OpenCode Desktop**. Keduanya membaca `AGENTS.md` di root repositori sebagai instruksi proyek. Jika alat Anda memakai berkas instruksi lain (misalnya `GEMINI.md`, `.agent/rules/`, atau `opencode.json`), berkas itu hanya boleh berisi satu baris yang merujuk ke sini, bukan salinan aturan.

---

## 1. Urutan Baca Wajib

Sebelum menulis atau mengubah apa pun, baca berurutan:

1. `AGENTS.md` (berkas ini)
2. `docs/PRD-Website-UPTD-Perlindungan-Tanaman-Perkebunan.md` — sumber kebenaran untuk kebutuhan produk
3. `DESIGN.md` — token, layout, komponen
4. `SCHEMA.md` — tipe data dan rancangan basis data
5. `SECURITY.md` — aturan keamanan
6. `CHANGELOG.md` — riwayat perubahan

Referensi visual: `docs/reference/code.html` dan screenshot Stitch. Keduanya adalah **referensi tampilan**, bukan kode yang disalin langsung (lihat DESIGN.md bagian 9).

**Prioritas jika ada konflik:** PRD > AGENTS.md > SECURITY.md > SCHEMA.md > DESIGN.md > code.html/Stitch. Jika konflik tidak bisa diselesaikan, berhenti dan tanyakan (bagian 10).

---

## 2. Lingkup: Tahap 1 Saja

**Boleh dibangun:** frontend publik React, layout, hero slider, berita/agenda/publikasi/galeri/video/profil/kontak, data contoh lokal, lapisan repository, README, deploy ke Cloudflare Pages.

**DILARANG pada Tahap 1:**
- Membuat proyek Supabase, menjalankan `supabase init/link/db push`, atau menambahkan `@supabase/supabase-js`.
- Login, role, autentikasi, admin panel/CMS.
- Formulir yang mengirim data ke server (termasuk "Lapor Serangan OPT" dan "Permohonan Bibit").
- Komentar, notifikasi, analitik khusus, API privat.
- Menjalankan migrasi atau SQL apa pun. SQL di `SCHEMA.md` hanya rancangan.

Jika permintaan pengguna menyentuh area terlarang, jelaskan bahwa itu Tahap 2/3 dan tawarkan persiapan yang aman (tipe data, interface repository).

---

## 3. Stack

| Bagian | Pilihan |
|---|---|
| UI | React + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS (build-time, **bukan** CDN) |
| Routing | React Router |
| Ikon | Lucide React (**bukan** Material Symbols) |
| Font | Plus Jakarta Sans (judul) dan Inter (isi), idealnya di-host sendiri |
| Hosting | Cloudflare Pages |
| Konten | Data statis lokal (`src/data/`) |

Jangan menambah dependensi baru tanpa alasan tertulis di PR/changelog. Hindari pustaka besar untuk hal yang bisa dikerjakan dengan HTML/CSS biasa (slider sederhana, lightbox, accordion).

---

## 4. Perintah

Pastikan `package.json` menyediakan skrip berikut (nama harus persis):

```bash
npm install        # instalasi
npm run dev        # server pengembangan
npm run build      # build produksi → dist/
npm run preview    # uji hasil build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

Cloudflare Pages: build command `npm run build`, output directory `dist`. SPA routing memerlukan `public/_redirects` berisi `/* /index.html 200`.

**Sebelum menyatakan tugas selesai, jalankan** `npm run typecheck`, `npm run lint`, dan `npm run build`. Laporkan hasil sebenarnya; jangan menyatakan lulus jika tidak dijalankan.

---

## 5. Struktur Folder

Ikuti struktur PRD bagian 11. Ringkas:

```
src/
  components/{layout,home,common}/
  data/mockData.ts          # satu-satunya tempat data contoh
  pages/
  services/contentRepository.ts
  types/content.ts
```

Aturan:
- Komponen hanya menerima data lewat props atau hook dari `services/`. **Komponen dilarang meng-import `mockData.ts` secara langsung.**
- Satu komponen satu berkas, nama berkas = nama komponen (PascalCase). Utilitas camelCase.
- Tipe data hanya didefinisikan di `src/types/content.ts` (selaras `SCHEMA.md`).
- Rute berbahasa Indonesia, huruf kecil, tanpa underscore: `/profil`, `/layanan`, `/berita`, `/berita/:slug`, `/agenda`, `/agenda/:id`, `/publikasi`, `/publikasi/:slug`, `/galeri`, `/kontak`.

---

## 6. Aturan Kode

- TypeScript `strict: true`. Hindari `any`; gunakan `unknown` lalu persempit.
- Komponen fungsional dan hooks. Tanpa state global kecuali benar-benar perlu.
- Teks antarmuka berbahasa Indonesia. Identifier kode berbahasa Inggris, sesuai PRD (`publishedAt`, `coverImage`).
- Format tanggal ditampilkan dengan `Intl.DateTimeFormat('id-ID')`, zona waktu `Asia/Makassar` (WITA). **Jangan menulis tanggal hari ini secara hardcode** di UI; `code.html` mengandung tanggal statis yang harus diganti tanggal dinamis.
- Tidak ada `console.log` tertinggal, kode mati, atau komentar TODO tanpa konteks.
- Tidak ada inline style kecuali nilai dinamis. Gunakan token Tailwind dari `DESIGN.md`.

---

## 7. Aturan Konten (Penting)

PRD melarang mengarang data resmi. Terapkan ketat:

1. **Alamat, telepon, email, jam layanan, media sosial, nama pejabat, logo:** hanya dari instansi. Nilai di `code.html` (alamat Karang Asam Ilir, nomor telepon, email, nama Kepala UPTD) **belum terverifikasi** dan harus diperlakukan sebagai placeholder. Catat di data dengan penanda `verified: false`/komentar `// PLACEHOLDER — menunggu data resmi`.
2. Di `code.html`, nomor telepon tidak konsisten ((0541) 743488 vs (0541) 273580) dan memuat klaim tak berdasar. Jangan disalin.
3. **Jangan menyalin klaim/angka dari mock** tanpa sumber: "10 Kabupaten & Kota", "24/7", "100% ramah lingkungan", "Tersertifikasi Dinaskes", "Indeks Kelembaban 88%", "Siaga I Aktif", "128+ dokumentasi", jumlah tayangan video, ukuran file PDF. Hapus, atau tandai jelas sebagai data contoh.
4. Semua data contoh berlabel "Contoh" di UI (badge kecil) dan di komentar kode, agar mudah dicari dan diganti: `grep -r "PLACEHOLDER" src/`.
5. Logo Pemprov Kaltim: pakai berkas resmi dari instansi di `public/logos/`. Jika belum ada, tampilkan placeholder netral bertulisan "Logo". Jangan menggambar ulang lambang dan jangan memakai URL `googleusercontent` dari Stitch.
6. Gambar dari Stitch adalah ilustrasi AI. Jangan dipakai sebagai foto kegiatan asli. Gunakan placeholder konsisten sampai foto resmi tersedia.
7. Jangan memasukkan data pribadi ke data contoh.

---

## 8. Aksesibilitas dan Performa (Gerbang Wajib)

- Elemen semantik (`header`, `nav`, `main`, `aside`, `footer`, `article`), heading berurutan, satu `h1` per halaman.
- Semua gambar informatif punya `alt` bermakna. Dekoratif: `alt=""`.
- Seluruh navigasi bisa dioperasikan keyboard, fokus terlihat (jangan `outline-none` tanpa pengganti).
- Menu mobile: tombol dengan `aria-expanded`, `aria-controls`, tutup dengan `Esc`.
- Hero slider: tombol sebelumnya/berikutnya, indikator, **tombol jeda**, auto-play mati saat `prefers-reduced-motion`, dan slide non-aktif tidak dibaca pembaca layar (`aria-hidden`).
- Kontras teks minimal WCAG AA (4.5:1 teks biasa). Verifikasi, jangan menebak.
- `loading="lazy"` untuk gambar di luar layar pertama; tetapkan `width`/`height` untuk mencegah layout shift. Video: tampilkan thumbnail, muat embed setelah diklik.
- Target Lighthouse Performance ≥ 80; laporkan skor nyata jika diukur.

---

## 9. Alur Kerja Agent

1. Pecah pekerjaan menjadi langkah kecil; kerjakan satu per satu.
2. Setiap perubahan bermakna dicatat di `CHANGELOG.md` (bagian `[Belum Dirilis]`) pada commit yang sama.
3. Commit kecil dan atomik. Format: `jenis: ringkasan` (`feat`, `fix`, `docs`, `style`, `refactor`, `chore`).
4. Jangan menulis ulang atau memformat ulang berkas yang tidak terkait.
5. Jangan menghapus berkas pengguna, `docs/`, atau riwayat git tanpa persetujuan.
6. Jangan memakai `git push --force`, `git reset --hard`, atau perintah destruktif lain tanpa izin eksplisit.
7. Jika sebuah perintah gagal (misalnya jaringan terblokir), laporkan apa adanya; jangan memalsukan hasil.

---

## 10. Kapan Harus Berhenti dan Bertanya

Berhenti dan tanyakan kepada pengguna jika:
- PRD, DESIGN, dan SCHEMA saling bertentangan.
- Tugas membutuhkan data resmi yang belum ada (alamat, kontak, logo, nama pejabat).
- Tugas meminta fitur di luar Tahap 1.
- Ada kebutuhan kredensial, akun, atau layanan eksternal.
- Perubahan bersifat destruktif atau tak dapat dibatalkan.

Pertanyaan terbuka dari PRD bagian 18 (nama resmi, logo, kontak, domain, jenis layanan, penanggung jawab konten) tetap terbuka sampai dijawab pengguna. Jangan menjawabnya sendiri.

---

## 11. Definisi Selesai

Sebuah tugas selesai bila: sesuai PRD dan kriteria penerimaan (PRD bagian 14), `typecheck`/`lint`/`build` lulus, tidak ada rahasia di kode, placeholder bertanda jelas, `CHANGELOG.md` diperbarui, dan dokumentasi terkait (README/DESIGN/SCHEMA) ikut diperbarui bila perilaku berubah.
