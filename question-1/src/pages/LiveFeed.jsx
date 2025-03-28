import { useEffect, useState } from "react";

const LiveFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = () => {
      fetch("http://20.244.56.144/test/users/1/posts")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch posts");
          }
          return res.json();
        })
        .then((data) => {
          setPosts(data.posts.reverse()); // Show newest first
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000); // Refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-feed-container">
      <h2>📡 Live Feed</h2>
      {loading && <p>Loading latest posts...</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && posts.length === 0 && <p>No posts available.</p>}
      
      <div className="post-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <img src={post.userAvatar || "default-avatar.png"} alt="User" className="post-avatar" />
              <div className="post-info">
                <p className="post-user">{post.username || "Anonymous"}</p>
                <p className="post-time">{new Date(post.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <h3 className="post-content">{post.content}</h3>
            <div className="post-actions">
              <button className="like-btn">👍 Like</button>
              <button className="comment-btn">💬 Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;
