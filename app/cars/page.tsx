'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { cars } from '@/data/cars';
import { Transmission } from '@/types/car';

export default function CarsPage() {
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | 'All'>('All');

  const filteredCars = selectedTransmission === 'All' 
    ? cars 
    : cars.filter(car => car.transmission === selectedTransmission);

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
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Cars</h1>
        <p className="text-gray-400 text-lg mb-8">
          Pick the perfect match—economy, SUV, luxury, or van. Transparent daily rates.
        </p>
        
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
        
        <div className="grid md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-xl font-bold mb-2">{car.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3 text-gray-400 text-sm">
                <span>{car.type}</span>
                <span>•</span>
                <span>{car.transmission}</span>
                <span>•</span>
                <span>{car.seats} seats</span>
                <span>•</span>
                <span>{car.bags} bags</span>
              </div>
              <ul className="text-gray-400 text-sm mb-4 space-y-1">
                {car.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-lg">FROM ${car.price} / day</span>
                <Button href={`/book?car=${car.id}`} variant="secondary" size="sm">
                  Reserve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
