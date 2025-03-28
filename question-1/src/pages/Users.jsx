import { useEffect, useState } from "react";
import "../index.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://20.244.56.144/test/users")
      .then((res) => res.json())
      .then((data) => {
        const usersArray = Object.entries(data.users).map(([id, name]) => ({
          id,
          name,
          email: `user${id}@example.com`, // Placeholder email
          location: ["New York", "London", "Tokyo", "Paris", "Berlin"][id % 5], // Random location
          role: ["Photographer", "Editor", "Blogger", "Designer", "Videographer"][id % 5], // Random role
          image: `https://source.unsplash.com/100x100/?person&random=${id}`, // Random profile image
        }));
        setUsers(usersArray.slice(0, 5)); // Show top 5 users
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="users-container">
      <h2>👤 Top Users</h2>
      {users.length === 0 ? (
        <p className="loading">Loading users...</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.image} alt={user.name} className="user-image" />
              <h3>{user.name}</h3>
              <p className="user-role">{user.role}</p>
              <p className="user-email">📧 {user.email}</p>
              <p className="user-location">📍 {user.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
