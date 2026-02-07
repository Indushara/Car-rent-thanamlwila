'use client';

import { useSearchParams } from 'next/navigation';
import BookForm from './BookForm';

export default function BookClient() {
  const searchParams = useSearchParams();
  const carId = searchParams.get('car');
  
  return <BookForm initialCarId={carId} />;
}
