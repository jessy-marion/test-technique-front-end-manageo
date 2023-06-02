import styles from "./Delete.module.scss";

//todo : pas sur du setUser
export function DeleteUser({ users, setUsers, user }) {
  function handleDelete(e) {
    e.stopPropagation();
    console.log(e);
    console.log(users);
    console.log(user);

    /*const filteredUsers = users.filter((u) => {
      return user.id !== u.id;
    });*/

    /*setUsers([...users, { nomdefamille: user.nom, personnes: [] }]);*/

    /*const filteredUsers = users.map((obj) => {
      const filtered = obj.personnes.filter((u) => u.id !== user.id);
      console.log(filtered);
    });*/
    const filteredUsers = users.map((obj) => {
      if (obj.nomdefamille === user.nom) {
        const updatedPersonnes = obj.personnes.filter(
          (personne) => personne.id !== user.id
        );
        console.log(updatedPersonnes);
        return { ...obj, personnes: updatedPersonnes };
      }
      return obj;
    });

    const updatedDatas = filteredUsers.filter(
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
