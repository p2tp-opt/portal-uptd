// src/context/SiteProvider.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ProfileContact, SiteSettings, ServiceItem, ProfileDetail } from '../types/content';
import { contentRepository } from '../services/contentRepository';
import { defaultServices } from '../data/defaultServices';
import { defaultProfileDetail } from '../data/defaultProfileDetail';
import { SiteContext } from './site-context';

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inisialisasi SINKRON (0ms delay): Langsung memuat desain kustom dari LocalStorage cache
  const [profile, setProfile] = useState<ProfileContact>(() => contentRepository.getProfileSync());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const p = contentRepository.getProfileSync();
    return p.siteSettings || contentRepository.getSiteSettingsSync();
  });
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const p = contentRepository.getProfileSync();
    return p.services && p.services.length > 0 ? p.services : defaultServices;
  });
  const [profileDetail, setProfileDetail] = useState<ProfileDetail>(() => {
    const p = contentRepository.getProfileSync();
    return p.profileDetail || defaultProfileDetail;
  });
  const [loading, setLoading] = useState(false);

  // Background Revalidation (Stale-While-Revalidate)
  const refreshSiteData = useCallback(async () => {
    try {
      const freshProfile = await contentRepository.getProfile();
      setProfile(freshProfile);
      if (freshProfile.siteSettings) {
        setSiteSettings(freshProfile.siteSettings);
      }
      if (freshProfile.services && freshProfile.services.length > 0) {
        setServices(freshProfile.services);
      }
      if (freshProfile.profileDetail) {
        setProfileDetail(freshProfile.profileDetail);
      }
    } catch (e) {
      console.warn('Gagal sinkronisasi data dari Supabase Cloud di latar belakang:', e);
    }
  }, []);

  useEffect(() => {
    refreshSiteData();
  }, [refreshSiteData]);

  // Listener perubahan LocalStorage (Multi-Tab Sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'p2tp_cms_profile' || e.key === 'p2tp_cms_site_settings') {
        const freshProfile = contentRepository.getProfileSync();
        setProfile(freshProfile);
        if (freshProfile.siteSettings) {
          setSiteSettings(freshProfile.siteSettings);
        }
        if (freshProfile.services) {
          setServices(freshProfile.services);
        }
        if (freshProfile.profileDetail) {
          setProfileDetail(freshProfile.profileDetail);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateProfile = useCallback(async (updates: Partial<ProfileContact>) => {
    setLoading(true);
    try {
      const saved = await contentRepository.updateProfile(updates);
      setProfile(saved);
      if (saved.siteSettings) {
        setSiteSettings(saved.siteSettings);
      }
      if (saved.services) {
        setServices(saved.services);
      }
      if (saved.profileDetail) {
        setProfileDetail(saved.profileDetail);
      }
      return saved;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSiteSettings = useCallback(async (updates: Partial<SiteSettings>) => {
    setLoading(true);
    try {
      const saved = await contentRepository.updateSiteSettings(updates);
      setSiteSettings(saved);
      setProfile((prev) => ({ ...prev, siteSettings: saved }));
      return saved;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateServices = useCallback(async (newServices: ServiceItem[]) => {
    setLoading(true);
    try {
      const saved = await contentRepository.updateServices(newServices);
      setServices(saved);
      setProfile((prev) => ({ ...prev, services: saved }));
      return saved;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfileDetail = useCallback(async (detailUpdates: Partial<ProfileDetail>) => {
    setLoading(true);
    try {
      const saved = await contentRepository.updateProfileDetail(detailUpdates);
      setProfileDetail(saved);
      setProfile((prev) => ({ ...prev, profileDetail: saved }));
      return saved;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SiteContext.Provider
      value={{
        profile,
        siteSettings,
        services,
        profileDetail,
        loading,
        updateProfile,
        updateSiteSettings,
        updateServices,
        updateProfileDetail,
        refreshSiteData,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
