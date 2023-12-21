import { SyntheticEvent, useRef, useState } from "react";
import styles from "./signup.module.css";
import { IAuthUser } from "../../../utils/types";

export const Signup = () => {
  const [errMessage, setErrMessage] = useState("");
  const users: IAuthUser[] = JSON.parse(localStorage.getItem("users") ?? "[]");

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const repeatPassword = useRef<HTMLInputElement>(null);

  const handleSignup = (e: SyntheticEvent) => {
    e.preventDefault();

    if (users.find((user) => user.username !== username.current?.value)) {
      setErrMessage(`user named ${username.current?.value} exists`);
      return;
    }

    if (password.current?.value !== repeatPassword.current?.value) {
      setErrMessage("passwords do not match");
    }
  };

  return (
    <form
      onSubmit={handleSignup}
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
      <div>
        <label htmlFor="repeat-password">repeat password</label>
        <input
          required
          type="text"
          id="repeat-password"
          ref={repeatPassword}
        />
      </div>
      {errMessage && <p className={styles.error}>{errMessage}</p>}
      <button>Sign up</button>
      <footer>
        <label htmlFor="to-signin">Already have an account?</label>
        <button
          type="button"
          id="to-signin"
        >
          <a href="/signin">Sign in!</a>
        </button>
      </footer>
    </form>
  );
};
