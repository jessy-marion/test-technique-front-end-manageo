import styles from "./Delete.module.scss";

export function DeleteUser({ users, setUsers, user }) {
  function handleDelete(e) {
    e.stopPropagation();
    //suppression de l'utilisateur correspondant et de sa famille s'il n'y a plus d'utilisateur dans celle-ci
    const filteredUsers = users.map((obj) => {
      if (obj.nomdefamille === user.nom) {
        const updatedPersonnes = obj.personnes.filter(
          (personne) => personne.id !== user.id
        );
        return { ...obj, personnes: updatedPersonnes };
      }
      return obj;
    });

    const updatedDatas = filteredUsers.filter(
      //
      (obj) => obj.personnes.length > 0
    );
    console.log(users);
    setUsers(updatedDatas);
  }

  return (
    <i
      onClick={handleDelete}
      className={`fa-solid fa-delete-left ${styles.delete}`}
    ></i>
  );
}
