import Link from 'next/link';
import { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col">
      <div className={`${car.imageColor} rounded-lg p-8 mb-4 relative overflow-hidden`}>
        <div className="absolute top-2 left-2 text-gray-400 text-sm font-medium">
          {car.type}
        </div>
        <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-opacity-30" 
             style={{ backgroundColor: car.imageColor === 'bg-yellow-100' ? '#fef3c7' : 
                                      car.imageColor === 'bg-green-100' ? '#d1fae5' :
                                      car.imageColor === 'bg-purple-100' ? '#e9d5ff' : '#f3f4f6' }}>
        </div>
        <div className="flex justify-center items-center h-32">
          <div className="w-32 h-16 bg-gray-700 rounded-lg relative">
            <div className="absolute bottom-0 left-2 right-2 h-3 bg-gray-600 rounded-full"></div>
            <div className="absolute bottom-0 left-4 w-6 h-6 bg-gray-500 rounded-full"></div>
            <div className="absolute bottom-0 right-4 w-6 h-6 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <h3 className="text-white text-xl font-bold mb-2">{car.name}</h3>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-gray-400 text-sm">{car.type}</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-400 text-sm">{car.transmission}</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-400 text-sm">{car.seats} seats</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-400 text-sm">{car.bags} bags</span>
      </div>
      
      <ul className="text-gray-400 text-sm mb-4 space-y-1">
        {car.features.map((feature, idx) => (
          <li key={idx}>• {feature}</li>
        ))}
      </ul>
      
      <div className="mt-auto flex items-center justify-between">
        <span className="text-white font-bold text-lg">FROM ${car.price} / day</span>
        <Link
          href={`/book?car=${car.id}`}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition font-medium"
        >
          Reserve
        </Link>
      </div>
    </div>
  );
}
