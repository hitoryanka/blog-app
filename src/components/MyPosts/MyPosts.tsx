import { useRef, useState } from "react";
import { IAuthUser } from "../../utils/types";
import { createPortal } from "react-dom";
import { ModalForm } from "../Modal/ModalForm/ModalForm";

export const MyPosts = () => {
  const userString = localStorage.getItem("currentUser");
  const user: IAuthUser | null = userString ? JSON.parse(userString) : null;
  if (user === null) {
    throw new Error("user isn't logged in");
  }

  const [isModal, setIsModal] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(
    document.querySelector("#post-modal")
  );

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
        {!user.posts.length && (
          <h3>Looks like you haven't written any posts yet!</h3>
        )}
        <button onClick={handleModal}>create Post</button>
        <ul>
          {user.posts.map((post) => (
            <li>{post.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
