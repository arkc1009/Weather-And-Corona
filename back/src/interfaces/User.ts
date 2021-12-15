export interface UserType {
  email: string;
  password: string;
  name?: string;
  location?: string;
  refresh?: string;
}

export interface UserInputType {
  readonly email: string;
  readonly password: string;
  readonly name?: string;
  readonly location?: string;
}

export interface UserModifyType {
  email?: string;
  password?: string;
  name?: string;
  location?: string;
  refresh?: string;
}
