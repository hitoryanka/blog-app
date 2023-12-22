import { useContext } from "react";
import styles from "./nav.module.css";
import { AuthContext } from "../Header";

export const Nav = () => {
  // TODO define during page based on URL and set active styles

  const isAuthorized = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="/">All posts</a>
        </li>
        <li>
          <a href="/users">Users</a>
        </li>
        <li className={isAuthorized ? "" : styles.unauthorized}>
          <a href="/my-posts">My posts</a>
        </li>
      </ul>
    </nav>
  );
};
