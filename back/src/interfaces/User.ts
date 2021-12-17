export interface UserType {
  email: string;
  password: string;
  name?: string;
  location?: number;
  refresh?: string;
}

export interface UserInputType {
  readonly email: string;
  readonly password: string;
  readonly name?: string;
  readonly location?: number;
}

export interface UserModifyType {
  email?: string;
  password?: string;
  name?: string;
  location?: number;
  refresh?: string;
}
