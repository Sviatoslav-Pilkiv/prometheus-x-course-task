import React from "react";
import { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { user, setUser } = props;
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem("userName");
    navigate("/signin");
    setUser(false);
  };

  const handleVisitedCart = () => {
    navigate("/cart");
  };

  return (
    <header className="page-header">
      <div className="header-text">
        <h3>X-course task / Sviatoslav Pilkiv</h3>
      </div>
      {user ? (
        <nav className="navbar">
          <FaCartPlus className={"cart"} onClick={handleVisitedCart} />
          <button className="sign-out" onClick={handleSignOut}>
            Sign-Out
          </button>
          <FaUserCircle className="user-avatar" />
          <p className="user-name">{userName}</p>
        </nav>
      ) : null}
    </header>
  );
}
