import { Reservation } from '@/types/car';

const STORAGE_KEY = 'car_rental_reservations';

export function getReservations(): Reservation[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error parsing reservations from localStorage:', error);
    // Clear invalid data
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    return [];
  }
}

export function saveReservation(reservation: Reservation): void {
  if (typeof window === 'undefined') return;
  try {
    const reservations = getReservations();
    reservations.push(reservation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  } catch (error) {
    console.error('Error saving reservation:', error);
  }
}

export function clearAllReservations(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function exportReservations(): string {
  const reservations = getReservations();
  return JSON.stringify(reservations, null, 2);
}
