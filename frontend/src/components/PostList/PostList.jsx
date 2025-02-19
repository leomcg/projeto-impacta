/* eslint-disable react/prop-types */
import "./PostList.css";
import postImage from "../../assets/post.png";
const PostList = ({ posts }) => (
  <>
    <h2 className="subtitle">Posts</h2>
    <ul className="text">
      {posts.map((post) => (
        <li key={post.id} className="post-card card">
          <h3>{post.title}</h3>
          <div className="post-image">
            <img src={postImage} alt={post.image} />
          </div>
          <p>{post.description}</p>
          <p className="created">
            {post.createdString} <b>por {post.user}</b>
          </p>
        </li>
      ))}
    </ul>
  </>
);

export default PostList;
