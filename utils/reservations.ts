import { Reservation } from '@/types/car';

const STORAGE_KEY = 'car_rental_reservations';

export function getReservations(): Reservation[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveReservation(reservation: Reservation): void {
  if (typeof window === 'undefined') return;
  const reservations = getReservations();
  reservations.push(reservation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
}

export function clearAllReservations(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function exportReservations(): string {
  const reservations = getReservations();
  return JSON.stringify(reservations, null, 2);
}
