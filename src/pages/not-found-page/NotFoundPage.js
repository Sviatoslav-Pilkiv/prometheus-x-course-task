import React from "react";
import { useNavigate } from "react-router-dom";
import "./notFound.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div class="page-not-found">
      <img
        src="../../image/astronaut.jpg"
        alt="Astronaut"
        className="image-page"
      />
      <div class="page-error">
        <h2>404</h2>
        <div class="page-massage">
          <h3>Oops,something went wrong. 404 error</h3>
          <div class="page-text">
            <p>Please go to the authorization page to access the site</p>
          </div>
        </div>
        <button class="go-sign-in" onClick={() => navigate("/signin")}>
          Login page
        </button>
      </div>
    </div>
  );
}
