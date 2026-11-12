// src/pages/admin/AdminSettingsPage.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Save,
  CheckCircle,
  Upload,
  Trash2,
  Phone,
  MapPin,
  Mail,
  Clock,
  Image,
  Building,
  Target,
  Users,
  Plus,
  Cloud,
  X,
  FileText,
} from 'lucide-react';
import { ProfileContact, ProfileDetail, OrgMember } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { useSiteContext } from '../../context/useSiteContext';
import { processImageFile } from '../../utils/fileUpload';
import { defaultProfileDetail } from '../../data/defaultProfileDetail';

export const AdminSettingsPage: React.FC = () => {
  const {
    profile: contextProfile,
    profileDetail: contextProfileDetail,
    updateProfile,
    updateProfileDetail,
  } = useSiteContext();

  const [activeTab, setActiveTab] = useState<'identitas' | 'tentang' | 'tupoksi' | 'struktur'>('identitas');
  const [profile, setProfile] = useState<ProfileContact>(contextProfile);
  const [profileDetail, setProfileDetail] = useState<ProfileDetail>(contextProfileDetail || defaultProfileDetail);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const structureImgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    contentRepository.getProfile().then((data) => {
      setProfile(data);
      if (data.profileDetail) {
        setProfileDetail(data.profileDetail);
      }
    });
  }, []);

  // Upload Logo
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profile) {
      try {
        const compressed = await processImageFile(file, 600, 0.9);
        setProfile({ ...profile, logoUrl: compressed });
      } catch (err) {
        alert('Gagal memproses gambar logo: ' + String(err));
      }
    }
  };

  const handleRemoveLogo = () => {
    if (profile) {
      setProfile({ ...profile, logoUrl: '' });
      if (logoInputRef.current) {
        logoInputRef.current.value = '';
      }
    }
  };

  // Upload Foto Bagan Struktur Organisasi
  const handleStructureImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await processImageFile(file, 1600, 0.88);
        setProfileDetail({ ...profileDetail, structureImageUrl: compressed });
      } catch (err) {
        alert('Gagal memproses gambar struktur organisasi: ' + String(err));
      }
    }
  };

  const handleRemoveStructureImage = () => {
    setProfileDetail({ ...profileDetail, structureImageUrl: '' });
    if (structureImgInputRef.current) {
      structureImgInputRef.current.value = '';
    }
  };

  // Handler Tentang & Visi Misi
  const handleAddParagraph = () => {
    setProfileDetail({
      ...profileDetail,
      aboutParagraphs: [...profileDetail.aboutParagraphs, ''],
    });
  };

  const handleUpdateParagraph = (idx: number, val: string) => {
    const updated = [...profileDetail.aboutParagraphs];
    updated[idx] = val;
    setProfileDetail({ ...profileDetail, aboutParagraphs: updated });
  };

  const handleRemoveParagraph = (idx: number) => {
    if (profileDetail.aboutParagraphs.length <= 1) {
      setProfileDetail({ ...profileDetail, aboutParagraphs: [''] });
      return;
    }
    setProfileDetail({
      ...profileDetail,
      aboutParagraphs: profileDetail.aboutParagraphs.filter((_, i) => i !== idx),
    });
  };

  const handleAddMission = () => {
    setProfileDetail({
      ...profileDetail,
      missions: [...(profileDetail.missions || []), ''],
    });
  };

  const handleUpdateMission = (idx: number, val: string) => {
    const updated = [...(profileDetail.missions || [])];
    updated[idx] = val;
    setProfileDetail({ ...profileDetail, missions: updated });
  };

  const handleRemoveMission = (idx: number) => {
    setProfileDetail({
      ...profileDetail,
      missions: (profileDetail.missions || []).filter((_, i) => i !== idx),
    });
  };

  // Handler Tupoksi
  const handleAddDuty = () => {
    setProfileDetail({
      ...profileDetail,
      duties: [...profileDetail.duties, ''],
    });
  };

  const handleUpdateDuty = (idx: number, val: string) => {
    const updated = [...profileDetail.duties];
    updated[idx] = val;
    setProfileDetail({ ...profileDetail, duties: updated });
  };

  const handleRemoveDuty = (idx: number) => {
    if (profileDetail.duties.length <= 1) {
      setProfileDetail({ ...profileDetail, duties: [''] });
      return;
    }
    setProfileDetail({
      ...profileDetail,
      duties: profileDetail.duties.filter((_, i) => i !== idx),
    });
  };

  // Handler Anggota Struktur Organisasi
  const handleAddOrgMember = () => {
    const newMember: OrgMember = {
      id: `mem-${Date.now()}`,
      role: 'Nama Jabatan',
      name: 'Nama Pejabat / Fungsional',
      section: 'Unit Kerja / Seksi',
    };
    setProfileDetail({
      ...profileDetail,
      organizationMembers: [...(profileDetail.organizationMembers || []), newMember],
    });
  };

  const handleUpdateOrgMember = (idx: number, field: keyof OrgMember, val: string) => {
    const updated = [...(profileDetail.organizationMembers || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    setProfileDetail({ ...profileDetail, organizationMembers: updated });
  };

  const handleRemoveOrgMember = (idx: number) => {
    setProfileDetail({
      ...profileDetail,
      organizationMembers: (profileDetail.organizationMembers || []).filter((_, i) => i !== idx),
    });
  };

  // Submit Simpan Seluruh Perubahan Profil
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      // Bersihkan array kosong
      const cleanParagraphs = profileDetail.aboutParagraphs.map((p) => p.trim()).filter(Boolean);
      const cleanMissions = (profileDetail.missions || []).map((m) => m.trim()).filter(Boolean);
      const cleanDuties = profileDetail.duties.map((d) => d.trim()).filter(Boolean);

      const cleanedDetail: ProfileDetail = {
        ...profileDetail,
        aboutParagraphs: cleanParagraphs.length > 0 ? cleanParagraphs : [''],
        missions: cleanMissions,
        duties: cleanDuties.length > 0 ? cleanDuties : [''],
      };

      const updatedProf: ProfileContact = {
        ...profile,
        profileDetail: cleanedDetail,
      };

      await updateProfile(updatedProf);
      await updateProfileDetail(cleanedDetail);
      setProfile(updatedProf);
      setProfileDetail(cleanedDetail);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err) {
      alert('Gagal menyimpan profil ke Supabase: ' + String(err));
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return <div className="p-8 text-center text-xs text-text-muted">Memuat pengaturan profil...</div>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-16">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-badge-activity-bg text-secondary px-2.5 py-1 rounded-md text-[11px] font-heading font-bold mb-1">
            <Cloud className="w-3.5 h-3.5 text-secondary" />
            <span>Supabase Cloud Sync • Multi-Perangkat</span>
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-primary">
            Kelola Profil, Tupoksi & Struktur Organisasi
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Ubah, tambah, atau hapus informasi profil kelembagaan UPTD P2TP agar selalu akurat sesuai kondisi instansi saat ini.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-heading font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}</span>
        </button>
      </div>

      {/* Navigasi Tab Pengaturan Profil */}
      <div className="flex items-center gap-2 border-b border-border-subtle overflow-x-auto pb-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('identitas')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold transition-all whitespace-nowrap ${
            activeTab === 'identitas'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-text-muted hover:bg-surface-container-high'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>1. Identitas, Logo & Kontak</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tentang')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold transition-all whitespace-nowrap ${
            activeTab === 'tentang'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-text-muted hover:bg-surface-container-high'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>2. Tentang & Visi-Misi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tupoksi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold transition-all whitespace-nowrap ${
            activeTab === 'tupoksi'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-text-muted hover:bg-surface-container-high'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>3. Tugas Pokok & Fungsi ({profileDetail.duties.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('struktur')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold transition-all whitespace-nowrap ${
            activeTab === 'struktur'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-text-muted hover:bg-surface-container-high'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>4. Struktur Organisasi ({profileDetail.organizationMembers?.length || 0})</span>
        </button>
      </div>

      {/* Toast Notifikasi Berhasil */}
      {savedSuccess && (
        <div className="bg-primary text-on-primary p-4 rounded-xl shadow-md border border-secondary flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-4 h-4 text-kaltim-gold flex-shrink-0" />
            <span>Perubahan data profil berhasil disimpan dan langsung tayang di halaman publik!</span>
          </div>
          <button
            type="button"
            onClick={() => setSavedSuccess(false)}
            className="text-surface-container-high hover:text-on-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* ========================================================================= */}
        {/* TAB 1: IDENTITAS, LOGO & KONTAK */}
        {/* ========================================================================= */}
        {activeTab === 'identitas' && (
          <div className="flex flex-col gap-6">
            {/* Box Upload Logo Instansi */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-secondary" />
                  <h2 className="text-base font-heading font-bold text-primary">
                    Logo Resmi UPTD / Instansi
                  </h2>
                </div>
                <span className="text-[11px] text-text-muted">Format PNG/JPG transparan</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-surface-container-low border-2 border-dashed border-border-subtle flex items-center justify-center overflow-hidden p-2 flex-shrink-0">
                  {profile.logoUrl ? (
                    <img
                      src={profile.logoUrl}
                      alt="Logo Pratinjau"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-text-muted text-[10px]">
                      Belum Ada Logo
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-xs text-text-muted leading-relaxed">
                    Logo ini akan langsung tampil di bilah Header atas, Footer, dan kartu identitas website.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={handleLogoUpload}
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-secondary text-on-secondary rounded-xl font-heading font-bold text-xs hover:bg-secondary/90 transition-colors shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{profile.logoUrl ? 'Ganti Berkas Logo' : 'Unggah Logo Instansi'}</span>
                    </button>
                    {profile.logoUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-error hover:bg-error-container/20 rounded-xl transition-colors font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Logo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Teks Identitas Lembaga */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4 text-xs">
              <h2 className="text-base font-heading font-bold text-primary border-b border-border-subtle pb-3">
                Informasi & Kontak Resmi
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-heading font-bold text-primary mb-1">
                    Nama Lembaga / Instansi
                  </label>
                  <input
                    type="text"
                    value={profile.institutionName}
                    onChange={(e) => setProfile({ ...profile, institutionName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                  />
                </div>

                <div>
                  <label className="block font-heading font-bold text-primary mb-1">
                    Motto Pelayanan
                  </label>
                  <input
                    type="text"
                    value={profile.motto}
                    onChange={(e) => setProfile({ ...profile, motto: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                  />
                </div>

                <div>
                  <label className="block font-heading font-bold text-primary mb-1">
                    Nomor Telepon Hotline / Posko
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="(0541) 273580"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-heading font-bold text-primary mb-1">
                    Alamat Email Resmi
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                    <input
                      type="email"
                      value={profile.email || ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-heading font-bold text-primary mb-1">
                    Jam Operasional / Pelayanan
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      value={profile.officeHours || ''}
                      onChange={(e) => setProfile({ ...profile, officeHours: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-heading font-bold text-primary mb-1">
                    Alamat Kantor Lengkap
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      value={profile.address || ''}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-heading font-bold text-primary mb-1">
                    Deskripsi Ringkas Instansi (Tampil di Footer)
                  </label>
                  <textarea
                    rows={3}
                    value={profile.description || ''}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: TENTANG & VISI-MISI */}
        {/* ========================================================================= */}
        {activeTab === 'tentang' && (
          <div className="flex flex-col gap-6 text-xs">
            {/* Bagian Paragraf Tentang Lembaga */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div>
                  <h2 className="text-base font-heading font-bold text-primary">
                    Tentang Lembaga (Deskripsi Halaman Profil)
                  </h2>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Teks ini tampil di kolom kiri halaman Profil Instansi. Anda dapat menambah, mengedit, atau menghapus paragraf sesuai kebutuhan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddParagraph}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-on-secondary rounded-lg font-heading font-bold text-xs hover:bg-secondary/90 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Paragraf</span>
                </button>
              </div>

              <div>
                <label className="block font-heading font-bold text-primary mb-1">
                  Judul Bagian Tentang
                </label>
                <input
                  type="text"
                  value={profileDetail.aboutTitle}
                  onChange={(e) => setProfileDetail({ ...profileDetail, aboutTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="block font-heading font-bold text-primary">
                  Daftar Paragraf Penjelasan ({profileDetail.aboutParagraphs.length})
                </label>
                {profileDetail.aboutParagraphs.map((par, pIdx) => (
                  <div key={pIdx} className="flex gap-2 items-start bg-surface-container-low p-3 rounded-xl border border-border-subtle">
                    <span className="w-6 font-bold text-text-muted mt-2 text-center text-xs">
                      #{pIdx + 1}
                    </span>
                    <textarea
                      rows={3}
                      value={par}
                      onChange={(e) => handleUpdateParagraph(pIdx, e.target.value)}
                      placeholder={`Isi paragraf ke-${pIdx + 1}...`}
                      className="flex-1 px-3 py-2 rounded-lg border border-outline/30 bg-surface-container-lowest text-xs leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(pIdx)}
                      title="Hapus paragraf ini"
                      className="p-2 text-text-muted hover:text-error transition-colors rounded-lg mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bagian Visi & Misi */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4">
              <div className="border-b border-border-subtle pb-3">
                <h2 className="text-base font-heading font-bold text-primary">
                  Visi & Misi UPTD P2TP
                </h2>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Arah kebijakan strategis dan target utama institusi
                </p>
              </div>

              <div>
                <label className="block font-heading font-bold text-primary mb-1">
                  Visi Institusi
                </label>
                <textarea
                  rows={2}
                  value={profileDetail.vision || ''}
                  onChange={(e) => setProfileDetail({ ...profileDetail, vision: e.target.value })}
                  placeholder="Contoh: Terwujudnya perlindungan tanaman perkebunan yang tangguh, lestari, dan berdaya saing..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="block font-heading font-bold text-primary">
                    Poin-Poin Misi Institusi ({profileDetail.missions?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMission}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-on-secondary rounded-lg font-heading font-bold text-xs hover:bg-secondary/90 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Misi</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {(profileDetail.missions || []).map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2">
                      <span className="w-5 text-center font-bold text-text-muted text-[11px]">
                        {mIdx + 1}.
                      </span>
                      <input
                        type="text"
                        value={m}
                        onChange={(e) => handleUpdateMission(mIdx, e.target.value)}
                        placeholder={`Pernyataan misi ke-${mIdx + 1}...`}
                        className="flex-1 px-3 py-2 rounded-lg border border-outline/30 bg-surface-container-lowest text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMission(mIdx)}
                        title="Hapus poin misi ini"
                        className="p-2 text-text-muted hover:text-error transition-colors rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TUGAS POKOK & FUNGSI (TUPOKSI) */}
        {/* ========================================================================= */}
        {activeTab === 'tupoksi' && (
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4 text-xs">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <h2 className="text-base font-heading font-bold text-primary">
                  Tugas Pokok & Fungsi (Tupoksi)
                </h2>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Teks ini tampil di kolom kanan halaman Profil Instansi. Anda dapat menambah, mengedit, atau menghapus poin tugas fungsional.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddDuty}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-secondary text-on-secondary rounded-xl font-heading font-bold text-xs hover:bg-secondary/90 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Poin Tupoksi</span>
              </button>
            </div>

            <div>
              <label className="block font-heading font-bold text-primary mb-1">
                Judul Bagian Tupoksi
              </label>
              <input
                type="text"
                value={profileDetail.dutiesTitle}
                onChange={(e) => setProfileDetail({ ...profileDetail, dutiesTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="block font-heading font-bold text-primary">
                Daftar Poin Tugas & Fungsi ({profileDetail.duties.length})
              </label>
              {profileDetail.duties.map((duty, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2 bg-surface-container-low p-3 rounded-xl border border-border-subtle">
                  <span className="w-6 font-bold text-secondary mt-2 text-center text-xs">
                    #{dIdx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={duty}
                    onChange={(e) => handleUpdateDuty(dIdx, e.target.value)}
                    placeholder={`Rincian tugas dan fungsi ke-${dIdx + 1}...`}
                    className="flex-1 px-3 py-2 rounded-lg border border-outline/30 bg-surface-container-lowest text-xs leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDuty(dIdx)}
                    title="Hapus poin tupoksi ini"
                    className="p-2 text-text-muted hover:text-error transition-colors rounded-lg mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: STRUKTUR ORGANISASI */}
        {/* ========================================================================= */}
        {activeTab === 'struktur' && (
          <div className="flex flex-col gap-6 text-xs">
            {/* Foto Bagan Struktur Organisasi */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4">
              <div className="border-b border-border-subtle pb-3">
                <h2 className="text-base font-heading font-bold text-primary">
                  Foto / Bagan Struktur Organisasi
                </h2>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Unggah gambar bagan struktur organisasi resmi UPTD P2TP untuk ditampilkan di halaman profil publik
                </p>
              </div>

              <div>
                <label className="block font-heading font-bold text-primary mb-1">
                  Deskripsi Pengantar Struktur
                </label>
                <textarea
                  rows={2}
                  value={profileDetail.structureDescription}
                  onChange={(e) => setProfileDetail({ ...profileDetail, structureDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline/30 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="block font-heading font-bold text-primary">
                  Berkas Gambar Bagan
                </label>
                {profileDetail.structureImageUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border border-border-subtle max-w-xl bg-surface-container-low p-2">
                    <img
                      src={profileDetail.structureImageUrl}
                      alt="Bagan Struktur Organisasi"
                      className="w-full h-auto rounded-xl max-h-96 object-contain"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveStructureImage}
                      className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-error text-white rounded-lg text-xs font-heading font-bold shadow-md hover:bg-error/90 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus Foto Bagan</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-8 border-2 border-dashed border-border-subtle rounded-2xl text-center flex flex-col items-center gap-2 bg-surface-container-low">
                    <Users className="w-8 h-8 text-outline" />
                    <p className="text-xs text-text-muted">
                      Belum ada gambar bagan struktur yang diunggah.
                    </p>
                    <input
                      type="file"
                      ref={structureImgInputRef}
                      onChange={handleStructureImageUpload}
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => structureImgInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-on-secondary rounded-xl font-heading font-bold text-xs hover:bg-secondary/90 transition-colors shadow-xs mt-1"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah Gambar Bagan Struktur</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Daftar Anggota / Seksi / Pejabat */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div>
                  <h2 className="text-base font-heading font-bold text-primary">
                    Daftar Pejabat & Unit Kerja ({profileDetail.organizationMembers?.length || 0})
                  </h2>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Susunan kotak struktural yang tampil pada halaman profil instansi
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddOrgMember}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-secondary text-on-secondary rounded-xl font-heading font-bold text-xs hover:bg-secondary/90 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Pejabat / Seksi</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(profileDetail.organizationMembers || []).map((mem, mIdx) => (
                  <div
                    key={mem.id || mIdx}
                    className="p-4 rounded-xl bg-surface-container-low border border-border-subtle flex flex-col gap-2.5 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-secondary bg-surface-container-lowest px-2 py-0.5 rounded">
                        Unit #{mIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOrgMember(mIdx)}
                        title="Hapus unit/pejabat ini"
                        className="text-text-muted hover:text-error p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-primary mb-0.5">
                        Nama Jabatan
                      </label>
                      <input
                        type="text"
                        value={mem.role}
                        onChange={(e) => handleUpdateOrgMember(mIdx, 'role', e.target.value)}
                        placeholder="Contoh: Kepala UPTD P2TP"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-outline/30 bg-surface-container-lowest text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-primary mb-0.5">
                        Nama Pejabat / Pegawai
                      </label>
                      <input
                        type="text"
                        value={mem.name}
                        onChange={(e) => handleUpdateOrgMember(mIdx, 'name', e.target.value)}
                        placeholder="Contoh: Mahmud Kahfi, S.P., M.P."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-outline/30 bg-surface-container-lowest text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-primary mb-0.5">
                        Seksi / Bidang Tugas
                      </label>
                      <input
                        type="text"
                        value={mem.section}
                        onChange={(e) => handleUpdateOrgMember(mIdx, 'section', e.target.value)}
                        placeholder="Contoh: Pimpinan / Tata Usaha / Seksi Teknis"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-outline/30 bg-surface-container-lowest text-xs text-text-muted"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tombol Simpan Bawah */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Link
            to="/profil"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-outline/30 text-xs font-heading font-bold text-text-muted hover:text-primary hover:bg-surface-container-high transition-colors"
          >
            Lihat Halaman Profil Publik
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-kaltim-gold hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-heading font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Semua Perubahan Profil'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
