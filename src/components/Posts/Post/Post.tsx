import { useRef, useState } from "react";
import { IPost, IUser } from "../../../utils/types";
import { Modal } from "../../Modal/Modal";
import styles from "./post.module.css";
import { createPortal } from "react-dom";

interface PostProps {
  post: IPost;
  author: IUser | undefined;
}

export const Post = ({ post, author }: PostProps) => {
  const { title, body } = post;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const ref = useRef<HTMLDialogElement>(document.querySelector("#post-modal"));

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
            post={post}
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
            src={`/users/photos/${author?.id}.png`}
            alt="avatar"
          />
          <h2>{title}</h2>
        </header>
        <main>
          <p>{body}</p>
          <footer>
            <small>
              by:{" "}
              {author ? `${author.name} | ${author.username}` : "loading..."}
            </small>
          </footer>
        </main>
      </article>
    </>
  );
};
