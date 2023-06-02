import styles from "./EditUser.module.scss";

export function EditUser({ setToggleEdit, toggleEdit }) {
  function handleEdit(e) {
    e.stopPropagation();
    setToggleEdit(!toggleEdit);
  }

  return (
    <i
      onClick={handleEdit}
      className={`fa - solid fa-pen-to-square ${styles.edit}`}
    ></i>
  );
}
