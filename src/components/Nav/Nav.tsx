import styles from "./nav.module.css";

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="">All posts</a>
        </li>
        <li>
          <a href="">Users</a>
        </li>
        <li>
          <a href="">My posts</a>
        </li>
      </ul>
    </nav>
  );
};
