import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, FileText, Download, Calendar, ArrowRight } from 'lucide-react';
import { Agenda, Publication } from '../../types/content';
import { contentRepository } from '../../services/contentRepository';
import { formatDayMonthWITA } from '../../utils/date';
import { SampleBadge } from '../common/SampleBadge';

export const AgendaPublicationSection: React.FC = () => {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    contentRepository.listAgenda({ limit: 3 }).then(setAgendas);
    contentRepository.listPublications({ limit: 3 }).then(setPublications);
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
            Agenda & Publikasi Teknis
          </h2>
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
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-surface-container-low transition-colors group"
                  >
                    {/* Badge Kotak Tanggal */}
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary-container text-on-primary rounded-xl flex-shrink-0 group-hover:bg-secondary transition-colors">
                      <span className="text-[10px] font-bold uppercase leading-none text-tertiary-fixed">
                        {month}
                      </span>
                      <span className="text-base font-heading font-bold leading-none mt-1">
                        {day}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-on-surface line-clamp-1 group-hover:text-secondary transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-text-muted text-xs mt-1">
                        <MapPin className="w-3.5 h-3.5 text-outline flex-shrink-0" />
                        <span className="truncate">{item.location || 'Kalimantan Timur'}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-border-subtle">
            <Link
              to="/agenda"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-surface-container-low hover:bg-surface-container text-secondary font-heading text-xs font-bold rounded-xl transition-colors"
            >
              <span>Lihat Seluruh Kalender Agenda</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Panel Kanan: Regulasi & Dokumen Publikasi */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-border-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
              <h3 className="text-base font-heading font-bold text-primary flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                <span>Publikasi & Buku Saku</span>
              </h3>
              <SampleBadge />
            </div>

            <div className="flex flex-col gap-3">
              {publications.map((pub) => (
                <div
                  key={pub.id}
                  className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 group hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-error font-bold flex-shrink-0 shadow-xs">
                      <FileText className="w-5 h-5 text-error" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <Link
                        to={`/publikasi`}
                        className="font-heading font-bold text-xs sm:text-sm text-on-surface truncate group-hover:text-secondary transition-colors"
                      >
                        {pub.title}
                      </Link>
                      <span className="text-[11px] text-text-muted">
                        {pub.fileType || 'PDF'} • {pub.fileSize || 'Dokumen'} • {pub.category}
                      </span>
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
              to="/publikasi"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-surface-container-low hover:bg-surface-container text-secondary font-heading text-xs font-bold rounded-xl transition-colors"
            >
              <span>Lihat Direktori Publikasi & SOP Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
