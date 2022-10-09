export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface ISignUpCreds {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ILoginCreds {
  email: string;
  password: string;
}
