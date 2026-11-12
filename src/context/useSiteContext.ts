// src/context/useSiteContext.ts
import { useContext } from 'react';
import { SiteContext, SiteContextType } from './site-context';
import { defaultSiteSettings } from '../data/defaultSiteSettings';
import { mockProfile } from '../data/mockData';

export const useSiteContext = (): SiteContextType => {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    return {
      profile: mockProfile,
      siteSettings: defaultSiteSettings,
      loading: false,
      updateProfile: async (p) => ({ ...mockProfile, ...p }),
      updateSiteSettings: async (s) => ({ ...defaultSiteSettings, ...s }),
      refreshSiteData: async () => {},
    };
  }
  return ctx;
};
