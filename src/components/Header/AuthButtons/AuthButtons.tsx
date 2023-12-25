import { isAuthorized } from "../../../utils/lib";
import { IAuthUser } from "../../../utils/types";
import styles from "./authButtons.module.css";

export const AuthButtons = () => {
  const handleLogout = () => {
    // TODO rewrite to RTK
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser === null) {
      throw new Error("no current user");
    }
    const currentUserParsed: IAuthUser = JSON.parse(currentUser);
    // TODO rewrite to RTK
    const users = localStorage.getItem("users");

    const usersParsed: IAuthUser[] = users ? JSON.parse(users) : [];
    usersParsed.filter((user) => user.username === currentUserParsed.username);
    usersParsed.push(currentUserParsed);
    // TODO rewrite to RTK
    localStorage.setItem("users", JSON.stringify(usersParsed));
    localStorage.removeItem("currentUser");
  };

  if (isAuthorized()) {
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
