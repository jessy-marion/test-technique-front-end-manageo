import styles from "./Users.module.scss";
import { User } from "./Components/User/User";

export function Users({ users, setUsers }) {
  return (
    <div className={styles.usersContainer}>
      <h2 className={styles.users}>Utilisateurs :</h2>
      {users.map((user, index) => {
        return (
          <div className={styles.byName} key={"byName" + index}>
            <h3>{user.nomdefamille}</h3>
            <User user={user.personnes} users={users} setUsers={setUsers} />
          </div>
        );
      })}
    </div>
  );
}
