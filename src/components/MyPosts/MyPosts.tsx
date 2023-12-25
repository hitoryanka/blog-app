import { useRef, useState } from "react";
import { IAuthUser } from "../../utils/types";
import { createPortal } from "react-dom";
import { ModalForm } from "../Modal/ModalForm/ModalForm";
import { Post } from "../Posts/Post/Post";
import styles from "./myposts.module.css";
import { useSelector } from "react-redux";
import { IState } from "../../store";
import { useNavigate } from "react-router";

// TODO update posts
// BUG updating post creates a new one

export const MyPosts = () => {
  // TODO rewrite to RTK
  const user = useSelector<IState, IAuthUser | null>(
    (state) => state.users.currentUser
  );
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(
    document.querySelector("#post-modal")
  );

  if (user === null) {
    navigate("./signin");
    return;
  }
  const posts = user.posts;

  if (dialogRef.current === null) {
    throw new Error("no dialog in my-posts page");
  }

  const handleModal = () => {
    if (dialogRef.current === null) {
      throw new Error("no dialog in my-posts page");
    }
    dialogRef.current.showModal();
    setIsModal(true);
  };

  return (
    <>
      {isModal &&
        createPortal(
          <ModalForm
            dialog={dialogRef.current}
            setIsModal={setIsModal}
          />,
          dialogRef.current
        )}
      <div>
        <h2>MyPosts</h2>
        {!posts.length && (
          <h3>Looks like you haven't written any posts yet!</h3>
        )}
        <button onClick={handleModal}>create Post</button>
        <ul className={styles["my-posts"]}>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              author={user}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
