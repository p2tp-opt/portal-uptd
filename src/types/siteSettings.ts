// src/types/siteSettings.ts
// Skema pengaturan dinamis untuk seluruh bagian halaman website yang dapat diubah oleh Operator via CMS

export interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

export interface SiteSettings {
  header: {
    topNotice: string;
    hotlineTag: string;
    tickerText: string;
    tickerLink: string;
  };
  navbar: {
    brandTitle: string;
    brandSubtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  hero: {
    headlinePrefix: string;
    headlineHighlight: string;
    headlineSuffix: string;
    subheadline: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    slides: SlideItem[];
    stats: StatItem[];
  };
  welcome: {
    badge: string;
    title: string;
    leaderName: string;
    leaderTitle: string;
    leaderPhoto: string;
    speechContent: string;
  };
  sidebar: {
    alertTitle: string;
    alertDescription: string;
    alertCommodity: string;
    alertLevel: string;
    alertCtaText: string;
    alertCtaLink: string;
    hotlinePhone: string;
    hotlineHoursWeekday: string;
    hotlineHoursFriday: string;
  };
  agendaPubSection: {
    title: string;
    subtitle: string;
    agendaCtaText: string;
    agendaCtaLink: string;
    pubCtaText: string;
    pubCtaLink: string;
  };
  gallerySection: {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  videoSection: {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  footer: {
    description: string;
    copyrightText: string;
    quickLinksTitle: string;
    channelsTitle: string;
  };
}
