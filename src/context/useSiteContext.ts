// src/context/useSiteContext.ts
import { useContext } from 'react';
import { SiteContext, SiteContextType } from './site-context';
import { defaultSiteSettings } from '../data/defaultSiteSettings';
import { defaultServices } from '../data/defaultServices';
import { defaultProfileDetail } from '../data/defaultProfileDetail';
import { mockProfile } from '../data/mockData';

export const useSiteContext = (): SiteContextType => {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    return {
      profile: mockProfile,
      siteSettings: defaultSiteSettings,
      services: defaultServices,
      profileDetail: defaultProfileDetail,
      loading: false,
      updateProfile: async (p) => ({ ...mockProfile, ...p }),
      updateSiteSettings: async (s) => ({ ...defaultSiteSettings, ...s }),
      updateServices: async (srv) => srv,
      updateProfileDetail: async (det) => ({ ...defaultProfileDetail, ...det }),
      refreshSiteData: async () => {},
    };
  }
  return ctx;
};
