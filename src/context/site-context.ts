// src/context/site-context.ts
import { createContext } from 'react';
import { ProfileContact, SiteSettings, ServiceItem, ProfileDetail } from '../types/content';

export interface SiteContextType {
  profile: ProfileContact;
  siteSettings: SiteSettings;
  services: ServiceItem[];
  profileDetail: ProfileDetail;
  loading: boolean;
  updateProfile: (profile: Partial<ProfileContact>) => Promise<ProfileContact>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<SiteSettings>;
  updateServices: (services: ServiceItem[]) => Promise<ServiceItem[]>;
  updateProfileDetail: (detail: Partial<ProfileDetail>) => Promise<ProfileDetail>;
  refreshSiteData: () => Promise<void>;
}

export const SiteContext = createContext<SiteContextType | undefined>(undefined);
