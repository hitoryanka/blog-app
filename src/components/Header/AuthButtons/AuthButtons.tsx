import styles from "./authButtons.module.css";

export const AuthButtons = () => {
  return (
    <div className={styles.auth}>
      <button>
        <a href="./sign-in">Sign in</a>
      </button>
      <button>
        <a href="./sing-up">Sign up</a>
      </button>
    </div>
  );
};
