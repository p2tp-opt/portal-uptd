// src/services/contentRepository.ts
// Lapisan Abstraksi Data dengan Dukungan CRUD untuk Admin Panel & CMS
// Menggunakan localStorage untuk persistensi sesi operator lokal yang mulus

import {
  News,
  Agenda,
  Publication,
  Photo,
  Video,
  ProfileContact,
  ListOptions,
} from '../types/content';
import {
  mockNews,
  mockAgenda,
  mockPublications,
  mockPhotos,
  mockVideos,
  mockProfile,
} from '../data/mockData';

export interface ContentRepository {
  // Pembacaan Publik
  listNews(opts?: ListOptions): Promise<News[]>;
  getNewsBySlug(slug: string): Promise<News | null>;
  listAgenda(opts?: ListOptions & { upcomingOnly?: boolean }): Promise<Agenda[]>;
  getAgendaById(id: string): Promise<Agenda | null>;
  listPublications(opts?: ListOptions): Promise<Publication[]>;
  getPublicationBySlug(slug: string): Promise<Publication | null>;
  listPhotos(opts?: ListOptions): Promise<Photo[]>;
  listVideos(opts?: ListOptions): Promise<Video[]>;
  getProfile(): Promise<ProfileContact>;

  // Pengelolaan Operator / Admin CMS (CRUD)
  createNews(item: Omit<News, 'id' | 'slug'>): Promise<News>;
  updateNews(id: string, item: Partial<News>): Promise<News | null>;
  deleteNews(id: string): Promise<boolean>;

  createAgenda(item: Omit<Agenda, 'id'>): Promise<Agenda>;
  updateAgenda(id: string, item: Partial<Agenda>): Promise<Agenda | null>;
  deleteAgenda(id: string): Promise<boolean>;

  createPublication(item: Omit<Publication, 'id' | 'slug'>): Promise<Publication>;
  updatePublication(id: string, item: Partial<Publication>): Promise<Publication | null>;
  deletePublication(id: string): Promise<boolean>;

  createPhoto(item: Omit<Photo, 'id'>): Promise<Photo>;
  deletePhoto(id: string): Promise<boolean>;

  createVideo(item: Omit<Video, 'id'>): Promise<Video>;
  deleteVideo(id: string): Promise<boolean>;

  updateProfile(profile: Partial<ProfileContact>): Promise<ProfileContact>;
  resetToSampleData(): Promise<void>;
}

const STORAGE_KEYS = {
  NEWS: 'p2tp_cms_news',
  AGENDA: 'p2tp_cms_agenda',
  PUBLICATIONS: 'p2tp_cms_publications',
  PHOTOS: 'p2tp_cms_photos',
  VIDEOS: 'p2tp_cms_videos',
  PROFILE: 'p2tp_cms_profile',
};

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export class LocalStorageContentRepository implements ContentRepository {
  private getStorage<T>(key: string, defaultData: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback bila SSR atau localStorage error
    }
    return defaultData;
  }

  private setStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore storage limit errors
    }
  }

  async listNews(opts?: ListOptions): Promise<News[]> {
    let result = this.getStorage<News[]>(STORAGE_KEYS.NEWS, mockNews);

    if (opts?.category) {
      result = result.filter(
        (n) => n.category.toLowerCase() === opts.category?.toLowerCase()
      );
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

    result.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    if (opts?.offset !== undefined) {
      result = result.slice(opts.offset);
    }
    if (opts?.limit !== undefined) {
      result = result.slice(0, opts.limit);
    }

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
    const newItem: News = {
      ...item,
      id,
      slug,
      status: item.status || 'published',
    };
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

  async listAgenda(
    opts?: ListOptions & { upcomingOnly?: boolean }
  ): Promise<Agenda[]> {
    let result = this.getStorage<Agenda[]>(STORAGE_KEYS.AGENDA, mockAgenda);

    if (opts?.upcomingOnly) {
      result = result.filter((a) => a.status === 'akan-datang');
    }

    if (opts?.query) {
      const q = opts.query.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          (a.location && a.location.toLowerCase().includes(q))
      );
    }

    result.sort(
      (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );

    if (opts?.offset !== undefined) {
      result = result.slice(opts.offset);
    }
    if (opts?.limit !== undefined) {
      result = result.slice(0, opts.limit);
    }

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
      result = result.filter(
        (p) => p.category.toLowerCase() === opts.category?.toLowerCase()
      );
    }

    if (opts?.query) {
      const q = opts.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    result.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    if (opts?.offset !== undefined) {
      result = result.slice(opts.offset);
    }
    if (opts?.limit !== undefined) {
      result = result.slice(0, opts.limit);
    }

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
    const newItem: Publication = { ...item, id, slug };
    list.unshift(newItem);
    this.setStorage(STORAGE_KEYS.PUBLICATIONS, list);
    return newItem;
  }

  async updatePublication(id: string, item: Partial<Publication>): Promise<Publication | null> {
    const list = this.getStorage<Publication[]>(STORAGE_KEYS.PUBLICATIONS, mockPublications);
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...item };
    this.setStorage(STORAGE_KEYS.PUBLICATIONS, list);
    return list[idx];
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
      result = result.filter(
        (p) => p.category.toLowerCase() === opts.category?.toLowerCase()
      );
    }

    if (opts?.offset !== undefined) {
      result = result.slice(opts.offset);
    }
    if (opts?.limit !== undefined) {
      result = result.slice(0, opts.limit);
    }

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
      result = result.filter(
        (v) => v.category.toLowerCase() === opts.category?.toLowerCase()
      );
    }

    result.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    if (opts?.offset !== undefined) {
      result = result.slice(opts.offset);
    }
    if (opts?.limit !== undefined) {
      result = result.slice(0, opts.limit);
    }

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
    return this.getStorage<ProfileContact>(STORAGE_KEYS.PROFILE, mockProfile);
  }

  async updateProfile(profile: Partial<ProfileContact>): Promise<ProfileContact> {
    const current = this.getStorage<ProfileContact>(STORAGE_KEYS.PROFILE, mockProfile);
    const updated = { ...current, ...profile };
    this.setStorage(STORAGE_KEYS.PROFILE, updated);
    return updated;
  }

  async resetToSampleData(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.AGENDA);
    localStorage.removeItem(STORAGE_KEYS.PUBLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.PHOTOS);
    localStorage.removeItem(STORAGE_KEYS.VIDEOS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  }
}

// Instance default yang dapat diakses seluruh aplikasi
export const contentRepository: ContentRepository = new LocalStorageContentRepository();
