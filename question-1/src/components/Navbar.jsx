import { Link } from "react-router-dom";
import "../index.css"; // Import styles
import Slideshow from "./Slideshow"; // Import the Slideshow component
import Footer from "./Footer"; // Import the Footer component

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/trending">Trending</Link>
          <Link to="/feed">Live Feed</Link>
        </div>
      </nav>

      {/* Slideshow Below Navbar */}
      <Slideshow />

      {/* Footer Below Everything */}
      <Footer />
    </>
  );
};

export default Navbar;
