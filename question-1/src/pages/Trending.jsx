import { useEffect, useState } from "react";
import "../index.css"; // Ensure styles are applied

const Trending = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    fetch("http://20.244.56.144/test/users/1/posts")
      .then((res) => res.json())
      .then((data) => {
        const sortedPosts = data.posts.sort(
          (a, b) => b.comments?.length - a.comments?.length
        );
        const maxComments = sortedPosts[0]?.comments?.length || 0;
        const topPosts = sortedPosts.filter(
          (post) => post.comments?.length === maxComments
        );
        setTrendingPosts(topPosts);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>🔥 Trending Posts</h2>
      {trendingPosts.length === 0 ? (
        <p>No trending posts found.</p>
      ) : (
        <div className="post-grid">
          {trendingPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.content}</h3>
              <p><strong>Author:</strong> {post.author || "Unknown"}</p>
              <p>👍 {post.likes || 0} Likes</p>
              <p>💬 {post.comments?.length || 0} Comments</p>
              <p>📅 {new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
