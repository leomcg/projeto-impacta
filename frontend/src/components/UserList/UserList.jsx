/* eslint-disable react/prop-types */
import "./UserList.css";
import profilePic from "../../assets/avatar.png";
1;
const UserList = ({ users }) => (
  <>
    <h2 className="subtitle">Usuários</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id} className="user-card card">
          <img className="user-img" src={profilePic} alt={user.name} />
          <span>{user.name}</span>
        </li>
      ))}
    </ul>
  </>
);

export default UserList;
