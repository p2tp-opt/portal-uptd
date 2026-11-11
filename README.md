# Website Resmi UPTD P2TP Dinas Perkebunan Provinsi Kalimantan Timur

Portal informasi resmi Unit Pelaksana Teknis Daerah Pengembangan Perlindungan Tanaman Perkebunan (UPTD P2TP) Dinas Perkebunan, Pemerintah Provinsi Kalimantan Timur.

> **Motto Pelayanan:** “Profesional, Amanah dan Peduli”

---

## 1. Stack Teknologi (Tahap 1 MVP)

- **UI Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Build-time)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Plus Jakarta Sans & Inter
- **Hosting Target:** Cloudflare Pages (SPA via `public/_redirects`)

---

## 2. Struktur Proyek

```
portal-uptd-kaltim/
├── public/
│   ├── _headers           # Konfigurasi keamanan HTTP & CSP Cloudflare
│   ├── _redirects         # Routing fallback SPA Cloudflare Pages
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/        # Komponen umum (SampleBadge, Breadcrumb)
│   │   ├── home/          # Komponen Beranda (HeroSlider, QuickStats, dll)
│   │   └── layout/        # Shell layout (Header, Navbar, Footer, Layout)
│   ├── data/
│   │   └── mockData.ts    # Sumber data contoh statis lokal
│   ├── pages/             # Halaman aplikasi (HomePage, ProfilePage, dll)
│   ├── services/
│   │   └── contentRepository.ts # Lapisan abstraksi data (Repository Pattern)
│   ├── types/
│   │   └── content.ts     # Definisi tipe TypeScript terpusat
│   ├── utils/
│   │   └── date.ts        # Helper format tanggal WITA (Asia/Makassar)
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── AGENTS.md              # Aturan kerja agen coding
├── CHANGELOG.md           # Riwayat perubahan proyek
├── DESIGN.md              # Token desain dan pedoman visual
├── SCHEMA.md              # Model data dan rancangan basis data
├── SECURITY.md            # Aturan keamanan dan kepatuhan
└── package.json
```

---

## 3. Perintah Pengembangan

Gunakan perintah resmi berikut:

```bash
# 1. Instalasi dependensi
npm install

# 2. Menjalankan server pengembangan lokal (http://localhost:5173)
npm run dev

# 3. Pemeriksaan tipe TypeScript
npm run typecheck

# 4. Pemeriksaan kode via ESLint
npm run lint

# 5. Build produksi ke folder dist/
npm run build

# 6. Preview hasil build produksi
npm run preview
```

---

## 4. Panduan Deployment Cloudflare Pages

Proyek ini telah dikonfigurasi untuk Cloudflare Pages:
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **SPA Routing:** Telah disediakan `public/_redirects` (`/* /index.html 200`)
- **HTTP Security Headers:** Telah disediakan `public/_headers` (CSP, frame-options, nosniff)

---

## 5. Batasan Lingkup Tahap 1 & Transparansi Data

- Seluruh data yang ditampilkan pada Tahap 1 bersumber dari data lokal statis (`src/data/mockData.ts`).
- Komponen UI terhubung ke data melalui lapisan `ContentRepository` di `src/services/contentRepository.ts` sehingga siap dihubungkan ke Supabase pada Tahap 2 tanpa merombak antarmuka.
- Data alamat, nomor telepon, email kedinasan, nama pejabat, dan statistik berstatus **placeholder bertanda jelas** (`SampleBadge`) dan menunggu penetapan resmi dari instansi.
