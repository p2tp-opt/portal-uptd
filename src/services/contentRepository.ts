// src/services/contentRepository.ts
// Lapisan Abstraksi Data (Repository Pattern)
// Mendukung Supabase Cloud Database secara Multi-Perangkat (Live Sync) dengan fallback otomatis ke LocalStorage

import {
  News,
  Agenda,
  Publication,
  Photo,
  Video,
  ProfileContact,
  ListOptions,
  SiteSettings,
} from '../types/content';
import {
  mockNews,
  mockAgenda,
  mockPublications,
  mockPhotos,
  mockVideos,
  mockProfile,
} from '../data/mockData';
import { defaultSiteSettings } from '../data/defaultSiteSettings';
import { supabase } from './supabaseClient';

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
  getSiteSettings(): Promise<SiteSettings>;

  // CRUD Berita
  createNews(item: Omit<News, 'id' | 'slug'>): Promise<News>;
  updateNews(id: string, item: Partial<News>): Promise<News | null>;
  deleteNews(id: string): Promise<boolean>;

  // CRUD Agenda
  createAgenda(item: Omit<Agenda, 'id'>): Promise<Agenda>;
  updateAgenda(id: string, item: Partial<Agenda>): Promise<Agenda | null>;
  deleteAgenda(id: string): Promise<boolean>;

  // CRUD Publikasi
  createPublication(item: Omit<Publication, 'id' | 'slug'>): Promise<Publication>;
  updatePublication(id: string, item: Partial<Publication>): Promise<Publication | null>;
  deletePublication(id: string): Promise<boolean>;

  // CRUD Galeri Foto
  createPhoto(item: Omit<Photo, 'id'>): Promise<Photo>;
  deletePhoto(id: string): Promise<boolean>;

  // CRUD Galeri Video
  createVideo(item: Omit<Video, 'id'>): Promise<Video>;
  deleteVideo(id: string): Promise<boolean>;

  // Pengaturan & Kustomisasi
  updateProfile(profile: Partial<ProfileContact>): Promise<ProfileContact>;
  updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings>;
  resetToSampleData(): Promise<void>;
}

const STORAGE_KEYS = {
  NEWS: 'p2tp_cms_news',
  AGENDA: 'p2tp_cms_agenda',
  PUBLICATIONS: 'p2tp_cms_publications',
  PHOTOS: 'p2tp_cms_photos',
  VIDEOS: 'p2tp_cms_videos',
  PROFILE: 'p2tp_cms_profile',
  SITE_SETTINGS: 'p2tp_cms_site_settings',
};

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --------------------------------------------------------------------------
// 1. IMPLEMENTASI LOCAL STORAGE (Fallback & Offline Standalone)
// --------------------------------------------------------------------------
export class LocalStorageContentRepository implements ContentRepository {
  private getStorage<T>(key: string, defaultData: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return defaultData;
  }

