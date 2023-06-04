import styles from "./User.module.scss";
import { DeleteUser } from "../../../DeleteUser/DeleteUser";
import { EditUser } from "../../../EditUser/EditUser";
import { useEffect, useState } from "react";
import sort from "../../../../../../assets/functions/sort";
import { onlyLetters } from "../../../../../../assets/regex/regex";
import { emailRegEx } from "../../../../../../assets/regex/regex";

export function User({ user, users, setUsers }) {
  const [userStates, setUserStates] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    const initialUserStates = users.map(() => false);
    setUserStates(initialUserStates);
  }, [users]);

  //edition pour chaques elements
  function handleToggleEdit(index) {
    const updatedUserStates = [...userStates];
    updatedUserStates[index] = !updatedUserStates[index];
    setUserStates(updatedUserStates);
  }

  //récupération des inputs
  function handleChange(e) {
    if (e.target.name === "last-name") {
      setNom(e.target.value);
    } else if (e.target.name === "first-name") {
      setPrenom(e.target.value);
    } else {
      setMail(e.target.value);
    }
  }
  //modifications
  function update(familleIndex, personneIndex, users, index, memeFamille) {
    const arrayCopy = users.slice();
    const nbPersonnes = users[familleIndex].personnes.length > 1;
    const updatedUser = {
      id: users[familleIndex].personnes[personneIndex].id,
      prenom: prenom,
      nom: nom,
      mail: mail,
    };

    if (memeFamille) {
      arrayCopy[familleIndex].personnes.splice(personneIndex, 1, updatedUser);
      setUsers(sort([...arrayCopy]));
    } else if (!memeFamille && index >= 0) {
      if (nbPersonnes) {
        arrayCopy[index].personnes.push(updatedUser);
        arrayCopy[familleIndex].personnes.splice(personneIndex, 1);
        setUsers(sort([...users]));
      } else {
        arrayCopy[index].personnes.push(updatedUser);
        arrayCopy.splice(familleIndex, 1);
        setUsers(sort([...arrayCopy]));
      }
    } else if (index === -1) {
      if (nbPersonnes) {
        arrayCopy[familleIndex].personnes.splice(personneIndex, 1);
        setUsers(
          sort([...arrayCopy, { nomdefamille: nom, personnes: [updatedUser] }])
        );
      } else {
        arrayCopy.splice(familleIndex, 1);
        setUsers(
          sort([...arrayCopy, { nomdefamille: nom, personnes: [updatedUser] }])
        );
      }
    }
  }

  //soumission
  function handleSubmit(user) {
    if (
      onlyLetters.test(nom) &&
      onlyLetters.test(prenom) &&
      emailRegEx.test(mail)
    ) {
      const familleIndex = users.findIndex(
        (nFamille) => nFamille.nomdefamille === user.nom
      );
      const personneIndex = users[familleIndex].personnes.findIndex(
        (personne) => personne.prenom === user.prenom
      );
      const index = users.findIndex((obj) => obj.nomdefamille === nom);

      if (index !== -1 && users[familleIndex].nomdefamille === nom) {
        update(familleIndex, personneIndex, users, index, true);
        handleToggleEdit(familleIndex);
      } else if (index !== -1 && users[familleIndex].nomdefamille !== nom) {
        update(familleIndex, personneIndex, users, index, false);
      } else {
        update(familleIndex, personneIndex, users, index, false);
      }
    }
  }

  return (
    <>
      {user.map((user, index) => {
        const toggleEdit = userStates[index];
        return (
          <div className={styles.user} key={user.nom + index}>
            {!toggleEdit && (
              <span className={styles.display}>
                <p className={styles.name}>{`${user.prenom} ${user.nom}`}</p>
                <p className={styles.mail}>{user.mail}</p>
              </span>
            )}
            {toggleEdit && (
              <div className={styles.edit}>
                <input
                  onChange={handleChange}
                  className={styles.input}
                  name="last-name"
                  type="text"
                  placeholder={"Nom"}
                />
                <input
                  onChange={handleChange}
                  className={styles.input}
                  name="first-name"
                  type="text"
                  placeholder={"Prénom"}
                />
                <input
                  onChange={handleChange}
                  className={styles.input}
                  type="email"
                  placeholder={"Email"}
                />
                <button
                  onClick={() => handleSubmit(user)}
                  className={styles.btn}
                >
                  Valider
                </button>
              </div>
            )}
            <span>
              <EditUser setToggleEdit={() => handleToggleEdit(index)} />{" "}
              <DeleteUser users={users} user={user} setUsers={setUsers} />
            </span>
          </div>
        );
      })}
    </>
  );
}
