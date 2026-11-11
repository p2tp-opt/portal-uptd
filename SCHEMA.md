# SCHEMA.md — Model Data dan Rancangan Basis Data

**Status:** RANCANGAN. Tahap 1 tidak memakai basis data. Tidak ada proyek Supabase yang dibuat dan tidak ada SQL yang boleh dijalankan sebelum Tahap 2 disetujui pengguna.

Dokumen ini punya dua fungsi:
1. **Tahap 1:** menetapkan tipe TypeScript dan antarmuka repository (`src/types/content.ts`, `src/services/contentRepository.ts`).
2. **Tahap 2:** rancangan tabel, RLS, dan storage Supabase agar migrasi tidak mengubah komponen UI.

Sumber: PRD bagian 10.3 dan 12.

---

## 1. Prinsip

- Komponen **tidak** tahu sumber data. Semua pembacaan lewat `ContentRepository`.
- Tahap 1: implementasi `StaticContentRepository` membaca `src/data/mockData.ts`.
- Tahap 2: tambah `SupabaseContentRepository` dengan antarmuka sama, ganti di satu titik (`services/index.ts`).
- Tipe TypeScript memakai `camelCase`; kolom SQL memakai `snake_case`. Pemetaan ada di satu berkas mapper.
- Semua tanggal disimpan ISO 8601; zona tampil `Asia/Makassar`.
- Data contoh wajib ditandai (`isSample: true` di mock; tidak ada di basis data produksi).

---

## 2. Tipe TypeScript (Tahap 1)

Padanan langsung bagian 12 PRD. Penambahan di luar PRD diberi tanda `// +`.

```ts
// src/types/content.ts
export type ISODate = string;      // 2026-11-11
export type ISODateTime = string;  // 2026-11-11T09:48:00+08:00

export type ContentStatus = 'draft' | 'published' | 'archived'; // +

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;          // teks biasa/markdown; jangan HTML mentah (lihat SECURITY.md)
  category: string;
  coverImage?: string;
  publishedAt: ISODateTime;
  author: string;
  status?: ContentStatus;   // +
  isSample?: boolean;       // + khusus mock
}

export type AgendaStatus = 'akan-datang' | 'berlangsung' | 'selesai' | 'dibatalkan'; // +

export interface Agenda {
  id: string;
  title: string;
  description: string;
  eventDate: ISODate;
  startTime?: string;       // "09:00"
  endTime?: string;
  location?: string;
  status: AgendaStatus;
  isSample?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  slug: string;
  description: string;
  documentUrl?: string;
  coverImage?: string;
  publishedAt: ISODateTime;
  category: string;
  status?: ContentStatus;   // +
  isSample?: boolean;
}

export interface Photo {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  takenAt?: ISODate;
  category: string;
  altText: string;          // wajib
  isSample?: boolean;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;         // hanya domain yang diizinkan (SECURITY.md)
  publishedAt: ISODateTime;
  category: string;
  isSample?: boolean;
}

export interface SocialLink { platform: 'youtube' | 'instagram' | 'facebook' | 'x' | 'tiktok' | 'whatsapp' | 'lainnya'; url: string; label: string; }

export interface ProfileContact {
  institutionName: string;
  motto: string;
  description: string;
  address?: string;         // kosong sampai data resmi ada
  phone?: string;
  email?: string;
  officeHours?: string;     // +
  socialLinks: SocialLink[];
  verified: boolean;        // + false selama placeholder
}
```

---

## 3. Antarmuka Repository (Tahap 1)

```ts
export interface ListOptions { limit?: number; offset?: number; category?: string; query?: string; }

export interface ContentRepository {
  listNews(opts?: ListOptions): Promise<News[]>;
  getNewsBySlug(slug: string): Promise<News | null>;
  listAgenda(opts?: ListOptions & { upcomingOnly?: boolean }): Promise<Agenda[]>;
  getAgendaById(id: string): Promise<Agenda | null>;
  listPublications(opts?: ListOptions): Promise<Publication[]>;
  getPublicationBySlug(slug: string): Promise<Publication | null>;
  listPhotos(opts?: ListOptions): Promise<Photo[]>;
  listVideos(opts?: ListOptions): Promise<Video[]>;
  getProfile(): Promise<ProfileContact>;
}
```

