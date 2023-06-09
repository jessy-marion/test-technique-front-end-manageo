import styles from "./Window.module.scss";
import { Users } from "./Components/Users/Users";
import { AddUser } from "./Components/AddUser/AddUser";
import { useEffect, useState } from "react";

export function Window() {
  const [users, setUsers] = useState([]);

  // Récupérer le JSON
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/datas/empty.json");
        if (response.ok) {
          const datas = await response.json();
          const sortDatas = Object.values(datas).sort((a, b) => {
            return a.nomdefamille.localeCompare(b.nomdefamille);
          });

          setUsers(sortDatas);
        }
      } catch (e) {}
    }
    fetchUsers();
  }, []);

  return (
    <div className={styles.window}>
      <h1 className={styles.title}>Liste app</h1>
      <AddUser users={users} setUsers={setUsers} />
      <Users users={users} setUsers={setUsers} />
    </div>
  );
}
