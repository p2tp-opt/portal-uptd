import React from 'react';

interface SampleBadgeProps {
  label?: string;
  className?: string;
}

export const SampleBadge: React.FC<SampleBadgeProps> = ({
  label = 'Contoh',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-gold-light text-tertiary-container border border-kaltim-gold/40 ${className}`}
      title="Data ini merupakan contoh/mockup (belum diverifikasi resmi)"
    >
      {label}
    </span>
  );
};
