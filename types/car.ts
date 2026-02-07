export type Transmission = 'Automatic' | 'Manual';
export type CarType = 'Economy' | 'SUV' | 'Luxury' | 'Van';

export interface Car {
  id: string;
  name: string;
  type: CarType;
  transmission: Transmission;
  seats: number;
  bags: number;
  features: string[];
  price: number;
  imageColor: string;
}

export interface Reservation {
  id: string;
  car: Car;
  startDate: string;
  endDate: string;
  pickup: string;
  dropoff: string;
  fullName: string;
  phone: string;
  email: string;
  extras: {
    gps: boolean;
    childSeat: boolean;
    additionalDriver: boolean;
  };
  notes?: string;
  createdAt: string;
}
