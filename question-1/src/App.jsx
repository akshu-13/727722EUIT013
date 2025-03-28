import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Users from "./pages/Users";
import Trending from "./pages/Trending";
import LiveFeed from "./pages/LiveFeed";
import Dashboard from "./pages/Dashboard"; // Import Dashboard

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container">
                  <h1>📊 Social Media Analytics</h1>
                  <p>Track top users, trending posts, and live feeds!</p>
                </div>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/feed" element={<LiveFeed />} />
          </Routes>
        </div>
        <Footer /> {/* Footer always at bottom */}
      </div>
    </Router>
  );
};

export default App;
