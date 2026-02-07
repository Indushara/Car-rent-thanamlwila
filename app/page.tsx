import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CarCard from '@/components/CarCard';
import { cars } from '@/data/cars';

export default function Home() {
  const popularCars = cars.slice(0, 3);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-1 bg-blue-500 mb-4"></div>
            <p className="text-white text-lg mb-4">Comfortable driving in NYC</p>
            <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mb-6 leading-tight">
              CAR<br />RENTAL
            </h1>
            <div className="flex gap-4">
              <Link
                href="/cars"
                className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                LEARN MORE
              </Link>
              <Link
                href="/book"
                className="px-6 py-3 border-2 border-yellow-400 text-white rounded hover:bg-yellow-400 hover:text-black transition flex items-center gap-2"
              >
                PRICING <span>&gt;</span>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute top-4 left-4 text-gray-400 text-sm">Luxury</div>
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-yellow-200 opacity-50"></div>
            <div className="flex justify-center items-center h-64">
              <div className="w-48 h-24 bg-gray-700 rounded-lg relative">
                <div className="absolute bottom-0 left-4 right-4 h-4 bg-gray-600 rounded-full"></div>
                <div className="absolute bottom-0 left-8 w-8 h-8 bg-gray-500 rounded-full"></div>
                <div className="absolute bottom-0 right-8 w-8 h-8 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cars Section */}
      <section className="px-6 py-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-black">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Popular cars</h2>
          </div>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">
            Hand-picked options customers love for everyday trips, family travel, and premium comfort.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {popularCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
