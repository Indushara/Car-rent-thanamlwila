'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CarCard from '@/components/CarCard';
import { cars } from '@/data/cars';
import { Transmission } from '@/types/car';

export default function CarsPage() {
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | 'All'>('All');

  const filteredCars = selectedTransmission === 'All' 
    ? cars 
    : cars.filter(car => car.transmission === selectedTransmission);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Cars</h1>
        <p className="text-gray-400 text-lg mb-8">
          Pick the perfect match—economy, SUV, luxury, or van. Transparent daily rates.
        </p>
        
        {/* Filter */}
        <div className="mb-8">
          <div className="text-white text-sm mb-3">TRANSMISSION</div>
          <div className="flex gap-3">
            {(['All', 'Automatic', 'Manual'] as const).map((transmission) => (
              <button
                key={transmission}
                onClick={() => setSelectedTransmission(transmission)}
                className={`px-6 py-2 rounded-full transition ${
                  selectedTransmission === transmission
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {transmission}
              </button>
            ))}
          </div>
        </div>
        
        {/* Cars Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
