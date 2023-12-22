import { isAuthorized } from "../../../utils/lib";
import styles from "./nav.module.css";

export const Nav = () => {
  // TODO define during page based on URL and set active styles

  console.log(isAuthorized());
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="/">All posts</a>
        </li>
        <li>
          <a href="/users">Users</a>
        </li>
        <li className={isAuthorized() ? "" : styles.unauthorized}>
          <a href="/my-posts">My posts</a>
        </li>
        <li className={isAuthorized() ? "" : styles.unauthorized}>
          <a href="/favorites">Favorites</a>
        </li>
      </ul>
    </nav>
  );
};
