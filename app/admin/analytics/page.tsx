'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getReservations } from '@/utils/reservations';
import { cars } from '@/data/cars';

export default function AdminAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-black">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  const reservations = getReservations();

  const carTypeStats = cars.reduce((acc, car) => {
    acc[car.type] = (acc[car.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const reservationByCar = reservations.reduce((acc, res) => {
    acc[res.car.name] = (acc[res.car.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Business insights and statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Cars by Type</h2>
            <div className="space-y-3">
              {Object.entries(carTypeStats).map(([type, count]) => (
                <div key={type}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">{type}</span>
                    <span className="text-gray-400">{count}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(count / cars.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Popular Cars</h2>
            <div className="space-y-3">
              {Object.entries(reservationByCar)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 5)
                .map(([carName, count]) => (
                  <div key={carName} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                    <span className="text-white">{carName}</span>
                    <span className="text-blue-400 font-bold">{count} reservations</span>
                  </div>
                ))}
              {Object.keys(reservationByCar).length === 0 && (
                <p className="text-gray-400 text-center py-4">No reservation data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
