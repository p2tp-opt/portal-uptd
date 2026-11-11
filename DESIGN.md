# DESIGN.md — Sistem Desain Website UPTD P2TP

Sumber: PRD bagian 9, `code.html` (konfigurasi Tailwind dan struktur), dan screenshot Stitch. Dokumen ini menetapkan **apa yang dipakai**, **apa yang diubah**, dan **apa yang dibuang** dari mock.

**Karakter:** resmi, modern, bersih, informatif, ramah masyarakat, bernuansa hijau perkebunan dengan aksen emas Kaltim. Latar terang. Hindari animasi berlebihan dan teks panjang di banner.

---

## 1. Token Warna

Ambil dari konfigurasi Tailwind di `code.html`. Hanya token di bawah yang dipakai; sisanya dari palet Material boleh diabaikan agar `tailwind.config` tetap ramping.

### Inti

| Token | Hex | Pemakaian |
|---|---|---|
| `primary` | `#003629` | Top bar, footer, teks judul, tombol utama gelap |
| `primary-container` | `#1b4d3e` | Bar navigasi, panel gelap |
| `secondary` | `#2c694e` | Menu aktif, tautan, label bagian, ikon |
| `kaltim-gold` | `#E9A825` | Aksen, CTA utama (dengan teks gelap), indikator |
| `gold-light` | `#FDF6E7` | Latar kotak motto, badge emas |
| `tertiary` | `#402a00` | Teks pada latar emas muda |
| `tertiary-container` | `#5d3f00` | Teks motto/aksen cokelat |
| `tertiary-fixed` | `#ffdeab` | Teks aksen di atas latar hijau gelap |
| `tertiary-fixed-dim` | `#feba38` | Hover emas |
| `on-tertiary-fixed` | `#281900` | Teks di atas tombol emas |

### Permukaan dan teks

| Token | Hex | Pemakaian |
|---|---|---|
| `surface` / `background` | `#f0fdf1` | Latar halaman |
| `surface-container-lowest` | `#ffffff` | Kartu |
| `surface-container-low` | `#eaf7ec` | Latar seksi/galeri, item daftar |
| `surface-container` | `#e4f1e6` | Hover item |
| `surface-container-high` | `#dfebe0` | Placeholder gambar |
| `on-surface` | `#131e17` | Teks isi |
| `on-surface-variant` | `#404945` | Teks sekunder |
| `text-muted` | `#52655A` | Keterangan, metadata |
| `outline` | `#707974` | Placeholder input |
| `border-subtle` | `#E2E8E4` | Garis tipis |
| `on-primary` | `#ffffff` | Teks di atas hijau gelap |
| `on-primary-container` | `#8abda9` | Teks menu non-aktif di bar navigasi |

### Status/badge

| Token | Hex | Pemakaian |
|---|---|---|
| `badge-activity-bg` / `-text` | `#ECFDF5` / `#065F46` | Kegiatan, positif |
| `badge-opt-bg` / `-text` | `#FEE2E2` / `#991B1B` | Peringatan OPT, penting |
| `error` | `#ba1a1a` | Galat, ikon PDF |

### Aturan warna
- Warna emas **tidak** dipakai sebagai warna teks di atas putih (kontras rendah). Emas hanya sebagai latar/aksen dengan teks `on-tertiary-fixed`.
- Jangan mengandalkan warna saja untuk makna; sertakan teks/ikon.
- **Wajib mengukur kontras** pada: `text-muted` di atas `surface`, `on-primary-container` di atas `primary-container`, teks `caption` kecil, dan teks di atas gambar hero. Perbaiki token bila di bawah 4.5:1.
- Warna final mengikuti pedoman identitas visual resmi Pemprov Kaltim jika instansi menyediakannya; token di atas lalu menjadi default sementara.

---

## 2. Tipografi

Font: **Plus Jakarta Sans** (500–800) untuk judul/label, **Inter** (400–700) untuk isi. Host sendiri atau muat lewat Google Fonts dengan `display=swap` dan `preconnect`. Hanya muat bobot yang dipakai.

