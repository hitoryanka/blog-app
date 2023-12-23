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
  username: string;
  password: string;
  posts: IMyPost[];
}

export type IMyPost = Omit<IPost, "userId">;
