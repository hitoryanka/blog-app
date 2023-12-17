import styles from "./App.module.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { postsApi } from "./features/posts";
import { Nav } from "./components/Nav/Nav";
import { Posts } from "./components/Posts/Posts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// TODO split app into pages: posts, users, me

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Posts />,
    },
    {
      path: "/user/:userId",
      element: <Posts />,
    },
  ]);

  return (
    <ApiProvider api={postsApi}>
      <header className={styles.header}>
        <Nav />
      </header>
      <main className={styles.main}>
        <RouterProvider router={router} />
      </main>
    </ApiProvider>
  );
}

export default App;
