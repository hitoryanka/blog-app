import { useDispatch, useSelector } from "react-redux";
import { IAuthUser } from "../../../utils/types";
import styles from "./authButtons.module.css";
import { IState } from "../../../store";
import { updateCurrentUser } from "../../../features/users";
import { useState } from "react";

export const AuthButtons = () => {
  const currentUser = useSelector<IState, IAuthUser | null>(
    (state) => state.users.currentUser
  );
  const [isAuthorized, setIsAuthorized] = useState(currentUser !== null);
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (currentUser === null) {
      throw new Error("no current user");
    }

    dispatch(updateCurrentUser(null));
    setIsAuthorized(false);
  };

  if (isAuthorized) {
    return (
      <div className={styles.auth}>
        <a
          href="./"
          onClick={handleLogout}
        >
          Log out
        </a>
      </div>
    );
  }
  return (
    <div className={styles.auth}>
      <button>
        <a href="./signin">Sign in</a>
      </button>
      <button>
        <a href="./signup">Sign up</a>
      </button>
    </div>
  );
};