| Peran | Ukuran | Line-height | Letter-spacing | Bobot |
|---|---|---|---|---|
| `display-hero` | 3.25rem | 1.15 | -0.025em | 800 |
| `display-hero-mobile` | 2.125rem | 1.2 | -0.02em | 800 |
| `headline-lg` | 2.25rem | 1.25 | -0.02em | 700 |
| `headline-lg-mobile` | 1.75rem | 1.3 | -0.015em | 700 |
| `headline-md` | 1.625rem | 1.35 | -0.015em | 700 |
| `headline-sm` | 1.25rem | 1.4 | -0.01em | 600 |
| `body-lg` | 1.125rem | 1.65 | 0 | 400 |
| `body-md` | 1rem | 1.6 | 0 | 400 |
| `body-sm` | 0.875rem | 1.55 | 0.005em | 400 |
| `label-md` | 0.875rem | 1.4 | 0.01em | 600 |
| `label-sm` | 0.75rem | 1.3 | 0.04em | 700 |
| `caption` | 0.75rem | 1.4 | 0.02em | 500 |

Aturan: ukuran minimum teks 12px, dan hanya untuk metadata. Teks isi minimal 14px. Jangan memakai ukuran arbitrer `text-[10px]`/`text-[11px]` seperti di mock; gunakan `caption`.

---

## 3. Spasi, Radius, Bayangan

- Spasi: `space-xs` 0.25rem, `space-sm` 0.5rem, `space-md` 1rem, `space-lg` 1.5rem, `space-xl` 2.5rem, `space-2xl` 4rem; `gutter` 1.5rem (mobile 1rem); `margin` 2rem (mobile 1rem).
- Radius: `DEFAULT` 0.25rem, `lg` 0.5rem, `xl` 0.75rem, kartu `rounded-2xl`, panel CTA besar `rounded-3xl`, pil `rounded-full`.
- Bayangan: `shadow-sm` untuk kartu diam, `shadow-lg/xl` hanya saat hover atau kartu mengambang (stat cards).
- Lebar konten: `max-w-7xl` dengan padding `px-4 sm:px-6 lg:px-8`.
- Breakpoint: bawaan Tailwind. Navbar desktop tampil mulai `xl` (mock memakai `xl:flex`).

---

## 4. Layout Global

```
Header (fixed)
 ├─ Top bar      : tanggal dinamis | info singkat | kontak
 ├─ Brand bar    : logo + Pemprov Kaltim / Dinas Perkebunan / nama UPTD | kotak motto (≥lg)
 └─ Navbar       : menu | pencarian | (CTA)
Main
 ├─ Hero (menyatu di bawah header) + 3 kartu ringkasan mengambang
 ├─ Grid 8+4 : konten utama (col-span-8) + sidebar (col-span-4)
 ├─ Galeri (latar surface-container-low)
 ├─ Video
 └─ Strip CTA
Footer: 4 kolom + baris copyright
```

- Header `fixed`; `main` diberi padding-top setara tinggi header. **Jangan hardcode `172px`.** Ukur tinggi header (CSS variable atau `position: sticky`) agar tidak bocor saat teks membungkus di layar kecil.
- Pada mobile, header harus ringkas: top bar disembunyikan atau disederhanakan, brand tetap terbaca, navbar menjadi tombol hamburger (FR-02).
- Sidebar: di `lg` berada di samping; di bawah `lg` ditumpuk **setelah** konten utama. Tidak boleh menyempitkan konten.
- Tidak boleh ada scroll horizontal. Gunakan `min-w-0` pada anak grid yang berisi teks panjang.

---

## 5. Komponen

Setiap komponen punya padanan berkas di PRD bagian 11.

