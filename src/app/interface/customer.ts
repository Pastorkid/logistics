export interface Customerlist {
  message: string;
  status: boolean;
  data: customerDocument[];
}
export interface customerDocument {
  id: string;
  email: string;
  name: any;
  phone: string;
  customerImage?: string;
  state: any;
  price: any;
  latitude: any;
  longtitude: any;
  createdAt: string;
  updatedAt: string;
  password: string;
  role: string;
  otp: any;
  otpRef: any;
  month: string;
  year: string;
  Package: packagetakenId[] | [];
}
export interface packagetakenId {
  id: string;
}
