export interface IPost {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface IAuthUser {
  name: string;
  username: string;
  password: string;
}
