import styles from "./authButtons.module.css";

export const AuthButtons = () => {
  return (
    <div className={styles.auth}>
      <button>
        <a href="./signin">Sign in</a>
      </button>
      <button>
        <a href="./singup">Sign up</a>
      </button>
    </div>
  );
};
