// src/utils/serviceIcons.tsx
import React from 'react';
import {
  Radio,
  FlaskConical,
  Stethoscope,
  Sprout,
  ShieldCheck,
  Bug,
  Award,
  Layers,
} from 'lucide-react';

export const AVAILABLE_ICONS = [
  { id: 'radio', label: 'Radio / Surveilans Lapang', icon: Radio },
  { id: 'flask', label: 'Laboratorium / Agens Hayati', icon: FlaskConical },
  { id: 'stethoscope', label: 'Klinik / Diagnosa Tanaman', icon: Stethoscope },
  { id: 'sprout', label: 'Tanaman / Budidaya Hayati', icon: Sprout },
  { id: 'shield', label: 'Perlindungan / Proteksi OPT', icon: ShieldCheck },
  { id: 'bug', label: 'Hama & Pengendalian Serangga', icon: Bug },
  { id: 'award', label: 'Standar / Sertifikasi Mutu', icon: Award },
  { id: 'layers', label: 'Sistem Terpadu / Manajemen', icon: Layers },
];

export const renderServiceIcon = (iconName: string, className = 'w-6 h-6'): React.ReactNode => {
  switch (iconName) {
    case 'flask':
      return <FlaskConical className={className} />;
    case 'stethoscope':
      return <Stethoscope className={className} />;
    case 'sprout':
      return <Sprout className={className} />;
    case 'shield':
      return <ShieldCheck className={className} />;
    case 'bug':
      return <Bug className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'radio':
    default:
      return <Radio className={className} />;
  }
};
