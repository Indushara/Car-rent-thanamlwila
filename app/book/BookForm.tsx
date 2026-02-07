'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cars } from '@/data/cars';
import { Car, Reservation } from '@/types/car';
import { saveReservation } from '@/utils/reservations';

interface BookFormProps {
  initialCarId?: string | null;
}

export default function BookForm({ initialCarId }: BookFormProps) {
  const router = useRouter();
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [pickup, setPickup] = useState('Downtown');
  const [dropoff, setDropoff] = useState('Downtown');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [extras, setExtras] = useState({
    gps: false,
    childSeat: false,
    additionalDriver: false,
  });
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialCarId) {
      const car = cars.find(c => c.id === initialCarId);
      if (car) setSelectedCar(car);
    } else if (cars.length > 0) {
      setSelectedCar(cars[0]);
    }
  }, [initialCarId]);

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotal = () => {
    if (!selectedCar) return 0;
    const days = calculateDays();
    let total = selectedCar.price * days;
    if (extras.gps) total += 5 * days;
    if (extras.childSeat) total += 7 * days;
    if (extras.additionalDriver) total += 10 * days;
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar || !startDate || !endDate || !fullName || !phone || !email) {
      alert('Please fill in all required fields');
      return;
    }

    const reservation: Reservation = {
      id: Date.now().toString(),
      car: selectedCar,
      startDate,
      endDate,
      pickup,
      dropoff,
      fullName,
      phone,
      email,
      extras,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
    };

    saveReservation(reservation);
    router.push('/reservations');
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Your Trip */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Your trip</h2>
          <p className="text-gray-400 text-sm mb-6">
            Choose a car and dates. Your estimate updates automatically.
          </p>
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-2">CAR</label>
          <select
            value={selectedCar?.id || ''}
            onChange={(e) => {
              const car = cars.find(c => c.id === e.target.value);
              if (car) setSelectedCar(car);
            }}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          >
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name} • ${car.price}/day
              </option>
            ))}
          </select>
          
          {selectedCar && (
            <div className="mt-4 bg-white rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-2 left-2 text-gray-400 text-sm">{selectedCar.type}</div>
              <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-opacity-30 bg-green-100"></div>
              <div className="flex justify-center items-center h-32">
                <div className="w-32 h-16 bg-gray-700 rounded-lg relative">
                  <div className="absolute bottom-0 left-2 right-2 h-3 bg-gray-600 rounded-full"></div>
                  <div className="absolute bottom-0 left-4 w-6 h-6 bg-gray-500 rounded-full"></div>
                  <div className="absolute bottom-0 right-4 w-6 h-6 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="font-bold text-black">{selectedCar.name}</h3>
                <p className="text-gray-600 text-sm">
                  {selectedCar.type} • {selectedCar.transmission} • {selectedCar.seats} seats • {selectedCar.bags} bags
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-2">START DATE</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-2">END DATE</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-2">PICKUP</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-2">DROP-OFF</label>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>
      
      {/* Right Column - Driver Details */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Driver details</h2>
          <p className="text-gray-400 text-sm mb-6">
            We'll use this to confirm your reservation.
          </p>
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-2">FULL NAME</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-2">PHONE</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+94 ..."
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-2">EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-4">Extras</label>
          <div className="space-y-3">
            {[
              { key: 'gps', label: 'GPS (+$5/day)' },
              { key: 'childSeat', label: 'Child seat (+$7/day)' },
              { key: 'additionalDriver', label: 'Additional driver (+$10/day)' },
            ].map((extra) => (
              <label
                key={extra.key}
                className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded cursor-pointer hover:bg-gray-700 transition"
              >
                <input
                  type="checkbox"
                  checked={extras[extra.key as keyof typeof extras]}
                  onChange={(e) =>
                    setExtras({ ...extras, [extra.key]: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-600"
                />
                <span className="text-white">{extra.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-2">NOTES (OPTIONAL)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything we should know?"
            rows={4}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
          />
        </div>
        
        {selectedCar && (startDate || endDate) && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-white font-bold text-xl mb-4">Estimate</div>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>{selectedCar.name} × {calculateDays()} days</span>
                <span>${selectedCar.price * calculateDays()}</span>
              </div>
              {extras.gps && (
                <div className="flex justify-between">
                  <span>GPS × {calculateDays()} days</span>
                  <span>${5 * calculateDays()}</span>
                </div>
              )}
              {extras.childSeat && (
                <div className="flex justify-between">
                  <span>Child seat × {calculateDays()} days</span>
                  <span>${7 * calculateDays()}</span>
                </div>
              )}
              {extras.additionalDriver && (
                <div className="flex justify-between">
                  <span>Additional driver × {calculateDays()} days</span>
                  <span>${10 * calculateDays()}</span>
                </div>
              )}
              <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between text-white font-bold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-100 transition"
        >
          Reserve Now
        </button>
      </div>
    </form>
  );
}
