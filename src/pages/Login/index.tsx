import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const history = useHistory();

  function showPassword() {
    const element = document.getElementById("password");
    const typeElement = element?.getAttribute("type");

    setIsShowPassword(!isShowPassword);

    if (typeElement === "password") {
      element?.setAttribute("type", "text");
    } else {
      element?.setAttribute("type", "password");
    }
  }

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
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div id="field-input">
            <label htmlFor="password">Senha:</label>
            <div id="input-button">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="button" onClick={showPassword}>
                {isShowPassword === false ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
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
