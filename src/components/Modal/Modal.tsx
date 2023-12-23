import { IPost, IUser } from "../../utils/types";
import styles from "./modal.module.css";

interface ModalProps {
  post: IPost;
  author: IUser | undefined;
  dialog: HTMLDialogElement;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = (props: ModalProps) => {
  const { post, author, dialog, setIsModalOpen } = props;
  const { title, body } = post;

  const closeModal = () => {
    dialog.close();
    setIsModalOpen(false);
  };

  return (
    <div className={styles.modal}>
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
            by: {author ? `${author.name} | ${author.username}` : "loading..."}
          </small>
          <button onClick={closeModal}>Close</button>
        </footer>
      </main>
    </div>
  );
};
