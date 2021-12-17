export interface ProfileState {
  name: string;
  email: string;
  location: number;
}

export interface RegisterProps {
  email: string;
  password: string;
  passwordC: string;
  name: string;
  location: number;
}
