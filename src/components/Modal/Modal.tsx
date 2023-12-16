import { useGetUserQuery } from "../../features/posts";
import { IPost } from "../../utils/types";
import styles from "./modal.module.css";

interface ModalProps {
  post: IPost;
  dialog: HTMLDialogElement;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // handleModal: (event: SyntheticEvent) => void;
}

export const Modal = (props: ModalProps) => {
  const { post, dialog, setIsModalOpen } = props;
  const { title, body, userId, id } = post;
  const { data: author } = useGetUserQuery(userId);

  // use proper method for checking
  if (!author) {
    return <h2>loading...</h2>;
  }

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
          <button onClick={closeModal}>Close</button>
        </footer>
      </main>
    </div>
  );
};
