export interface Packages {
  message: string;
  status: boolean;
  data: packageDocument[];
}
export interface packageDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  size: number;
  weight: number;
  height: number;
  width: number;
  customerImage?: string;
  price: string;
  duration: string;
  distance: string;
  pickup_lat: string;
  pickup_lon: string;
  pickup_address: string;
  pickup_object: string;
  dropoff_lat: string;
  dropoff_lon: string;
  dropoff_object: string;
  dropoff_address: string;
  scheduled_date: string;
  scheduled_time: string;
  scheduled_object: string;
  userId: string;
  paymentStatus: string;
  status: string;
  aceptedDriverId: any;
  rejectedDriverId: [];
  awaitingDriverId: [];
  latitude: any;
  longitude: any;
  month: string;
  year: string;
}
