'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Reservation } from '@/types/car';
import { getReservations, clearAllReservations, exportReservations } from '@/utils/reservations';

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
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Reservations</h1>
            <p className="text-gray-400">
              These are stored locally in your browser (localStorage). For a real business, we can connect this to a database + admin login.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 border border-white text-white rounded hover:bg-gray-800 transition"
            >
              Export JSON
            </button>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition"
            >
              Clear all
            </button>
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
