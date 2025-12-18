import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";
import logoImage from "../../assets/DS Logo 1.png";

export function Sidebar() {
  const [copied, setCopied] = useState(null);
  const navigate = useNavigate();

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleIOSLink = (e) => {
    e.preventDefault();
    copyToClipboard("https://testflight.apple.com/join/rbz4Y9h1", "ios");
  };

  const handleAndroidLink = (e) => {
    e.preventDefault();
    copyToClipboard(
      "https://drive.google.com/file/d/1htMvr53m3319fdVqtsVocqMpHp6nQPeF/view?usp=sharing",
      "android"
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logoImage} alt="DS1 Admin Panel" className="logo-img" />
          <span>DS1 Admin App</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/timesheets"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 6v6l4 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Time Sheets</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M23 21v-2a4 4 0 0 0-3-3.87"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16 3.13a4 4 0 0 1 0 7.75"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Manage Users</span>
        </NavLink>

        <NavLink
          to="/jobs"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="7"
              width="20"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>Manage Jobs</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button
          className="footer-link"
          onClick={handleIOSLink}
          title="Click to copy iOS App Link"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="2"
              width="14"
              height="20"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 18h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>{copied === "ios" ? "Copied!" : "iOS App Link"}</span>
        </button>
        <button
          className="footer-link"
          onClick={handleAndroidLink}
          title="Click to copy Android App Link"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M23 21v-2a4 4 0 0 0-3-3.87"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16 3.13a4 4 0 0 1 0 7.75"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>{copied === "android" ? "Copied!" : "Android App Link"}</span>
        </button>
        <button 
          className="footer-link logout-btn"
          onClick={() => navigate('/login')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polyline
              points="16 17 21 12 16 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="21"
              y1="12"
              x2="9"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Logout</span>
        </button>
        <div className="user-info">Logged in as Admin User</div>
      </div>
    </aside>
  );
}
