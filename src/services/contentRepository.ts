// src/services/contentRepository.ts
// Implementasi Lapisan Abstraksi Data (SCHEMA.md Bagian 3)
// Komponen hanya membaca data melalui instance repository ini.

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

export class StaticContentRepository implements ContentRepository {
  async listNews(opts?: ListOptions): Promise<News[]> {
    let result = [...mockNews];

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

    // Urutkan berdasarkan tanggal publikasi terbaru
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
    const item = mockNews.find((n) => n.slug === slug);
    return item || null;
  }

  async listAgenda(
    opts?: ListOptions & { upcomingOnly?: boolean }
  ): Promise<Agenda[]> {
    let result = [...mockAgenda];

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

    // Urutan default: eventDate menaik
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
    const item = mockAgenda.find((a) => a.id === id);
    return item || null;
  }

  async listPublications(opts?: ListOptions): Promise<Publication[]> {
    let result = [...mockPublications];

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
    const item = mockPublications.find((p) => p.slug === slug);
    return item || null;
  }

  async listPhotos(opts?: ListOptions): Promise<Photo[]> {
    let result = [...mockPhotos];

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

  async listVideos(opts?: ListOptions): Promise<Video[]> {
    let result = [...mockVideos];

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

  async getProfile(): Promise<ProfileContact> {
    return { ...mockProfile };
  }
}

// Singleton repository default untuk aplikasi
export const contentRepository: ContentRepository = new StaticContentRepository();
