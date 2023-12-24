import { SyntheticEvent, useState } from "react";
import { IMyPost } from "../../../utils/types";
import styles from "./modalForm.module.css";
import { useDispatch } from "react-redux";
import { addPost, updatePost } from "../../../features/myPosts";

interface ModalProps {
  post?: IMyPost;
  dialog: HTMLDialogElement;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalForm = ({ post, dialog, setIsModal }: ModalProps) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");

  const handleTitle = ({ target }: SyntheticEvent) => {
    setTitle((target as HTMLInputElement).value);
  };
  const handleBody = ({ target }: SyntheticEvent) => {
    setBody((target as HTMLTextAreaElement).value);
  };

  const dispatch = useDispatch();

  const closeModal = () => {
    // TODO create new task if no post provided
    if (post) {
      dispatch(updatePost({ id: post.id, title, body }));
    } else {
      dispatch(addPost({ title, body }));
    }

    dialog.close();
    setIsModal(false);
  };

  return (
    <form className={styles.modal}>
      <header>
        <img
          src={`/users/photos/5.png`}
          alt="avatar"
        />
        <input
          className={styles.title}
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitle}
        />
      </header>
      <main>
        <textarea
          className={styles.body}
          placeholder="Start typing..."
          value={body}
          onChange={handleBody}
        />

        <footer>
          <small>by: You</small>
          <button onClick={closeModal}>Update and close</button>
        </footer>
      </main>
    </form>
  );
};
