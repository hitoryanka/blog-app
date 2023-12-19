import styles from "./App.module.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { postsApi } from "./features/posts";
import { Posts } from "./components/Posts/Posts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Users } from "./components/Users/Users";
import { Header } from "./components/Header/Header";
import { createContext } from "react";
import { IDataContext } from "./utils/types";
// TODO split app into pages: posts, users, me

const initialData: IDataContext = {
  users: [],
  posts: [],
};
export const DataContext = createContext(initialData);

function App() {
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

  return (
    <ApiProvider api={postsApi}>
      <DataContext.Provider value={initialData}>
        <Header />
        <main className={styles.main}>
          <RouterProvider router={router} />
        </main>
      </DataContext.Provider>
    </ApiProvider>
  );
}

export default App;
