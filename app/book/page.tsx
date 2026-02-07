import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import BookForm from './BookForm';
import BookClient from './BookClient';

export default function BookPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book</h1>
        <p className="text-gray-400 mb-8">Reserve your perfect car for your trip.</p>
        
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <BookClient />
        </Suspense>
      </div>
    </div>
  );
}