  private setStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // ignore
    }
  }

  async listNews(opts?: ListOptions): Promise<News[]> {
    let result = this.getStorage<News[]>(STORAGE_KEYS.NEWS, mockNews);
    if (opts?.category) {
      result = result.filter((n) => n.category.toLowerCase() === opts.category?.toLowerCase());
    }
    if (opts?.query) {
      const q = opts.query.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (opts?.offset !== undefined) result = result.slice(opts.offset);
    if (opts?.limit !== undefined) result = result.slice(0, opts.limit);
    return result;
  }

  async getNewsBySlug(slug: string): Promise<News | null> {
    const list = this.getStorage<News[]>(STORAGE_KEYS.NEWS, mockNews);
    return list.find((n) => n.slug === slug) || null;
  }

  async createNews(item: Omit<News, 'id' | 'slug'>): Promise<News> {
    const list = this.getStorage<News[]>(STORAGE_KEYS.NEWS, mockNews);
    const id = `news-${Date.now()}`;
    const slug = `${generateSlug(item.title)}-${Date.now().toString().slice(-4)}`;
    const newItem: News = { ...item, id, slug, status: item.status || 'published' };
    list.unshift(newItem);
    this.setStorage(STORAGE_KEYS.NEWS, list);
    return newItem;
  }

  async updateNews(id: string, item: Partial<News>): Promise<News | null> {
    const list = this.getStorage<News[]>(STORAGE_KEYS.NEWS, mockNews);
    const idx = list.findIndex((n) => n.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...item };
    if (item.title && item.title !== list[idx].title) {
      updated.slug = `${generateSlug(item.title)}-${id.slice(-4)}`;
    }
    list[idx] = updated;
    this.setStorage(STORAGE_KEYS.NEWS, list);
    return updated;
  }

  async deleteNews(id: string): Promise<boolean> {
    let list = this.getStorage<News[]>(STORAGE_KEYS.NEWS, mockNews);
    const initialLen = list.length;
    list = list.filter((n) => n.id !== id);
    this.setStorage(STORAGE_KEYS.NEWS, list);
    return list.length < initialLen;
  }

  async listAgenda(opts?: ListOptions & { upcomingOnly?: boolean }): Promise<Agenda[]> {
    let result = this.getStorage<Agenda[]>(STORAGE_KEYS.AGENDA, mockAgenda);
    if (opts?.upcomingOnly) {
      result = result.filter((a) => a.status === 'akan-datang');
    }
    result.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    if (opts?.limit !== undefined) result = result.slice(0, opts.limit);
    return result;
  }

  async getAgendaById(id: string): Promise<Agenda | null> {
    const list = this.getStorage<Agenda[]>(STORAGE_KEYS.AGENDA, mockAgenda);
    return list.find((a) => a.id === id) || null;
  }

  async createAgenda(item: Omit<Agenda, 'id'>): Promise<Agenda> {
    const list = this.getStorage<Agenda[]>(STORAGE_KEYS.AGENDA, mockAgenda);
    const id = `agenda-${Date.now()}`;
    const newItem: Agenda = { ...item, id };
    list.push(newItem);
    this.setStorage(STORAGE_KEYS.AGENDA, list);
    return newItem;
  }

  async updateAgenda(id: string, item: Partial<Agenda>): Promise<Agenda | null> {
    const list = this.getStorage<Agenda[]>(STORAGE_KEYS.AGENDA, mockAgenda);
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...item };
    this.setStorage(STORAGE_KEYS.AGENDA, list);
    return list[idx];
  }

  async deleteAgenda(id: string): Promise<boolean> {
    let list = this.getStorage<Agenda[]>(STORAGE_KEYS.AGENDA, mockAgenda);
    const initialLen = list.length;
    list = list.filter((a) => a.id !== id);
    this.setStorage(STORAGE_KEYS.AGENDA, list);
    return list.length < initialLen;
  }

  async listPublications(opts?: ListOptions): Promise<Publication[]> {
    let result = this.getStorage<Publication[]>(STORAGE_KEYS.PUBLICATIONS, mockPublications);
    if (opts?.category) {
      result = result.filter((p) => p.category.toLowerCase() === opts.category?.toLowerCase());
    }
    if (opts?.query) {
      const q = opts.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (opts?.limit !== undefined) result = result.slice(0, opts.limit);
    return result;
  }

  async getPublicationBySlug(slug: string): Promise<Publication | null> {
    const list = this.getStorage<Publication[]>(STORAGE_KEYS.PUBLICATIONS, mockPublications);
    return list.find((p) => p.slug === slug) || null;
  }

  async createPublication(item: Omit<Publication, 'id' | 'slug'>): Promise<Publication> {
    const list = this.getStorage<Publication[]>(STORAGE_KEYS.PUBLICATIONS, mockPublications);
    const id = `pub-${Date.now()}`;
    const slug = `${generateSlug(item.title)}-${Date.now().toString().slice(-4)}`;
    const newItem: Publication = { ...item, id, slug, status: item.status || 'published' };
    list.unshift(newItem);
    this.setStorage(STORAGE_KEYS.PUBLICATIONS, list);
    return newItem;
  }

  async updatePublication(id: string, item: Partial<Publication>): Promise<Publication | null> {
    const list = this.getStorage<Publication[]>(STORAGE_KEYS.PUBLICATIONS, mockPublications);
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...item };
    if (item.title && item.title !== list[idx].title) {
      updated.slug = `${generateSlug(item.title)}-${id.slice(-4)}`;
    }
    list[idx] = updated;
    this.setStorage(STORAGE_KEYS.PUBLICATIONS, list);
    return updated;
  }

  async deletePublication(id: string): Promise<boolean> {
    let list = this.getStorage<Publication[]>(STORAGE_KEYS.PUBLICATIONS, mockPublications);
    const initialLen = list.length;
    list = list.filter((p) => p.id !== id);
    this.setStorage(STORAGE_KEYS.PUBLICATIONS, list);
    return list.length < initialLen;
  }

  async listPhotos(opts?: ListOptions): Promise<Photo[]> {
    let result = this.getStorage<Photo[]>(STORAGE_KEYS.PHOTOS, mockPhotos);
    if (opts?.category) {
      result = result.filter((p) => p.category.toLowerCase() === opts.category?.toLowerCase());
    }
    if (opts?.limit !== undefined) result = result.slice(0, opts.limit);
    return result;
  }

  async createPhoto(item: Omit<Photo, 'id'>): Promise<Photo> {
    const list = this.getStorage<Photo[]>(STORAGE_KEYS.PHOTOS, mockPhotos);
    const id = `photo-${Date.now()}`;
    const newItem: Photo = { ...item, id };
    list.unshift(newItem);
    this.setStorage(STORAGE_KEYS.PHOTOS, list);
    return newItem;
  }

  async deletePhoto(id: string): Promise<boolean> {
    let list = this.getStorage<Photo[]>(STORAGE_KEYS.PHOTOS, mockPhotos);
    const initialLen = list.length;
    list = list.filter((p) => p.id !== id);
    this.setStorage(STORAGE_KEYS.PHOTOS, list);
    return list.length < initialLen;
  }

  async listVideos(opts?: ListOptions): Promise<Video[]> {
    let result = this.getStorage<Video[]>(STORAGE_KEYS.VIDEOS, mockVideos);
    if (opts?.category) {
      result = result.filter((v) => v.category.toLowerCase() === opts.category?.toLowerCase());
    }
    if (opts?.limit !== undefined) result = result.slice(0, opts.limit);
    return result;
  }

  async createVideo(item: Omit<Video, 'id'>): Promise<Video> {
    const list = this.getStorage<Video[]>(STORAGE_KEYS.VIDEOS, mockVideos);
    const id = `video-${Date.now()}`;
    const newItem: Video = { ...item, id };
    list.unshift(newItem);
    this.setStorage(STORAGE_KEYS.VIDEOS, list);
    return newItem;
  }

  async deleteVideo(id: string): Promise<boolean> {
    let list = this.getStorage<Video[]>(STORAGE_KEYS.VIDEOS, mockVideos);
    const initialLen = list.length;
    list = list.filter((v) => v.id !== id);
    this.setStorage(STORAGE_KEYS.VIDEOS, list);
    return list.length < initialLen;
  }

  async getProfile(): Promise<ProfileContact> {
    const profile = this.getStorage<ProfileContact>(STORAGE_KEYS.PROFILE, mockProfile);
    const settings = await this.getSiteSettings();
    return { ...profile, siteSettings: settings };
  }

  async updateProfile(profile: Partial<ProfileContact>): Promise<ProfileContact> {
    const current = await this.getProfile();
    const updated: ProfileContact = {
      ...current,
      ...profile,
      siteSettings: profile.siteSettings || current.siteSettings || defaultSiteSettings,
    };
    this.setStorage(STORAGE_KEYS.PROFILE, updated);
    if (profile.siteSettings) {
      this.setStorage(STORAGE_KEYS.SITE_SETTINGS, profile.siteSettings);
    }
    return updated;
  }

  async getSiteSettings(): Promise<SiteSettings> {
    return this.getStorage<SiteSettings>(STORAGE_KEYS.SITE_SETTINGS, defaultSiteSettings);
  }

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSiteSettings();
    const updated: SiteSettings = {
      header: { ...current.header, ...(settings.header || {}) },
      navbar: { ...current.navbar, ...(settings.navbar || {}) },
      hero: { ...current.hero, ...(settings.hero || {}) },
      welcome: { ...current.welcome, ...(settings.welcome || {}) },
      sidebar: { ...current.sidebar, ...(settings.sidebar || {}) },
      agendaPubSection: { ...current.agendaPubSection, ...(settings.agendaPubSection || {}) },
      gallerySection: { ...current.gallerySection, ...(settings.gallerySection || {}) },
      videoSection: { ...current.videoSection, ...(settings.videoSection || {}) },
      footer: { ...current.footer, ...(settings.footer || {}) },
    };
    this.setStorage(STORAGE_KEYS.SITE_SETTINGS, updated);
    return updated;
  }

  async resetToSampleData(): Promise<void> {
    this.setStorage(STORAGE_KEYS.NEWS, mockNews);
    this.setStorage(STORAGE_KEYS.AGENDA, mockAgenda);
    this.setStorage(STORAGE_KEYS.PUBLICATIONS, mockPublications);
    this.setStorage(STORAGE_KEYS.PHOTOS, mockPhotos);
    this.setStorage(STORAGE_KEYS.VIDEOS, mockVideos);
    this.setStorage(STORAGE_KEYS.PROFILE, mockProfile);
    this.setStorage(STORAGE_KEYS.SITE_SETTINGS, defaultSiteSettings);
  }
}

