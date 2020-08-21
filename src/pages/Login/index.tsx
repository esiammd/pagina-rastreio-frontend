import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

function Login() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/sessions", { username, password });

      const { token } = response.data;

      localStorage.setItem("token", token);

      history.push("/admin");
    } catch (erro) {
      alert("Username e/ou senha inválida");
    }
  }

  return (
    <div id="page-login">
      <header>
        <Link to="/">Voltar</Link>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div id="field-input">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div id="field-input">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" id="button">
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
