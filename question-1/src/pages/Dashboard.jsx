import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>📊 Social Media Analytics Dashboard</h2>
      
      <div className="dashboard-grid">
        {/* Engagement Stats */}
        <div className="dashboard-card">
          <h3>📈 Engagement</h3>
          <p>🔥 10,245 Total Interactions</p>
          <p>👍 5,832 Likes</p>
          <p>💬 2,394 Comments</p>
        </div>

        {/* Followers Growth */}
        <div className="dashboard-card">
          <h3>🚀 Followers Growth</h3>
          <p>📆 Last 7 Days: +1,200</p>
          <p>📆 Last 30 Days: +4,500</p>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card">
          <h3>📝 Recent Activity</h3>
          <ul>
            <li>🔹 @user123 commented on a post</li>
            <li>🔹 @influencerA followed you</li>
            <li>🔹 New post reached 5,000 views</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h3>⚡ Quick Actions</h3>
          <button className="dashboard-btn">View Reports</button>
          <button className="dashboard-btn">Post Analytics</button>
          <button className="dashboard-btn">Optimize Hashtags</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
