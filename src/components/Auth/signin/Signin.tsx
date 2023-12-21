import { SyntheticEvent, useRef, useState } from "react";
import { IAuthUser } from "../../../utils/types";
import styles from "./signin.module.css";

export const Signin = () => {
  const users: IAuthUser[] = JSON.parse(localStorage.getItem("users") ?? "[]");

  const [errMessage, setErrMessage] = useState("");

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSignin = (e: SyntheticEvent) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.username === username.current?.value
    );

    if (!user) {
      // TODO
      setErrMessage("user with this username doesn't exist");
      return;
    }

    if (!(user.password === password.current?.value)) {
      // TODO
      setErrMessage("password doesn't match");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    <form
      onSubmit={handleSignin}
      action=""
      className={styles.form}
    >
      <h1>Welcome!</h1>
      <div>
        <label htmlFor="username">username</label>
        <input
          required
          type="text"
          id="username"
          ref={username}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          required
          type="password"
          id="password"
          ref={password}
        />
      </div>
      {errMessage && <p className={styles.error}>{errMessage}</p>}
      <button>Sign in</button>
      <footer>
        <label htmlFor="to-signup">Don't have an account yet?</label>
        <button
          type="button"
          id="to-signup"
        >
          <a href="/signup">Sign up!</a>
        </button>
      </footer>
    </form>
  );
};
