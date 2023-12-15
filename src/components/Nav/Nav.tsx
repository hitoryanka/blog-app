import styles from "./nav.module.css";

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>All posts</li>
        <li>Users</li>
        <li>My posts</li>
      </ul>
    </nav>
  );
};
