export type TUser = {
  name: string;
  id: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  role: 'admin' | 'user';
};
