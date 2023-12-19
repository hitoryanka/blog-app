import { useContext, useRef, useState } from "react";
import { IPost } from "../../../utils/types";
import { Modal } from "../../Modal/Modal";
import styles from "./post.module.css";
import { createPortal } from "react-dom";
import { DataContext } from "../../../App";

export const Post = (props: IPost) => {
  const { title, body, userId } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    users: [users],
  } = useContext(DataContext);

  const author = users.find((user) => user.id === userId);

  const ref = useRef<HTMLDialogElement>(document.querySelector("#post-modal"));

  if (!author) {
    return <h2>this post was written by nobody</h2>;
  }

  if (!ref.current) {
    throw new Error("ref doesn't link to an element");
  }
  const dialog = ref.current;

  const openModal = () => {
    setIsModalOpen(true);
    dialog.showModal();
  };

  return (
    <>
      {isModalOpen &&
        createPortal(
          <Modal
            post={props}
            dialog={dialog}
            setIsModalOpen={setIsModalOpen}
          />,
          dialog
        )}
      <article
        className={styles.post}
        onClick={openModal}
      >
        <header>
          <img
            src={`/users/photos/${author.id}.png`}
            alt="avatar"
          />
          <h2>{title}</h2>
        </header>
        <main>
          <p>{body}</p>
          <footer>
            <small>
              by: {author.name} | {author.username}
            </small>
          </footer>
        </main>
      </article>
    </>
  );
};
