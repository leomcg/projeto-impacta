import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import PostList from "./components/PostList";
import { getUsers, getPostsByUserId } from "./services/api";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      getUsers()
        .then((data) => setUsers(data))
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedUser) {
      getPostsByUserId(selectedUser.id)
        .then((data) => setPosts(data))
        .catch((err) => console.error(err));
    }
  }, [selectedUser]);

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div className="main-content">
          <UserList users={users} setSelectedUser={setSelectedUser} />
          <PostList posts={posts} />
        </div>
      )}
    </div>
  );
}

export default App;
