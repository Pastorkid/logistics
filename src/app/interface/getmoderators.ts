export interface getmoderators {
  message: string;
  status: boolean;
  data: getmoderatorsDocument[];
}
export interface getmoderatorsDocument {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: any;
  password: string;
  latitude: any;
  longitude: any;
  state: any;
  createdAt: string;
  updatedAt: string;
  package: [];
}
