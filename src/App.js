import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";

function App(props) {
  const { user, setUser } = props;

  return (
    <div className="page">
      <Header user={user} setUser={setUser} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