| Komponen | Aturan utama |
|---|---|
| **Header/Brand** | Logo resmi, nama "UPTD Pengembangan Perlindungan Tanaman Perkebunan", motto. Motto berupa kotak emas muda dengan garis kiri emas. |
| **Navbar** | Item aktif: `bg-secondary text-on-secondary font-bold rounded-lg`. Tandai dengan `aria-current="page"`. Submenu Profil dan Galeri sesuai PRD bagian 6. |
| **Menu mobile** | Panel penuh/drawer, kunci scroll latar, fokus berpindah ke panel, `Esc` menutup, fokus kembali ke tombol. |
| **HeroSlider** | Gambar latar nyata per slide (di mock hanya teks yang berganti; implementasikan ganti gambar). Scrim gradien `from-primary/95 via-primary/80 to-transparent`. Kontrol: sebelumnya, berikutnya, jeda/putar, indikator. Tinggi min 580/660px. Teks hero mengikuti placeholder PRD FR-03. |
| **Kartu ringkasan (3)** | Mengambang `-mt-10 lg:-mt-14`. Isi ditentukan data resmi; tanpa angka, ganti dengan ringkasan non-numerik. |
| **Kartu layanan/berita** | `rounded-2xl`, `shadow-sm`, hover `shadow-lg`, ikon/gambar `group-hover:scale-105` ringan. Judul `line-clamp-2`. Seluruh kartu menjadi satu tautan. |
| **Badge kategori** | Pil `rounded-full`, pasangan token badge. |
| **Agenda item** | Kotak tanggal (bulan + tanggal) + judul + lokasi. Tanggal dihasilkan dari `eventDate`. |
| **Publikasi item** | Ikon dokumen, judul, kategori/tanggal, tombol unduh dengan label teks tersembunyi (`aria-label`). Ukuran/format hanya jika benar. |
| **Galeri** | Grid 1/2/4 kolom, rasio 4:3, `alt` wajib. Lightbox opsional (FR-08) dan harus aksesibel: fokus terkunci, `Esc`, tombol tutup berlabel. |
| **Video** | Thumbnail + tombol putar; embed dimuat setelah klik, domain `youtube-nocookie.com` bila YouTube. Tidak ada autoplay. |
| **Footer** | 4 kolom: profil singkat, alamat dan kontak, tautan cepat, media sosial. Baris copyright memakai tahun dinamis. |
| **Empty state** | Ikon, pesan informatif, tautan balik (FR-06, 07, 08). |
| **Breadcrumb/Kembali** | Wajib di halaman detail (FR-10). |

Ikon: Lucide React, ukuran 16–24px, `aria-hidden` bila dekoratif. Pemetaan awal dari Material Symbols: `calendar_today`→`CalendarDays`, `call`→`Phone`, `mail`→`Mail`, `location_on`→`MapPin`, `search`→`Search`, `download`→`Download`, `play_arrow`→`Play`, `arrow_forward`→`ArrowRight`, `menu_book`→`BookOpen`, `science`→`FlaskConical`, `photo_camera`→`Camera`, `newspaper`→`Newspaper`, `schedule`→`Clock`, `link`→`Link`.

---

## 6. Interaksi dan Gerak

- Transisi 150–300 ms, hanya `transform`, `opacity`, `box-shadow`, `color`.
- Hover angkat `-translate-y-0.5/1` hanya pada kartu yang bisa diklik.
- Hormati `prefers-reduced-motion`: matikan auto-play slider, `animate-pulse`, skala hover.
- Fokus: ring 2px `kaltim-gold` atau `secondary` dengan offset; tidak dihilangkan.

---

## 7. Responsif

| Lebar | Perilaku |
|---|---|
| < 640 | Satu kolom, hero `display-hero-mobile`, kartu ringkasan bertumpuk, sidebar di bawah, top bar minimal |
| 640–1023 | 2 kolom untuk kartu/galeri, sidebar tetap di bawah |
| 1024–1279 | Grid 8+4, navbar masih hamburger |
| ≥ 1280 | Navbar penuh, hero maksimum |

Sentuh: target minimal 44×44 px. Uji pada 375, 768, 1280 px.

---

## 8. Peta Halaman → Bagian Mock

