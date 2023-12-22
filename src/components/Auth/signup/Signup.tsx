import { SyntheticEvent, useRef, useState } from "react";
import styles from "./signup.module.css";
import { IAuthUser } from "../../../utils/types";

export const Signup = () => {
  const [errMessage, setErrMessage] = useState("");
  const users: IAuthUser[] = JSON.parse(localStorage.getItem("users") ?? "[]");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const handleSignup = (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      usernameRef.current === null ||
      passwordRef.current === null ||
      repeatPasswordRef.current === null
    ) {
      throw new Error("bad refs");
    }

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    if (users.find((user) => user.username !== username)) {
      setErrMessage(`user named ${username} exists`);
      return;
    }

    if (password !== repeatPassword) {
      setErrMessage("passwords do not match");
      return;
    }

    users.push({
      username,
      password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("logged", "");
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
          ref={usernameRef}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          required
          type="password"
          id="password"
          ref={passwordRef}
        />
      </div>
      <div>
        <label htmlFor="repeat-password">repeat password</label>
        <input
          required
          type="password"
          id="repeat-password"
          ref={repeatPasswordRef}
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
