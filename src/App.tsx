import { Posts } from "./components/Posts/Posts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { createContext, SetStateAction, useMemo, useState } from "react";
import { Signin } from "./components/Auth/signin/Signin";
import { Signup } from "./components/Auth/signup/Signup";
import { MyPosts } from "./components/MyPosts/MyPosts";

// TODO Authentication (https://redux-toolkit.js.org/rtk-query/usage/examples#authentication)
// TODO use RTK Query instead of Context API
// TODO use Context API to provide theme
// TODO add styles for loading process (*and failed queries) (RTK Query)
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Posts />
      </>
    ),
  },
  {
    path: "/users/:userId",
    element: (
      <>
        <Header />
        <Posts />
      </>
    ),
  },
  {
    path: "/users",
    element: (
      <>
        <Header />
        <Posts />
      </>
    ),
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/my-posts",
    element: (
      <>
        <Header /> <MyPosts />
      </>
    ),
  },
]);

export const SearchContext = createContext<
  [string, React.Dispatch<SetStateAction<string>>]
>(["", () => {}]);

function App() {
  const [search, setSearch] = useState("");

  const contextData = useMemo<[string, React.Dispatch<SetStateAction<string>>]>(
    () => [search, setSearch],
    [search, setSearch]
  );

  return (
    <SearchContext.Provider value={contextData}>
      <RouterProvider router={router} />
      {/* <Header />
      <main className={styles.main}>
        <RouterProvider router={router} />
      </main> */}
    </SearchContext.Provider>
  );
}

export default App;
