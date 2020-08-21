import React, { FormEvent, useState } from "react";

import "./styles.css";
import { Link } from "react-router-dom";

function Home() {
  const [cpf, setCpf] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div id="page-home">
      <header>
        <Link to="/login">Login</Link>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <h1>Home</h1>

          <div id="field-input">
            <label>CPF:</label>
            <input
              type="text"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
            />
          </div>

          <button type="submit" id="button">
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}

export default Home;
