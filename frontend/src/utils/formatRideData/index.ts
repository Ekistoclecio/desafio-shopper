import { Ride } from '@/types/ride';

export const formatRideData = (data: Ride): Ride => {
  return {
    ...data,
    date: formatDateToCustomFormat(data.date),
    distance: Number((data.distance / 1000).toFixed(2)),
    duration: formatTimeFromString(data.duration),
  };
};

function formatDateToCustomFormat(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

function formatTimeFromString(timeString: string): string {
  const match = timeString.match(/\d+/);
  if (!match) {
    throw new Error('Invalid time string');
  }

  const seconds = parseInt(match[0], 10);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  // Monta o formato final, omitindo partes zero
  const hoursPart = hours > 0 ? `${hours}h` : '';
  const minutesPart = minutes > 0 ? `${minutes}min` : '';

  return [hoursPart, minutesPart].filter(Boolean).join(' ');
}
