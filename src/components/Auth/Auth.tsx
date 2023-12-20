import { IAuthUser } from "../../utils/types";
import styles from "./auth.module.css";

export const Auth = () => {
  const users: IAuthUser[] = JSON.parse(localStorage.getItem("users") ?? "[]");

  return (
    <form
      action=""
      className={styles.form}
    >
      <h1>Welcome!</h1>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          placeholder="start typing"
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="start typing"
        />
      </div>
      <footer>
        <label htmlFor="to-sign-up">Don't have an account yet?</label>
        <button>
          <a href="/sign-up">Sign up!</a>
        </button>
      </footer>
    </form>
  );
};
