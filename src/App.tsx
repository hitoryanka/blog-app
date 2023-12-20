import styles from "./App.module.css";
import { Posts } from "./components/Posts/Posts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Users } from "./components/Users/Users";
import { Header } from "./components/Header/Header";
import { createContext, SetStateAction, useState } from "react";

// TODO Authentication (https://redux-toolkit.js.org/rtk-query/usage/examples#authentication)
// TODO use RTK Query instead of Context API
// TODO use Context API to provide theme
// TODO add styles for loading process (*and failed queries) (RTK Query)
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

export const SearchContext = createContext<
  [string, React.Dispatch<SetStateAction<string>>]
>(["", () => {}]);

function App() {
  // TODO use React router for that

  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      <Header />
      <main className={styles.main}>
        <RouterProvider router={router} />
      </main>
    </SearchContext.Provider>
  );
}

export default App;
