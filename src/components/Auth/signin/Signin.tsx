import { SyntheticEvent, useRef, useState } from "react";
import { IAuthUser } from "../../../utils/types";
import styles from "./signin.module.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../store";
import { updateCurrentUser } from "../../../features/users";

export const Signin = () => {
  // TODO rewrite to RTK
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector<IState, IAuthUser[]>((state) => state.users.users);

  const [errMessage, setErrMessage] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignin = (e: SyntheticEvent) => {
    e.preventDefault();

    if (usernameRef.current === null || passwordRef.current === null) {
      throw new Error("bad refs");
    }

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const user = users.find((user) => user.username === username);

    if (!user) {
      // TODO
      setErrMessage("user with this username doesn't exist");
      return;
    }

    if (!(user.password === password)) {
      // TODO
      setErrMessage("password doesn't match");
      return;
    }

    const currentUser = {
      username,
      password,
      posts: user.posts,
      favorites: user.favorites,
    };
    // TODO rewrite to RTK DONE

    dispatch(updateCurrentUser(currentUser));
    return navigate("/");
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
