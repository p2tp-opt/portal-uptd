import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, FileText, Download, Calendar, ArrowRight } from 'lucide-react';
import { Agenda, Publication } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { defaultSiteSettings } from '../../data/defaultSiteSettings';
import { formatDayMonthWITA } from '../../utils/date';
import { SampleBadge } from '../common/SampleBadge';

export const AgendaPublicationSection: React.FC = () => {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [sectionSettings, setSectionSettings] = useState(defaultSiteSettings.agendaPubSection);

  useEffect(() => {
    contentRepository.listAgenda({ limit: 3 }).then(setAgendas);
    contentRepository.listPublications({ limit: 3 }).then(setPublications);
    contentRepository.getSiteSettings().then((s) => {
      if (s?.agendaPubSection) setSectionSettings(s.agendaPubSection);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6" id="publikasi-panduan">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-secondary font-heading text-xs uppercase tracking-wider font-bold mb-1">
            <Calendar className="w-4 h-4" />
            <span>Kalender & Dokumen Teknis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
            {sectionSettings.title || 'Agenda & Publikasi Teknis'}
          </h2>
          {sectionSettings.subtitle && (
            <p className="text-xs text-text-muted mt-1">
              {sectionSettings.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel Kiri: Agenda Kegiatan Terdekat */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-border-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
              <h3 className="text-base font-heading font-bold text-primary flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-secondary" />
                <span>Agenda Lapangan Terdekat</span>
              </h3>
              <SampleBadge />
            </div>

            <div className="flex flex-col gap-4">
              {agendas.map((item) => {
                const { day, month } = formatDayMonthWITA(item.eventDate);
                return (
                  <Link
                    key={item.id}
                    to={`/agenda`}
                    className="flex items-start gap-4 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex flex-col items-center justify-center font-heading flex-shrink-0 group-hover:bg-secondary transition-colors">
                      <span className="text-base font-bold leading-none">{day}</span>
                      <span className="text-[10px] uppercase font-semibold text-kaltim-gold">{month}</span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-heading font-bold text-xs text-on-surface line-clamp-1 group-hover:text-secondary transition-colors">
                        {item.title}
                      </span>
                      {item.location && (
                        <div className="flex items-center gap-1 text-[11px] text-text-muted mt-1 truncate">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-border-subtle">
            <Link
              to={sectionSettings.agendaCtaLink || '/agenda'}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-surface-container-low hover:bg-surface-container text-secondary font-heading text-xs font-bold rounded-xl transition-colors"
            >
              <span>{sectionSettings.agendaCtaText || 'Lihat Semua Agenda Kegiatan UPTD'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Panel Kanan: Publikasi & SOP */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-border-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
              <h3 className="text-base font-heading font-bold text-primary flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                <span>Publikasi & Dokumen SOP</span>
              </h3>
              <SampleBadge />
            </div>

            <div className="flex flex-col gap-4">
              {publications.map((pub) => (
                <div
                  key={pub.id}
                  className="flex items-center justify-between gap-4 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-badge-opt-bg text-badge-opt-text flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <Link
                        to={`/publikasi`}
                        className="font-heading font-bold text-xs text-on-surface truncate hover:text-secondary transition-colors"
                      >
                        {pub.title}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                        <span className="bg-surface-container-lowest px-1.5 py-0.5 rounded text-[10px] font-bold text-secondary">
                          {pub.fileType || 'PDF'}
                        </span>
                        <span>{pub.fileSize || 'Dokumen Teknis'}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/publikasi`}
                    className="w-8 h-8 rounded-full bg-primary text-on-primary hover:bg-secondary flex items-center justify-center flex-shrink-0 transition-colors"
                    aria-label={`Unduh ${pub.title}`}
                  >
                    <Download className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-border-subtle">
            <Link
              to={sectionSettings.pubCtaLink || '/publikasi'}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-surface-container-low hover:bg-surface-container text-secondary font-heading text-xs font-bold rounded-xl transition-colors"
            >
              <span>{sectionSettings.pubCtaText || 'Unduh Publikasi & Dokumen SOP Lengkap'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
