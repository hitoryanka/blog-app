import { AuthButtons } from "./AuthButtons/AuthButtons";
import { Nav } from "./Nav/Nav";
import { Search } from "./Search/Search";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Nav />
      <Search />
      <AuthButtons />
    </header>
  );
};
