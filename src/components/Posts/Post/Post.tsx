import { SyntheticEvent, useRef, useState } from "react";
import { IAuthUser, IPost, IUser } from "../../../utils/types";
import { Modal } from "../../Modal/Modal";
import styles from "./post.module.css";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router";
import { ModalForm } from "../../Modal/ModalForm/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  removePost,
} from "../../../features/users";
import { IState } from "../../../store";

interface PostProps {
  post: IPost | Omit<IPost, "userId">;
  author: IUser | IAuthUser | undefined;
}

export const Post = ({ post, author }: PostProps) => {
  const { title, body } = post;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = useSelector<IState, IAuthUser | null>(
    (state) => state.users.currentUser
  );

  const [isFavorite, setIsFavorite] = useState<boolean>(
    currentUser === null ? false : !!currentUser.favorites.includes(post.id)
  );
  const ref = useRef<HTMLDialogElement>(document.querySelector("#post-modal"));

  const location = useLocation();
  const onMyPostsPage = location.pathname.includes("my-posts");
  let avatarSrc;
  let footerText;

  if (onMyPostsPage) {
    avatarSrc = "/users/photos/5.png";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(removePost(post.id));
  };

  const handleFavorite = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (currentUser === null) {
      navigate("./signin");
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(post.id));
    } else {
      dispatch(addToFavorites(post.id));
    }

    setIsFavorite((prev) => !prev);
  };

  return (
    <>
      {isModalOpen &&
        createPortal(
          !onMyPostsPage ? (
            <Modal
              post={post as IPost}
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
            {onMyPostsPage ? (
              <button onClick={handleDelete}>X</button>
            ) : (
              <button
                className={styles.favorite}
                onClick={handleFavorite}
              >
                <img
                  src={isFavorite ? "./favorite-active.png" : "./favorite.png"}
                  alt="add to favorite"
                />
              </button>
            )}
          </footer>
        </main>
      </article>
    </>
  );
};
