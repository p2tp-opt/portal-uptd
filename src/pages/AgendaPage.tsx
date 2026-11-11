import React, { useEffect, useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Calendar, CalendarDays, MapPin, Clock } from 'lucide-react';
import { Agenda } from '../types/content';
import { contentRepository } from '../services/contentRepository';
import { formatDateWITA, formatDayMonthWITA } from '../utils/date';
import { SampleBadge } from '../components/common/SampleBadge';

export const AgendaPage: React.FC = () => {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [filter, setFilter] = useState<'semua' | 'akan-datang' | 'selesai'>('semua');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    contentRepository.listAgenda().then((data) => {
      setAgendas(data);
      setLoading(false);
    });
  }, []);

  const filtered = agendas.filter((item) => {
    if (filter === 'akan-datang') return item.status === 'akan-datang';
    if (filter === 'selesai') return item.status === 'selesai';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="bg-surface-container-lowest border-b border-border-subtle">
        <Breadcrumb items={[{ label: 'Agenda Kegiatan' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary font-heading text-xs uppercase tracking-wider font-bold">
              Kalender Kerja
            </span>
            <SampleBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            Agenda Kegiatan Lapangan & Bimtek
          </h1>
          <p className="text-sm sm:text-base text-text-muted mt-2 max-w-2xl">
            Jadwal kegiatan sosialisasi, surveilans terpadu, dan pelatihan pembuatan agens hayati bersama kelompok tani di Kalimantan Timur.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8">
        {/* Filter Tombol */}
        <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded-xl border border-border-subtle self-start shadow-xs">
          <button
            type="button"
            onClick={() => setFilter('semua')}
            className={`px-4 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors ${
              filter === 'semua'
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            Semua Agenda
          </button>
          <button
            type="button"
            onClick={() => setFilter('akan-datang')}
            className={`px-4 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors ${
              filter === 'akan-datang'
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            Akan Datang
          </button>
          <button
            type="button"
            onClick={() => setFilter('selesai')}
            className={`px-4 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors ${
              filter === 'selesai'
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            Selesai
          </button>
        </div>

        {/* Daftar Agenda */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-surface-container-high animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-surface-container-lowest p-12 rounded-2xl border border-border-subtle text-center flex flex-col items-center gap-3">
            <Calendar className="w-12 h-12 text-outline" />
            <h3 className="font-heading font-bold text-lg text-primary">Belum Ada Agenda</h3>
            <p className="text-xs text-text-muted">Tidak ada agenda pada kategori yang dipilih saat ini.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((item) => {
              const { day, month } = formatDayMonthWITA(item.eventDate);
              return (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-border-subtle hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-6"
                >
                  {/* Kotak Tanggal */}
                  <div className="flex sm:flex-col items-center justify-center w-full sm:w-20 h-14 sm:h-20 bg-primary-container text-on-primary rounded-xl flex-shrink-0 gap-2 sm:gap-0">
                    <span className="text-xs uppercase font-bold text-tertiary-fixed">
                      {month}
                    </span>
                    <span className="text-2xl font-heading font-extrabold leading-none sm:mt-1">
                      {day}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="bg-badge-activity-bg text-badge-activity-text text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-full">
                        {item.status === 'akan-datang' ? 'Akan Datang' : 'Selesai'}
                      </span>
                      {item.isSample && <SampleBadge />}
                    </div>

                    <h2 className="text-lg font-heading font-bold text-primary">
                      {item.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-2 border-t border-border-subtle mt-1">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-secondary" />
                        <span>{formatDateWITA(item.eventDate)}</span>
                      </div>

                      {item.startTime && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span>
                            {item.startTime} {item.endTime ? `- ${item.endTime}` : ''} WITA
                          </span>
                        </div>
                      )}

                      {item.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
