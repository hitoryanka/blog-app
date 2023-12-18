import styles from "./nav.module.css";

export const Nav = () => {
  // TODO define during page based on URL and set active styles
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="/">All posts</a>
        </li>
        <li>
          <a href="/users">Users</a>
        </li>
        <li>
          <a href="/my-posts">My posts</a>
        </li>
      </ul>
    </nav>
  );
};
