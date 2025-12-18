import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logoImage from "../assets/DS Logo 1.png";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const isValidEmail = email.trim() !== "" && validateEmail(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Please fill in this field.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    // Handle login logic here
    console.log("Login:", { email });
    // Redirect to timesheet page after successful login
    // TODO: Add API logic here later
    navigate("/timesheets");
  };

  return (
    <div className="login-page">
      <div className="login-left-section">
        <div className="login-left-content">
          <img src={logoImage} alt="DS1 Admin Panel" className="login-logo" />
          <h1 className="login-app-title">DS1 Admin Panel</h1>
        </div>
      </div>

      <div className="login-right-section">
        <div className="login-form-container">
          <h2 className="login-greeting">Hello!</h2>
          <p className="login-subtitle">Login to Get started</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <div className={`input-wrapper ${emailError ? "error" : ""}`}>
                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M3 7l9 6 9-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => {
                    if (email && !validateEmail(email)) {
                      setEmailError("Please enter a valid email address");
                    } else if (!email) {
                      setEmailError("Please fill in this field.");
                    } else {
                      setEmailError("");
                    }
                  }}
                />
              </div>
              {emailError && (
                <span className="error-message">{emailError}</span>
              )}
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={!isValidEmail}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
