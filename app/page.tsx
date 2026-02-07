import Link from 'next/link';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
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
          <Link href="/cars" className="text-white hover:opacity-80 transition">
            Cars
          </Link>
          <Link href="/book" className="text-white hover:opacity-80 transition">
            Book
          </Link>
          <Link href="/contact" className="text-white hover:opacity-80 transition">
            Contact
          </Link>
          <Link href="/reservations" className="text-white hover:opacity-80 transition">
            Reservations
          </Link>
        </div>
        
        <div className="flex items-center gap-1 ml-4 lg:ml-0">
          <Button
            href="/cars"
            variant="primary"
            size="sm"
            className="whitespace-nowrap"
          >
            Browse cars
          </Button>
          <Button
            href="/book"
            variant="secondary"
            size="sm"
            className="whitespace-nowrap"
          >
            Book now
          </Button>
        </div>
      </nav>

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
              <Button
                href="/cars"
                variant="primary"
                size="lg"
              >
                LEARN MORE
              </Button>
              <Button
                href="/book"
                variant="outline"
                size="lg"
              >
                PRICING &gt;
              </Button>
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
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-center text-gray-400 mb-4">Car cards will appear here</div>
              <Button href="/cars" variant="outline" fullWidth>
                View All Cars
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
