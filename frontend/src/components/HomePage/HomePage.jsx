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
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data.users));
    api.get("/posts").then((res) => setPosts(res.data.posts));
    setUser(localStorage.getItem("userName"));
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleUserClick = (userId, userName) => {
    api
      .get(`/posts/user/${userId}`)
      .then((res) => {
        setPosts(res.data.posts);
        setSelectedUser(userName);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setPosts([]);
          setSelectedUser(userName);
        }
      });
  };

  const handleBackToAllPosts = () => {
    api.get("/posts").then((res) => setPosts(res.data.posts));
    setSelectedUser(null);
  };

  return (
    <div className="general-container">
      <Header user={user} onPostCreated={handlePostCreated} />
      <div className="home-container">
        <div className="user-list-container container">
          <UserList users={users} onUserClick={handleUserClick} />
        </div>
        <div className="post-list-container container">
          <h2 className="subtitle">
            {selectedUser
              ? posts.length > 0
                ? `Posts de ${selectedUser}`
                : `${selectedUser} ainda não possui posts`
              : "Posts"}
          </h2>
          {selectedUser && (
            <button
              className="button back-button"
              onClick={handleBackToAllPosts}
            >
              Voltar para todos os posts
            </button>
          )}
          <PostList posts={posts} onPostDeleted={handlePostDeleted} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
