/* eslint-disable react/prop-types */
import "./PostList.css";
const PostList = ({ posts }) => (
  <>
    <ul className="text">
      {posts.map((post) => (
        <li key={post.id} className="post-card card">
          <h3>{post.title}</h3>
          {post.image && (
            <div className="post-image">
              <img src={post.image} alt="Post image" />
            </div>
          )}
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
