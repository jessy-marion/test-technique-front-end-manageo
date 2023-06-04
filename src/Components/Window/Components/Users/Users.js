import styles from "./Users.module.scss";
import { User } from "./Components/User/User";

export function Users({ users, setUsers }) {
  return (
    <div className={styles.usersContainer}>
      {users.length === 0 ? (
        <p className={styles.help}>
          Veuillez renseigner un nom, prénom et mail fictif. Les informations
          seront sauvegardées, affichées puis triées par nom de famille dans
          l'ordre alphabétique.{" "}
          <span> Exemple : Nom : Doe, Prénom : John, Mail: jdoe@gmail.com</span>
        </p>
      ) : (
        <h2 className={styles.users}>Utilisateurs :</h2>
      )}
      {users.map((user, index) => {
        return (
          <div className={styles.byName} key={"byName" + index}>
            <h3 className={styles.nomDeFamille}>{user.nomdefamille}</h3>
            <User user={user.personnes} users={users} setUsers={setUsers} />
          </div>
        );
      })}
    </div>
  );
}

//affichage des utilisateurs
