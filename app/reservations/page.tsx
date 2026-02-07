'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { getReservations, clearAllReservations, exportReservations } from '@/utils/reservations';
import { Reservation } from '@/types/car';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    setReservations(getReservations());
  }, []);

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all reservations?')) {
      clearAllReservations();
      setReservations([]);
    }
  };

  const handleExport = () => {
    const json = exportReservations();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reservations.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const calculateTotal = (reservation: Reservation) => {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    let total = reservation.car.price * days;
    if (reservation.extras.gps) total += 5 * days;
    if (reservation.extras.childSeat) total += 7 * days;
    if (reservation.extras.additionalDriver) total += 10 * days;
    return total;
  };

  const totalReservations = reservations.length;
  const estimatedTotal = reservations.reduce((sum, r) => sum + calculateTotal(r), 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 bg-black text-white">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-black">
            <span className="text-white font-bold text-sm">TR</span>
          </div>
          <Link href="/" className="text-white font-semibold hover:opacity-80 whitespace-nowrap">
            Thanamlwila Car Rental
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <Link href="/cars" className="text-white hover:opacity-80 transition">Cars</Link>
          <Link href="/book" className="text-white hover:opacity-80 transition">Book</Link>
          <Link href="/contact" className="text-white hover:opacity-80 transition">Contact</Link>
          <Link href="/reservations" className="text-white hover:opacity-80 transition">Reservations</Link>
        </div>
        
        <div className="flex items-center gap-1 ml-4 lg:ml-0">
          <Button href="/cars" variant="primary" size="sm" className="whitespace-nowrap">Browse cars</Button>
          <Button href="/book" variant="secondary" size="sm" className="whitespace-nowrap">Book now</Button>
        </div>
      </nav>
      
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Reservations</h1>
            <p className="text-gray-400">
              These are stored locally in your browser (localStorage). For a real business, we can connect this to a database + admin login.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="md" onClick={handleExport}>
              Export JSON
            </Button>
            <Button variant="danger" size="md" onClick={handleClearAll}>
              Clear all
            </Button>
          </div>
        </div>
        
        {reservations.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">No reservations yet. Go to <Link href="/book" className="text-blue-400 underline">Book</Link> to create one.</p>
          </div>
        ) : (
          <>
            <div className="bg-gray-800 rounded-lg p-8 mb-8">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="bg-gray-700 rounded-lg p-6 mb-4 last:mb-0">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-white font-bold text-lg mb-2">{reservation.car.name}</h3>
                          <p className="text-gray-400 text-sm mb-1">
                            {new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {reservation.pickup} → {reservation.dropoff}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">${calculateTotal(reservation)}</p>
                          <p className="text-gray-400 text-sm">{reservation.fullName}</p>
                          <p className="text-gray-400 text-sm">{reservation.email}</p>
                        </div>
                      </div>
                      {reservation.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-600">
                          <p className="text-gray-400 text-sm">
                            <span className="font-medium">Notes: </span>{reservation.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-gray-800">
              <div className="text-white font-bold text-lg">Summary</div>
              <div className="text-gray-400">
                {totalReservations} reservation{totalReservations !== 1 ? 's' : ''} • Est. total: ${estimatedTotal}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