// --------------------------------------------------------------------------
// 2. IMPLEMENTASI SUPABASE (Cloud Database Multi-Perangkat Terpusat)
// --------------------------------------------------------------------------
export class SupabaseContentRepository implements ContentRepository {
  private fallback = new LocalStorageContentRepository();

  async listNews(opts?: ListOptions): Promise<News[]> {
    if (!supabase) return this.fallback.listNews(opts);
    try {
      let query = supabase.from('news').select('*').order('published_at', { ascending: false });
      if (opts?.category) query = query.eq('category', opts.category);
      if (opts?.limit) query = query.limit(opts.limit);

      const { data, error } = await query;
      if (error || !data) return this.fallback.listNews(opts);

      return data.map((d) => ({
        id: d.id,
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt,
        content: d.content,
        category: d.category,
        coverImage: d.cover_image,
        publishedAt: d.published_at,
        author: d.author,
        status: d.status,
      }));
    } catch {
      return this.fallback.listNews(opts);
    }
  }

  async getNewsBySlug(slug: string): Promise<News | null> {
    if (!supabase) return this.fallback.getNewsBySlug(slug);
    try {
      const { data, error } = await supabase.from('news').select('*').eq('slug', slug).single();
      if (error || !data) return this.fallback.getNewsBySlug(slug);

      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        coverImage: data.cover_image,
        publishedAt: data.published_at,
        author: data.author,
        status: data.status,
      };
    } catch {
      return this.fallback.getNewsBySlug(slug);
    }
  }

  async createNews(item: Omit<News, 'id' | 'slug'>): Promise<News> {
    if (!supabase) return this.fallback.createNews(item);
    try {
      const slug = `${generateSlug(item.title)}-${Date.now().toString().slice(-4)}`;
      const { data, error } = await supabase
        .from('news')
        .insert([
          {
            title: item.title,
            slug,
            excerpt: item.excerpt,
            content: item.content,
            category: item.category,
            cover_image: item.coverImage,
            author: item.author,
            published_at: item.publishedAt,
            status: item.status || 'published',
          },
        ])
        .select()
        .single();

      if (error || !data) return this.fallback.createNews(item);

      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        coverImage: data.cover_image,
        publishedAt: data.published_at,
        author: data.author,
        status: data.status,
      };
    } catch {
      return this.fallback.createNews(item);
    }
  }

  async updateNews(id: string, item: Partial<News>): Promise<News | null> {
    if (!supabase) return this.fallback.updateNews(id, item);
    try {
      const updatePayload: Record<string, unknown> = {};
      if (item.title !== undefined) updatePayload.title = item.title;
      if (item.excerpt !== undefined) updatePayload.excerpt = item.excerpt;
      if (item.content !== undefined) updatePayload.content = item.content;
      if (item.category !== undefined) updatePayload.category = item.category;
      if (item.coverImage !== undefined) updatePayload.cover_image = item.coverImage;
      if (item.author !== undefined) updatePayload.author = item.author;

      const { data, error } = await supabase
        .from('news')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();

      if (error || !data) return this.fallback.updateNews(id, item);

      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        coverImage: data.cover_image,
        publishedAt: data.published_at,
        author: data.author,
        status: data.status,
      };
    } catch {
      return this.fallback.updateNews(id, item);
    }
  }

  async deleteNews(id: string): Promise<boolean> {
    if (!supabase) return this.fallback.deleteNews(id);
    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
      return !error;
    } catch {
      return this.fallback.deleteNews(id);
    }
  }

  async listAgenda(opts?: ListOptions & { upcomingOnly?: boolean }): Promise<Agenda[]> {
    if (!supabase) return this.fallback.listAgenda(opts);
    try {
      let query = supabase.from('agenda').select('*').order('event_date', { ascending: true });
      if (opts?.upcomingOnly) query = query.eq('status', 'akan-datang');
      if (opts?.limit) query = query.limit(opts.limit);

      const { data, error } = await query;
      if (error || !data) return this.fallback.listAgenda(opts);

      return data.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        eventDate: d.event_date,
        startTime: d.start_time,
        endTime: d.end_time,
        location: d.location,
        status: d.status,
      }));
    } catch {
      return this.fallback.listAgenda(opts);
    }
  }

  async getAgendaById(id: string): Promise<Agenda | null> {
    return this.fallback.getAgendaById(id);
  }

  async createAgenda(item: Omit<Agenda, 'id'>): Promise<Agenda> {
    if (!supabase) return this.fallback.createAgenda(item);
    try {
      const { data, error } = await supabase
        .from('agenda')
        .insert([
          {
            title: item.title,
            description: item.description,
            event_date: item.eventDate,
            start_time: item.startTime,
            end_time: item.endTime,
            location: item.location,
            status: item.status,
          },
        ])
        .select()
        .single();

      if (error || !data) return this.fallback.createAgenda(item);

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        eventDate: data.event_date,
        startTime: data.start_time,
        endTime: data.end_time,
        location: data.location,
        status: data.status,
      };
    } catch {
      return this.fallback.createAgenda(item);
    }
  }

  async updateAgenda(id: string, item: Partial<Agenda>): Promise<Agenda | null> {
    if (!supabase) return this.fallback.updateAgenda(id, item);
    try {
      const { data, error } = await supabase
        .from('agenda')
        .update({
          title: item.title,
          description: item.description,
          event_date: item.eventDate,
          start_time: item.startTime,
          end_time: item.endTime,
          location: item.location,
          status: item.status,
        })
        .eq('id', id)
        .select()
        .single();

      if (error || !data) return this.fallback.updateAgenda(id, item);
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        eventDate: data.event_date,
        startTime: data.start_time,
        endTime: data.end_time,
        location: data.location,
        status: data.status,
      };
    } catch {
      return this.fallback.updateAgenda(id, item);
    }
  }

  async deleteAgenda(id: string): Promise<boolean> {
    if (!supabase) return this.fallback.deleteAgenda(id);
    try {
      const { error } = await supabase.from('agenda').delete().eq('id', id);
      return !error;
    } catch {
      return this.fallback.deleteAgenda(id);
    }
  }

  async listPublications(opts?: ListOptions): Promise<Publication[]> {
    if (!supabase) return this.fallback.listPublications(opts);
    try {
      let query = supabase.from('publications').select('*').order('published_at', { ascending: false });
      if (opts?.category) query = query.eq('category', opts.category);
      if (opts?.limit) query = query.limit(opts.limit);

      const { data, error } = await query;
      if (error || !data) return this.fallback.listPublications(opts);

      return data.map((d) => ({
        id: d.id,
        title: d.title,
        slug: d.slug,
        description: d.description,
        documentUrl: d.document_url,
        fileSize: d.file_size,
        fileType: d.file_type,
        category: d.category,
        publishedAt: d.published_at,
        status: d.status,
      }));
    } catch {
      return this.fallback.listPublications(opts);
    }
  }

  async getPublicationBySlug(slug: string): Promise<Publication | null> {
    return this.fallback.getPublicationBySlug(slug);
  }

  async createPublication(item: Omit<Publication, 'id' | 'slug'>): Promise<Publication> {
    if (!supabase) return this.fallback.createPublication(item);
    try {
      const slug = `${generateSlug(item.title)}-${Date.now().toString().slice(-4)}`;
      const { data, error } = await supabase
        .from('publications')
        .insert([
          {
            title: item.title,
            slug,
            description: item.description,
            document_url: item.documentUrl,
            file_size: item.fileSize,
            file_type: item.fileType,
            category: item.category,
            published_at: item.publishedAt,
            status: item.status || 'published',
          },
        ])
        .select()
        .single();

      if (error || !data) return this.fallback.createPublication(item);

      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        documentUrl: data.document_url,
        fileSize: data.file_size,
        fileType: data.file_type,
        category: data.category,
        publishedAt: data.published_at,
        status: data.status,
      };
    } catch {
      return this.fallback.createPublication(item);
    }
  }

  async updatePublication(id: string, item: Partial<Publication>): Promise<Publication | null> {
    if (!supabase) return this.fallback.updatePublication(id, item);
    try {
      const { data, error } = await supabase
        .from('publications')
        .update({
          title: item.title,
          description: item.description,
          document_url: item.documentUrl,
          file_size: item.fileSize,
          file_type: item.fileType,
          category: item.category,
        })
        .eq('id', id)
        .select()
        .single();

      if (error || !data) return this.fallback.updatePublication(id, item);
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        documentUrl: data.document_url,
        fileSize: data.file_size,
        fileType: data.file_type,
        category: data.category,
        publishedAt: data.published_at,
        status: data.status,
      };
    } catch {
      return this.fallback.updatePublication(id, item);
    }
  }

  async deletePublication(id: string): Promise<boolean> {
    if (!supabase) return this.fallback.deletePublication(id);
    try {
      const { error } = await supabase.from('publications').delete().eq('id', id);
      return !error;
    } catch {
      return this.fallback.deletePublication(id);
    }
  }

  async listPhotos(opts?: ListOptions): Promise<Photo[]> {
    if (!supabase) return this.fallback.listPhotos(opts);
    try {
      let query = supabase.from('photos').select('*').order('taken_at', { ascending: false });
      if (opts?.category) query = query.eq('category', opts.category);
      if (opts?.limit) query = query.limit(opts.limit);

      const { data, error } = await query;
      if (error || !data) return this.fallback.listPhotos(opts);

      return data.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        imageUrl: d.image_url,
        takenAt: d.taken_at,
        category: d.category,
        altText: d.alt_text,
      }));
    } catch {
      return this.fallback.listPhotos(opts);
    }
  }

  async createPhoto(item: Omit<Photo, 'id'>): Promise<Photo> {
    if (!supabase) return this.fallback.createPhoto(item);
    try {
      const { data, error } = await supabase
        .from('photos')
        .insert([
          {
            title: item.title,
            description: item.description,
            image_url: item.imageUrl,
            taken_at: item.takenAt,
            category: item.category,
            alt_text: item.altText,
          },
        ])
        .select()
        .single();

      if (error || !data) return this.fallback.createPhoto(item);

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url,
        takenAt: data.taken_at,
        category: data.category,
        altText: data.alt_text,
      };
    } catch {
      return this.fallback.createPhoto(item);
    }
  }

  async deletePhoto(id: string): Promise<boolean> {
    if (!supabase) return this.fallback.deletePhoto(id);
    try {
      const { error } = await supabase.from('photos').delete().eq('id', id);
      return !error;
    } catch {
      return this.fallback.deletePhoto(id);
    }
  }

  async listVideos(opts?: ListOptions): Promise<Video[]> {
    if (!supabase) return this.fallback.listVideos(opts);
    try {
      const { data, error } = await supabase.from('videos').select('*');
      if (error || !data) return this.fallback.listVideos(opts);

      return data.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        thumbnailUrl: d.thumbnail_url,
        videoUrl: d.video_url,
        duration: d.duration,
        category: d.category,
        publishedAt: d.published_at,
      }));
    } catch {
      return this.fallback.listVideos(opts);
    }
  }

  async createVideo(item: Omit<Video, 'id'>): Promise<Video> {
    if (!supabase) return this.fallback.createVideo(item);
    try {
      const { data, error } = await supabase
        .from('videos')
        .insert([
          {
            title: item.title,
            description: item.description,
            thumbnail_url: item.thumbnailUrl,
            video_url: item.videoUrl,
            duration: item.duration,
            category: item.category,
            published_at: item.publishedAt,
          },
        ])
        .select()
        .single();

      if (error || !data) return this.fallback.createVideo(item);

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnail_url,
        videoUrl: data.video_url,
        duration: data.duration,
        category: data.category,
        publishedAt: data.published_at,
      };
    } catch {
      return this.fallback.createVideo(item);
    }
  }

  async deleteVideo(id: string): Promise<boolean> {
    if (!supabase) return this.fallback.deleteVideo(id);
    try {
      const { error } = await supabase.from('videos').delete().eq('id', id);
      return !error;
    } catch {
      return this.fallback.deleteVideo(id);
    }
  }

  async getProfile(): Promise<ProfileContact> {
    if (!supabase) return this.fallback.getProfile();
    try {
      const { data, error } = await supabase.from('site_profile').select('*').eq('id', 1).single();
      if (error || !data) return this.fallback.getProfile();

      let socialLinks = [];
      let siteSettings = defaultSiteSettings;

      if (Array.isArray(data.social_links)) {
        socialLinks = data.social_links;
      } else if (data.social_links && typeof data.social_links === 'object') {
        socialLinks = Array.isArray(data.social_links.links) ? data.social_links.links : [];
        if (data.social_links.siteSettings) {
          siteSettings = {
            header: { ...defaultSiteSettings.header, ...(data.social_links.siteSettings.header || {}) },
            navbar: { ...defaultSiteSettings.navbar, ...(data.social_links.siteSettings.navbar || {}) },
            hero: { ...defaultSiteSettings.hero, ...(data.social_links.siteSettings.hero || {}) },
            welcome: { ...defaultSiteSettings.welcome, ...(data.social_links.siteSettings.welcome || {}) },
            sidebar: { ...defaultSiteSettings.sidebar, ...(data.social_links.siteSettings.sidebar || {}) },
            agendaPubSection: { ...defaultSiteSettings.agendaPubSection, ...(data.social_links.siteSettings.agendaPubSection || {}) },
            gallerySection: { ...defaultSiteSettings.gallerySection, ...(data.social_links.siteSettings.gallerySection || {}) },
            videoSection: { ...defaultSiteSettings.videoSection, ...(data.social_links.siteSettings.videoSection || {}) },
            footer: { ...defaultSiteSettings.footer, ...(data.social_links.siteSettings.footer || {}) },
          };
        }
      }

      const resProfile: ProfileContact = {
        institutionName: data.institution_name,
        motto: data.motto,
        description: data.description,
        logoUrl: data.logo_url || '',
        address: data.address,
        phone: data.phone,
        email: data.email,
        officeHours: data.office_hours,
        socialLinks,
        siteSettings,
        verified: data.verified,
      };

      // Simpan ke local cache untuk fallback offline
      this.fallback.updateProfile(resProfile);
      return resProfile;
    } catch {
      return this.fallback.getProfile();
    }
  }

  async updateProfile(profile: Partial<ProfileContact>): Promise<ProfileContact> {
    if (!supabase) return this.fallback.updateProfile(profile);
    try {
      const current = await this.getProfile();
      const updatedProfile: ProfileContact = {
        institutionName: profile.institutionName ?? current.institutionName,
        motto: profile.motto ?? current.motto,
        description: profile.description ?? current.description,
        logoUrl: profile.logoUrl !== undefined ? profile.logoUrl : current.logoUrl,
        address: profile.address ?? current.address,
        phone: profile.phone ?? current.phone,
        email: profile.email ?? current.email,
        officeHours: profile.officeHours ?? current.officeHours,
        socialLinks: profile.socialLinks ?? current.socialLinks,
        siteSettings: profile.siteSettings ?? current.siteSettings ?? defaultSiteSettings,
        verified: profile.verified ?? current.verified,
      };

      const payload = {
        id: 1,
        institution_name: updatedProfile.institutionName,
        motto: updatedProfile.motto,
        description: updatedProfile.description,
        logo_url: updatedProfile.logoUrl,
        address: updatedProfile.address,
        phone: updatedProfile.phone,
        email: updatedProfile.email,
        office_hours: updatedProfile.officeHours,
        social_links: {
          links: updatedProfile.socialLinks,
          siteSettings: updatedProfile.siteSettings,
        },
        verified: updatedProfile.verified,
      };

      const { data, error } = await supabase
        .from('site_profile')
        .upsert(payload)
        .select()
        .single();

      if (error || !data) return this.fallback.updateProfile(profile);

      // Simpan ke local cache
      this.fallback.updateProfile(updatedProfile);
      return updatedProfile;
    } catch {
      return this.fallback.updateProfile(profile);
    }
  }

  async getSiteSettings(): Promise<SiteSettings> {
    const profile = await this.getProfile();
    return profile.siteSettings || defaultSiteSettings;
  }

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSiteSettings();
    const updatedSettings: SiteSettings = {
      header: { ...current.header, ...(settings.header || {}) },
      navbar: { ...current.navbar, ...(settings.navbar || {}) },
      hero: { ...current.hero, ...(settings.hero || {}) },
      welcome: { ...current.welcome, ...(settings.welcome || {}) },
      sidebar: { ...current.sidebar, ...(settings.sidebar || {}) },
      agendaPubSection: { ...current.agendaPubSection, ...(settings.agendaPubSection || {}) },
      gallerySection: { ...current.gallerySection, ...(settings.gallerySection || {}) },
      videoSection: { ...current.videoSection, ...(settings.videoSection || {}) },
      footer: { ...current.footer, ...(settings.footer || {}) },
    };

    await this.updateProfile({ siteSettings: updatedSettings });
    return updatedSettings;
  }

  async resetToSampleData(): Promise<void> {
    return this.fallback.resetToSampleData();
  }
}

// Instance default: gunakan Supabase jika terhubung, fallback ke LocalStorage
export const contentRepository: ContentRepository = new SupabaseContentRepository();
