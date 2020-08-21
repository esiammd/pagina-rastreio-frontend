import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

// import api from "../../services/api";

import "./styles.css";

function Admin() {
  const history = useHistory();

  const [file, setFile] = useState("");

  function handleLogout() {
    localStorage.removeItem("token");

    history.push("/");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log("token: ", token);
    } catch (erro) {
      alert("Erro");
    }
  }

  return (
    <div id="page-admin">
      <header>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <h1>Página do Administrador</h1>

          <div id="field-input">
            <label>Arquivo:</label>
            <input
              type="text"
              value={file}
              onChange={(event) => setFile(event.target.value)}
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

export default Admin;
