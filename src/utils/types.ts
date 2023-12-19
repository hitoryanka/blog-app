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

export interface IDataContext {
  posts: [IPost[], React.Dispatch<React.SetStateAction<IPost[]>>];
  users: [IUser[], React.Dispatch<React.SetStateAction<IUser[]>>];
}
