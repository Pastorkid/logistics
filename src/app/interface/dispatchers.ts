// drivers interfaces start
export interface driversList {
  message: string;
  status: boolean;
  data: driverDocument[];
}
export interface driverDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  status: string;
  phone: string;
  dispatcherImage?: string;
  state: any;
  latitude: any;
  longitude: any;
  password: string;
  role: string;
  otp: any;
  otpRef: any;
  accountNumber: number;
  bankName: string;
  accountName: string;
  paymentOption: string;
  bvn: any;
  nin: any;
  dobImage: any;
  dobImageId: any;
  ninImage: any;
  driverLicenseImage: any;
  driverLicenseImageId: any;
  isCompletedRegistration: boolean;
  month: string;
  year: number;
  AcceptedPackage: packagetakenId[] | [];
}
// drivers interfaces end

// topdrivers interfaces start
export interface topddriversList {
  message: string;
  status: boolean;
  data: topdriverDocument[];
}
export interface topdriverDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  status: string;
  phone: string;
  dispatcherImage?: string;
  state: any;
  latitude: any;
  longitude: any;
  password: string;
  role: string;
  otp: any;
  otpRef: any;
  accountNumber: number;
  bankName: string;
  accountName: string;
  paymentOption: string;
  bvn: any;
  nin: any;
  dobImage: any;
  dobImageId: any;
  ninImage: any;
  driverLicenseImage: any;
  driverLicenseImageId: any;
  isCompletedRegistration: boolean;
  month: string;
  year: number;
  AcceptedPackage: packagetakenId[] | [];
}
// topdrivers interfaces end

// common interfaces to both drivers and topdrivers
export interface packagetakenId {
  id: string;
}
