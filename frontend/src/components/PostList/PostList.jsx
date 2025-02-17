/* eslint-disable react/prop-types */
import "./PostList.css";
const PostList = ({ posts }) => (
  <>
    <h2 className="subtitle">Posts</h2>
    <ul className="text">
      {posts.map((post) => (
        <li key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <div className="post-image">
            <img src="../../assets/avatar.png" alt={post.image} />
          </div>
          <p>{post.description}</p>
          <p className="created">{post.created}</p>
        </li>
      ))}
    </ul>
  </>
);

export default PostList;
