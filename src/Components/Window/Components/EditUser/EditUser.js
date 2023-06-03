import styles from "./EditUser.module.scss";

export function EditUser({ setToggleEdit, toggleEdit }) {
  //mode édition on/off
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
