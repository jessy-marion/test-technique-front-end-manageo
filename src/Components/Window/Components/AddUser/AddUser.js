import styles from "./AddUser.module.scss";
import { useState } from "react";
import sort from "../../../../assets/functions/sort";
import { onlyLetters } from "../../../../assets/regex/regex";
import { emailRegEx } from "../../../../assets/regex/regex";

class newUser {
  constructor(nom, prenom, mail) {
    this.id = Date.now().toString() + Math.random().toString(36).substring(2);
    this.prenom = prenom;
    this.nom = nom;
    this.mail = mail;
  }
}

export function AddUser({ users, setUsers }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mail, setMail] = useState("");

  function handleChange(e) {
    if (e.target.name === "last-name") {
      setNom(e.target.value);
    } else if (e.target.name === "first-name") {
      setPrenom(e.target.value);
    } else {
      setMail(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      onlyLetters.test(nom) &&
      onlyLetters.test(prenom) &&
      emailRegEx.test(mail)
    ) {
      const user = new newUser(nom, prenom, mail);

      const index = users.findIndex((obj) => obj.nomdefamille === user.nom);

      if (index !== -1) {
        users[index].personnes.push(user);
        setUsers(sort([...users]));
      } else {
        setUsers(
          sort([...users, { nomdefamille: user.nom, personnes: [user] }])
        );
      }
    }
  }

  return (
    <>
      <h2 className={styles.addUser}>Ajouter un utilisateur :</h2>
      <form className={styles.form} action="">
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
        <button onClick={handleSubmit} className={styles.btn}>
          Submit
        </button>
      </form>
    </>
  );
}

//todo => delete et modif utilisateur
