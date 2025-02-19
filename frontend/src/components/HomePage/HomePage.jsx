import { useEffect, useState } from "react";
import UserList from "../UserList/UserList.jsx";
import Header from "../Header/Header.jsx";
import PostList from "../PostList/PostList.jsx";
import api from "../../api/api";
import "./HomePage.css";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data.users));
    api.get("/posts").then((res) => setPosts(res.data.posts));
    setUser(localStorage.getItem("userName"));
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to UI
  };

  return (
    <div className="general-container">
      <Header user={user} onPostCreated={handlePostCreated} />
      <div className="home-container">
        <div className="user-list-container container">
          <UserList className="user-list-container" users={users} />
        </div>
        <div className="post-list-container container">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