| Halaman | Gunakan dari mock |
|---|---|
| Beranda | Hero, sambutan, layanan, berita, agenda+publikasi, sidebar, galeri, video, strip CTA (tanpa bagian terlarang) |
| Profil | Kartu sambutan dan teks tugas/fungsi (konten resmi) |
| Layanan | Kartu layanan, bagian edukasi/konsultasi sebagai informasi, bukan sistem tiket |
| Berita/Agenda/Publikasi | Pola kartu dan daftar yang sama, plus halaman detail |
| Galeri | Grid foto + daftar video |
| Kontak | Blok alamat/kontak/jam (data resmi), peta opsional |

---

## 9. Selisih Mock vs PRD (Keputusan Wajib)

Mock `code.html` lebih luas dari PRD Tahap 1. Perlakuan:

| Elemen di mock | Keputusan |
|---|---|
| Tailwind via CDN, Google Fonts, Material Symbols | **Ganti**: Tailwind build-time, Lucide, font tertib |
| Tanggal hardcode "Kamis, 26 Februari 2026" | **Ganti** tanggal dinamis WITA |
| Kontrol font `A- A A+` | **Buang** dari MVP (di luar PRD); boleh dipertimbangkan kemudian |
| Ikon orang (kesan login) | **Buang** (tidak ada autentikasi) |
| Tombol "Lapor Serangan OPT", banner "Kirim Laporan", "Formulir Lapor OPT Online", "Permohonan Bibit Agens Hayati" | **Tahap 1**: jangan buat formulir. Ubah menjadi tautan informasi/kontak resmi bila ada, atau sembunyikan. Formulir masuk Tahap 3 |
| Widget "Peringatan Dini OPT" (kelembaban 88%, Siaga I) | **Buang** atau tampil sebagai contoh berlabel jelas; data operasional tidak boleh dikarang |
| Kartu angka (10, 24/7, 100%) | **Ganti** dengan fakta terverifikasi atau ringkasan non-angka |
| "Tersertifikasi Dinaskes", "Stok Bibit Murni" | **Buang** (klaim tak berdasar) |
| Nama Kepala UPTD, foto potret | **Placeholder** sampai disetujui instansi |
| Alamat, telepon, email, jam layanan | **Placeholder** terverifikasi-belum; nomor tidak konsisten |
| Jumlah tayangan, durasi, ukuran PDF, "128+" | **Buang** atau berasal dari data |
| Kolom pencarian di navbar | **Opsional** (FR-11), pencarian lokal; jika belum jadi, sembunyikan |
| Slider hanya mengganti teks | **Perbaiki**: ganti gambar dan hormati aksesibilitas |
| Gradien teks "Tanaman Perkebunan" pada hero | Boleh, asalkan kontras diverifikasi; sediakan warna cadangan |
| `-webkit` scrollbar disembunyikan (`::-webkit-scrollbar{display:none}`) | **Buang**; menyulitkan pengguna |
| `overscroll-behavior:none` pada body | **Buang** |
| Kelas `bg-radial` | Tidak valid di Tailwind bawaan; ganti `radial-gradient` kustom bila perlu |
| Tautan `href="#"` | **Ganti** dengan rute nyata atau tombol |
| Menu desktop tersembunyi sampai `xl` tanpa hamburger | **Tambah** hamburger |

---

## 10. Aset

- Logo resmi: `public/logos/` (SVG/PNG resolusi tinggi dari instansi). Jangan memakai URL Stitch/`googleusercontent`.
- Foto: `public/images/`, kompres (WebP/AVIF + cadangan), nama berkas deskriptif huruf kecil dengan tanda hubung.
- Placeholder gambar: latar `surface-container-high` dengan ikon dan tulisan "Foto belum tersedia".
- Semua foto yang menampilkan individu memerlukan izin (PRD bagian 16).

---

## 11. Daftar Periksa Desain

- [ ] Header, navbar, motto sesuai FR-01/02
- [ ] Hero lengkap dengan kontrol dan jeda (FR-03)
- [ ] Sidebar berpindah ke bawah pada ponsel (FR-05)
- [ ] Tidak ada scroll horizontal pada 320–1440 px
- [ ] Kontras diukur, tidak ditebak
- [ ] Tidak ada klaim/angka tanpa sumber
- [ ] Semua placeholder bertanda dan mudah dicari
