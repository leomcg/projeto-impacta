/* eslint-disable react/prop-types */
import "./UserList.css";
import profilePic from "../../assets/avatar.png";

const UserList = ({ users, onUserClick }) => (
  <>
    <h2 className="subtitle">Usuários</h2>
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          className="user-card card"
          onClick={() => onUserClick(user.id, user.name)}
        >
          <img className="user-img" src={profilePic} alt={user.name} />
          <span>{user.name}</span>
        </li>
      ))}
    </ul>
  </>
);

export default UserList;
