import { createContext } from "react";
import { AuthButtons } from "./AuthButtons/AuthButtons";
import { Nav } from "./Nav/Nav";
import { Search } from "./Search/Search";
import styles from "./header.module.css";

export const AuthContext = createContext<boolean>(false);

export const Header = () => {
  const isAuthPage = location.pathname.includes("sign");

  return (
    <header className={isAuthPage ? styles.hide : styles.header}>
      <Nav />
      <Search />
      <AuthButtons />
    </header>
  );
};
