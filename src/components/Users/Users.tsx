import { useContext } from "react";
import { User } from "./User/User";
import styles from "./users.module.css";
import { DataContext } from "../../App";

export const Users = () => {
  const {
    users: [users],
  } = useContext(DataContext);

  return (
    <div className={styles.users}>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
        />
      ))}
    </div>
  );
};
