import styles from "./App.module.css";
import { Posts } from "./components/Posts/Posts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Users } from "./components/Users/Users";
import { Header } from "./components/Header/Header";
import { createContext, useEffect, useState } from "react";
import { IDataContext, IPost, IUser } from "./utils/types";
import { useGetAllUsersQuery, useGetPostsQuery } from "./features/posts";
import { getUserId } from "./utils/lib";
// TODO split app into pages: posts, users, me

// const initialData: IDataContext = {
//   users: [],
//   posts: [],
// };
const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
  },
  {
    path: "/users/:userId",
    element: <Posts />,
  },
  {
    path: "/users",
    element: <Users />,
  },
]);

export const DataContext = createContext<IDataContext>({
  users: [[], () => {}],
  posts: [[], () => {}],
});

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const initialData: IDataContext = {
    posts: [posts, setPosts],
    users: [users, setUsers],
  };

  // TODO use React router for that
  const userId = getUserId();

  const { data: postsData } = useGetPostsQuery(userId);
  const { data: usersData } = useGetAllUsersQuery();

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }

    if (usersData) {
      setUsers(usersData);
    }
  }, [postsData, usersData]);

  return (
    <DataContext.Provider value={initialData}>
      <Header />
      <main className={styles.main}>
        <RouterProvider router={router} />
      </main>
    </DataContext.Provider>
  );
}

export default App;
