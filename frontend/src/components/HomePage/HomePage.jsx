import { useEffect, useState } from "react";
import UserList from "../UserList/UserList.jsx";
import PostList from "../PostList/PostList.jsx";
import api from "../../api/api";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data.users));
    api.get("/posts").then((res) => setPosts(res.data.posts));
  }, []);

  return (
    <>
      <h1 className="title">Mini Instagram</h1>
      <div className="home-container">
        <div className="user-list-container container">
          <UserList className="user-list-container" users={users} />
        </div>
        <div className="post-list-container container">
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
