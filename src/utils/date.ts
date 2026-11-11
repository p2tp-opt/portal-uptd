// src/utils/date.ts
// Format tanggal dengan zona waktu WITA (Asia/Makassar) sesuai AGENTS.md Bagian 6

export function formatDateWITA(
  dateInput: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Makassar',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('id-ID', defaultOptions).format(date);
}

export function formatDateTimeWITA(dateInput: string | Date): string {
  return formatDateWITA(dateInput, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getCurrentDateHeaderWITA(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Makassar',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return formatter.format(now);
}

export function formatDayMonthWITA(dateInput: string | Date): { day: string; month: string } {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const dayFormatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Makassar',
    day: '2-digit',
  });
  const monthFormatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Makassar',
    month: 'short',
  });
  return {
    day: dayFormatter.format(date),
    month: monthFormatter.format(date),
  };
}
