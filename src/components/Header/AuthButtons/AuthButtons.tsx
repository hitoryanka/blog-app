import styles from "./authButtons.module.css";

export const AuthButtons = () => {
  return (
    <div className={styles.auth}>
      <button>Sign in</button>
      <button>Sign up</button>
    </div>
  );
};
