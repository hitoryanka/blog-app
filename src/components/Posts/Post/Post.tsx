import { useRef, useState } from "react";
import { IAuthUser, IPost, IUser } from "../../../utils/types";
import { Modal } from "../../Modal/Modal";
import styles from "./post.module.css";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { ModalForm } from "../../Modal/ModalForm/ModalForm";

interface PostProps {
  post: IPost;
  author: IUser | IAuthUser | undefined;
}

export const Post = ({ post, author }: PostProps) => {
  const { title, body } = post;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(document.querySelector("#post-modal"));

  const location = useLocation();
  const onMyPostsPage = location.pathname.includes("my-posts");
  let avatarSrc;
  let footerText;

  if (onMyPostsPage) {
    avatarSrc = "/users/photos/0.png";
    footerText = author?.username;
  } else {
    avatarSrc = `/users/photos/${(author as IUser | undefined)?.id}.png`;
    footerText = author
      ? `${(author as IUser).name} | ${author.username}`
      : "loading...";
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
          !onMyPostsPage ? (
            <Modal
              post={post}
              author={author as IUser}
              dialog={dialog}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <ModalForm
              post={post}
              dialog={dialog}
              setIsModal={setIsModalOpen}
            />
          ),
          dialog
        )}
      <article
        className={styles.post}
        onClick={openModal}
      >
        <header>
          <img
            src={avatarSrc}
            alt="avatar"
          />
          <h2>{title}</h2>
        </header>
        <main>
          <p>{body}</p>
          <footer>
            <small>by: {footerText}</small>
          </footer>
        </main>
      </article>
    </>
  );
};
