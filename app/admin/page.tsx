'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import StatCard from '@/components/admin/StatCard';
import { getReservations } from '@/utils/reservations';
import { cars } from '@/data/cars';
import { Reservation } from '@/types/car';

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setReservations(getReservations());
    } catch (error) {
      console.error('Error loading reservations:', error);
      setReservations([]);
    }
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

  const totalRevenue = reservations.reduce((sum, r) => {
    const start = new Date(r.startDate);
    const end = new Date(r.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    let total = r.car.price * days;
    if (r.extras.gps) total += 5 * days;
    if (r.extras.childSeat) total += 7 * days;
    if (r.extras.additionalDriver) total += 10 * days;
    return sum + total;
  }, 0);

  const activeReservations = reservations.filter(r => {
    const end = new Date(r.endDate);
    return end >= new Date();
  }).length;

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome to the admin panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Cars"
            value={cars.length}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
          />
          <StatCard
            title="Total Reservations"
            value={reservations.length}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            trend={{ value: '+12%', isPositive: true }}
          />
          <StatCard
            title="Active Reservations"
            value={activeReservations}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            trend={{ value: '+8%', isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Reservations</h2>
            <div className="space-y-3">
              {reservations.slice(0, 5).map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                  <div>
                    <p className="text-white font-medium">{reservation.car.name}</p>
                    <p className="text-gray-400 text-sm">{reservation.fullName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">${(() => {
                      const start = new Date(reservation.startDate);
                      const end = new Date(reservation.endDate);
                      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
                      let total = reservation.car.price * days;
                      if (reservation.extras.gps) total += 5 * days;
                      if (reservation.extras.childSeat) total += 7 * days;
                      if (reservation.extras.additionalDriver) total += 10 * days;
                      return total;
                    })()}</p>
                    <p className="text-gray-400 text-sm">{new Date(reservation.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {reservations.length === 0 && (
                <p className="text-gray-400 text-center py-4">No reservations yet</p>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/admin/cars"
                className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Manage Cars</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              <a
                href="/admin/reservations"
                className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">View All Reservations</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              <a
                href="/admin/analytics"
                className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">View Analytics</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
