// src/context/site-context.ts
import { createContext } from 'react';
import { ProfileContact, SiteSettings } from '../types/content';

export interface SiteContextType {
  profile: ProfileContact;
  siteSettings: SiteSettings;
  loading: boolean;
  updateProfile: (profile: Partial<ProfileContact>) => Promise<ProfileContact>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<SiteSettings>;
  refreshSiteData: () => Promise<void>;
}

export const SiteContext = createContext<SiteContextType | undefined>(undefined);
