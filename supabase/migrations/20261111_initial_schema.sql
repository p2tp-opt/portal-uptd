-- ==============================================================================
-- SKEMA BASIS DATA SUPABASE WEBSITE UPTD P2TP PROV. KALTIM
-- Jalankan skrip SQL ini di Dashboard Supabase > SQL Editor
-- Proyek: https://smbmebkindtrqbhnygti.supabase.co
-- ==============================================================================

-- 1. Ekstensi
create extension if not exists "pgcrypto";

-- 2. Tipe Enum
do $$ begin
  create type content_status as enum ('draft', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type agenda_status as enum ('akan-datang', 'berlangsung', 'selesai', 'dibatalkan');
exception
  when duplicate_object then null;
end $$;

-- 3. Tabel Berita (news)
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null,
  cover_image text,
  published_at timestamptz not null default now(),
  author text not null,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Tabel Agenda (agenda)
create table if not exists public.agenda (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  event_date date not null,
  start_time text,
  end_time text,
  location text,
  status agenda_status not null default 'akan-datang',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. Tabel Publikasi & SOP (publications)
create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  document_url text,
  cover_image text,
  file_size text,
  file_type text default 'PDF',
  category text not null,
  published_at timestamptz not null default now(),
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. Tabel Galeri Foto (photos)
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  taken_at date,
  category text not null,
  alt_text text not null,
  created_at timestamptz not null default now()
);

-- 7. Tabel Video Edukasi (videos)
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text not null,
  video_url text not null,
  duration text,
  category text not null,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- 8. Tabel Profil & Kontak Instansi (site_profile - singleton)
create table if not exists public.site_profile (
  id smallint primary key default 1 check (id = 1),
  institution_name text not null,
  motto text not null,
  description text not null,
  logo_url text,
  address text,
  phone text,
  email text,
  office_hours text,
  social_links jsonb not null default '[]'::jsonb,
  verified boolean not null default false,
  updated_at timestamptz not null default now()
);

-- ==============================================================================
-- KEAMANAN: ROW LEVEL SECURITY (RLS)
-- ==============================================================================
alter table public.news enable row level security;
alter table public.agenda enable row level security;
alter table public.publications enable row level security;
alter table public.photos enable row level security;
alter table public.videos enable row level security;
alter table public.site_profile enable row level security;

-- Policy Akses Publik (Read-Only)
drop policy if exists "Publik dapat membaca berita" on public.news;
create policy "Publik dapat membaca berita" on public.news for select using (true);

drop policy if exists "Publik dapat membaca agenda" on public.agenda;
create policy "Publik dapat membaca agenda" on public.agenda for select using (true);

drop policy if exists "Publik dapat membaca publikasi" on public.publications;
create policy "Publik dapat membaca publikasi" on public.publications for select using (true);

drop policy if exists "Publik dapat membaca foto" on public.photos;
create policy "Publik dapat membaca foto" on public.photos for select using (true);

drop policy if exists "Publik dapat membaca video" on public.videos;
create policy "Publik dapat membaca video" on public.videos for select using (true);

drop policy if exists "Publik dapat membaca profil" on public.site_profile;
create policy "Publik dapat membaca profil" on public.site_profile for select using (true);

-- Policy Akses Penuh Operator via Anon / Service
drop policy if exists "Operator dapat mengelola berita" on public.news;
create policy "Operator dapat mengelola berita" on public.news for all using (true) with check (true);

drop policy if exists "Operator dapat mengelola agenda" on public.agenda;
create policy "Operator dapat mengelola agenda" on public.agenda for all using (true) with check (true);

drop policy if exists "Operator dapat mengelola publikasi" on public.publications;
create policy "Operator dapat mengelola publikasi" on public.publications for all using (true) with check (true);

drop policy if exists "Operator dapat mengelola foto" on public.photos;
create policy "Operator dapat mengelola foto" on public.photos for all using (true) with check (true);

drop policy if exists "Operator dapat mengelola video" on public.videos;
create policy "Operator dapat mengelola video" on public.videos for all using (true) with check (true);

drop policy if exists "Operator dapat mengelola profil" on public.site_profile;
create policy "Operator dapat mengelola profil" on public.site_profile for all using (true) with check (true);

-- ==============================================================================
-- DATA AWAL (SEED INITIAL DATA)
-- ==============================================================================
insert into public.site_profile (id, institution_name, motto, description, logo_url, address, phone, email, office_hours, verified)
values (
  1,
  'UPTD Pengembangan Perlindungan Tanaman Perkebunan (P2TP)',
  'Profesional, Amanah dan Peduli',
  'Unit Pelaksana Teknis Daerah Pengembangan Perlindungan Tanaman Perkebunan pada Dinas Perkebunan Provinsi Kalimantan Timur mengawal ketahanan dan perlindungan komoditas strategis perkebunan di Benua Etam.',
  '',
  'Jl. Slamet Riyadi, Kel. Karang Asam Ilir, Kec. Sungai Kunjang, Samarinda, Kalimantan Timur',
  '(0541) 273580 / (0541) 743488',
  'uptd.p2tp@kaltimprov.go.id',
  'Senin - Kamis: 08.00 - 16.00 WITA | Jumat: 08.00 - 11.00 WITA',
  true
) on conflict (id) do nothing;
