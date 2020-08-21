import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function Home() {
  return (
    <div id="page-home">
      <header>
        <Link to="/login">Login</Link>
      </header>

      <h1>Home</h1>
    </div>
  );
}

export default Home;
