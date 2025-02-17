/* eslint-disable react/prop-types */
import "./UserList.css";
const UserList = ({ users }) => (
  console.log(users),
  (
    <>
      <h2 className="subtitle">Usuários</h2>
      <ul className="text">
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <img src="../../assets/images/user-icon.png" alt={user.name} />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </>
  )
);

export default UserList;