Aturan:
- Semua metode asinkron, sehingga tidak berubah saat memakai jaringan.
- Hasil tak ditemukan: `null` atau `[]`, bukan melempar galat.
- Urutan default: berita/publikasi/video `publishedAt` menurun; agenda `eventDate` menaik.
- Pencarian dan filter (FR-11) dikerjakan di repository, bukan di komponen.

---

## 4. Rancangan Tabel Supabase (Tahap 2 — JANGAN DIJALANKAN)

> DRAFT. Dibekukan hanya setelah pengguna menyetujui Tahap 2. Agent dilarang membuat migrasi, menjalankan CLI Supabase, atau membuat proyek.

```sql
-- Ekstensi: pgcrypto / gen_random_uuid() bawaan.

create type content_status as enum ('draft','published','archived');
create type agenda_status  as enum ('akan-datang','berlangsung','selesai','dibatalkan');

create table news (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  excerpt      text not null,
  content      text not null,
  category     text not null,
  cover_image  text,
  published_at timestamptz not null default now(),
  author       text not null,
  status       content_status not null default 'draft',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table agenda (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  event_date  date not null,
  start_time  time,
  end_time    time,
  location    text,
  status      agenda_status not null default 'akan-datang',
  visibility  content_status not null default 'draft',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table publications (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  description  text not null default '',
  document_url text,
  cover_image  text,
  published_at timestamptz not null default now(),
  category     text not null,
  status       content_status not null default 'draft',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table photos (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  image_url   text not null,
  taken_at    date,
  category    text not null,
  alt_text    text not null check (length(alt_text) > 0),
  status      content_status not null default 'draft',
  created_at  timestamptz not null default now()
);

create table videos (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  thumbnail_url text not null,
  video_url     text not null,
  published_at  timestamptz not null default now(),
  category      text not null,
  status        content_status not null default 'draft',
  created_at    timestamptz not null default now()
);

-- Satu baris saja (singleton)
create table site_profile (
  id               smallint primary key default 1 check (id = 1),
  institution_name text not null,
  motto            text not null,
  description      text not null,
  address          text,
  phone            text,
  email            text,
  office_hours     text,
  social_links     jsonb not null default '[]'::jsonb,
  updated_at       timestamptz not null default now()
);

-- Daftar admin; rujuk auth.users, bukan menyimpan sandi
create table admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  role       text not null check (role in ('admin','editor')),
  created_at timestamptz not null default now()
);

create index on news (published_at desc) where status = 'published';
create index on agenda (event_date);
create index on publications (published_at desc) where status = 'published';
```

---

## 5. Rancangan Row Level Security (Tahap 2)

RLS **wajib aktif** pada semua tabel di atas.

```sql
alter table news          enable row level security;
alter table agenda        enable row level security;
alter table publications  enable row level security;
alter table photos        enable row level security;
alter table videos        enable row level security;
alter table site_profile  enable row level security;
alter table admin_users   enable row level security;

create function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admin_users where user_id = auth.uid());
$$;

-- Publik hanya membaca yang sudah terbit
create policy "public read published news" on news
  for select to anon, authenticated using (status = 'published');

-- Admin penuh
create policy "admin all news" on news
  for all to authenticated using (is_admin()) with check (is_admin());

create policy "public read profile" on site_profile for select to anon, authenticated using (true);
create policy "admin write profile" on site_profile for all to authenticated using (is_admin()) with check (is_admin());

create policy "admin read admin_users" on admin_users for select to authenticated using (is_admin());
```

---

## 6. Storage (Tahap 2)

| Bucket | Isi | Akses baca | Tulis |
|---|---|---|---|
| `news-images` | Cover berita | Publik | Admin |
| `gallery` | Foto galeri | Publik | Admin |
| `publications` | PDF/dokumen | Publik | Admin |
| `video-thumbs` | Thumbnail video | Publik | Admin |
