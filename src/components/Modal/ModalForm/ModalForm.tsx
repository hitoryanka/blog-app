import { IMyPost } from "../../../utils/types";
import styles from "./modalForm.module.css";

interface ModalProps {
  post: IMyPost;
  dialog: HTMLDialogElement;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalForm = ({ post, dialog, setIsModalOpen }: ModalProps) => {
  const { id, title, body } = post;

  const closeModal = () => {
    dialog.close();
    setIsModalOpen(false);
  };

  return (
    <div
      className={styles.modal}
      id={`modal-${id}`}
    >
      <header>
        <img
          src={`/users/photos/0.png`}
          alt="avatar"
        />
        <h2>{title}</h2>
      </header>
      <main>
        <p>{body}</p>
        <footer>
          <small>by: You</small>
          <button onClick={closeModal}>Close</button>
        </footer>
      </main>
    </div>
  );
};
