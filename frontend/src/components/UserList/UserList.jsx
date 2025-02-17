/* eslint-disable react/prop-types */
import "./UserList.css";
const UserList = ({ users }) => (
  <>
    <h2 className="subtitle">Usuários</h2>
    <ul className="text">
      {users.map((user) => (
        <li key={user.id} className="user-card card">
          <img
            className="user-img"
            src="../../assets/avatar.png"
            alt={user.name}
          />
          <span>{user.name}</span>
        </li>
      ))}
    </ul>
  </>
);

export default UserList;
