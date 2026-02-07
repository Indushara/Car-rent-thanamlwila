'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DataTable from '@/components/admin/DataTable';
import Button from '@/components/Button';
import { cars } from '@/data/cars';
import { Car } from '@/types/car';

export default function AdminCars() {
  const [carList, setCarList] = useState<Car[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCarList(cars);
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

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Car },
    { header: 'Type', accessor: 'type' as keyof Car },
    { header: 'Transmission', accessor: 'transmission' as keyof Car },
    { header: 'Seats', accessor: 'seats' as keyof Car },
    { header: 'Bags', accessor: 'bags' as keyof Car },
    { 
      header: 'Price', 
      accessor: (row: Car) => `$${row.price}/day` 
    },
  ];

  const handleEdit = (car: Car) => {
    alert(`Edit car: ${car.name}`);
  };

  const handleDelete = (car: Car) => {
    if (confirm(`Are you sure you want to delete ${car.name}?`)) {
      alert(`Delete car: ${car.name}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Cars Management</h1>
            <p className="text-gray-400">Manage your car fleet</p>
          </div>
          <Button variant="primary" size="md">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Car
          </Button>
        </div>

        <DataTable
          data={carList}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No cars available"
        />
      </div>
    </div>
  );
}
