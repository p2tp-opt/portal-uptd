// src/context/SiteProvider.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ProfileContact, SiteSettings } from '../types/content';
import { contentRepository } from '../services/contentRepository';
import { SiteContext } from './site-context';

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inisialisasi SINKRON (0ms delay): Langsung memuat desain kustom dari LocalStorage cache
  const [profile, setProfile] = useState<ProfileContact>(() => contentRepository.getProfileSync());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const p = contentRepository.getProfileSync();
    return p.siteSettings || contentRepository.getSiteSettingsSync();
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

  return (
    <SiteContext.Provider
      value={{
        profile,
        siteSettings,
        loading,
        updateProfile,
        updateSiteSettings,
        refreshSiteData,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
