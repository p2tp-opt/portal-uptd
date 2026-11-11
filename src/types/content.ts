// src/types/content.ts
// Mengikuti SCHEMA.md dan PRD Bagian 12

export type ISODate = string;      // Contoh: "2026-11-11"
export type ISODateTime = string;  // Contoh: "2026-11-11T09:48:00+08:00"

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;          // Teks markdown atau paragraf bersih, bukan HTML mentah
  category: string;
  coverImage?: string;
  publishedAt: ISODateTime;
  author: string;
  status?: ContentStatus;
  isSample?: boolean;       // Penanda data contoh/mock
}

export type AgendaStatus = 'akan-datang' | 'berlangsung' | 'selesai' | 'dibatalkan';

export interface Agenda {
  id: string;
  title: string;
  description: string;
  eventDate: ISODate;
  startTime?: string;       // Contoh: "09:00"
  endTime?: string;         // Contoh: "12:00"
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
  fileSize?: string;
  fileType?: string;
  status?: ContentStatus;
  isSample?: boolean;
}

export interface Photo {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  takenAt?: ISODate;
  category: string;
  altText: string;          // Wajib untuk aksesibilitas (WCAG AA)
  isSample?: boolean;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;         // YouTube URL aman (youtube-nocookie.com)
  publishedAt: ISODateTime;
  category: string;
  duration?: string;
  isSample?: boolean;
}

export interface SocialLink {
  platform: 'youtube' | 'instagram' | 'facebook' | 'x' | 'tiktok' | 'whatsapp' | 'lainnya';
  url: string;
  label: string;
}

export interface ProfileContact {
  institutionName: string;
  motto: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
  officeHours?: string;
  socialLinks: SocialLink[];
  verified: boolean;        // false selama masih data placeholder
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  category?: string;
  query?: string;
}
