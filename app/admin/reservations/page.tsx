'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DataTable from '@/components/admin/DataTable';
import { getReservations } from '@/utils/reservations';
import { Reservation } from '@/types/car';

export default function AdminReservations() {
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

  const columns = [
    { header: 'Car', accessor: (row: Reservation) => row.car.name },
    { header: 'Customer', accessor: (row: Reservation) => row.fullName },
    { header: 'Email', accessor: (row: Reservation) => row.email },
    { header: 'Phone', accessor: (row: Reservation) => row.phone },
    { 
      header: 'Dates', 
      accessor: (row: Reservation) => `${new Date(row.startDate).toLocaleDateString()} - ${new Date(row.endDate).toLocaleDateString()}` 
    },
    { 
      header: 'Total', 
      accessor: (row: Reservation) => `$${calculateTotal(row)}` 
    },
    { 
      header: 'Status', 
      accessor: (row: Reservation) => {
        const end = new Date(row.endDate);
        return end >= new Date() ? (
          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
        ) : (
          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">Completed</span>
        );
      }
    },
  ];

  const handleEdit = (reservation: Reservation) => {
    alert(`Edit reservation: ${reservation.id}`);
  };

  const handleDelete = (reservation: Reservation) => {
    if (confirm(`Are you sure you want to delete this reservation?`)) {
      alert(`Delete reservation: ${reservation.id}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reservations</h1>
          <p className="text-gray-400">Manage all car reservations</p>
        </div>

        <DataTable
          data={reservations}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No reservations found"
        />
      </div>
    </div>
  );
}
