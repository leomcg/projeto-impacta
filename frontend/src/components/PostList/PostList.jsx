/* eslint-disable react/prop-types */
const PostList = ({ posts }) => (
  <>
    <h2 className="subtitle">Posts</h2>
    <ul className="text">
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  </>
);

export default PostList;
