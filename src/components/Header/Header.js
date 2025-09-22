import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <img src="/logo.png" alt="App Logo" className="logo" />
      <span className="title">Pikachu Quiz</span>
    </header>
  );
}

export default Header;