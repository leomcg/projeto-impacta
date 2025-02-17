/* eslint-disable react/prop-types */

const UserList = ({ users }) => (
  <div className="user-list-container">
    <h2 className="subtitle">Usuários</h2>
    <ul className="text">
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
);

export default UserList;
