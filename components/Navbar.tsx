import Link from 'next/link';
import Button from './Button';

export default function Navbar() {
  return (
    <nav className="flex items-center px-3 py-2 bg-black text-white">
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
  );
}
