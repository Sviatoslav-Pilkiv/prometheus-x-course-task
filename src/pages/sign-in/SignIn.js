import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./signin.css";

export default function SignIn(props) {
  const [userName, setUserName] = useState("");
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const navigate = useNavigate();
  const { setUser } = props;

  const handleChange = (event) => {
    const inputUserName = event.target.value;
    setUserName(inputUserName);
    setIsUserNameValid(inputUserName.length >= 4 && inputUserName.length <= 16);
  };

  const handleSignIn = () => {
    if (isUserNameValid) {
      localStorage.setItem("userName", userName);
      navigate("/books");
      setUser(true);;
    }
  };

  return (
    <main className="sign-page">
      <FaUserAlt className="avatar" />
      <div className="panel">
        <div className="panel-form">
          <h3 className="form-title">Username</h3>
          <form className="form-panel-signin" id="signin-form" action="#">
            <div className="form-row">
              <input
                type="text"
                id="user-name"
                className="form_input"
                name="user-name"
                value={userName}
                onChange={handleChange}
                required
              />
              <span className="form_bar"></span>
              <span className="form_label">type Username</span>
              <span
                className={`form_error ${
                  !isUserNameValid ? "valid" : "hidden"
                }`}
              >
                Username must be 4-16 characters
              </span>
            </div>
          </form>
          <button
            className="floating-button"
            onClick={handleSignIn}
            disabled={userName.length < 4 || userName.length > 16}
          >
            Sign-in
          </button>
        </div>
      </div>
    </main>
  );
}
