import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

function Home() {
  const [cpf, setCpf] = useState("");
  const history = useHistory();

  function cpfMask(value: string) {
    //Remove tudo o que não é dígito
    value = value.replace(/\D/g, "");

    //Coloca um ponto entre o terceiro e o quarto dígitos
    value = value.replace(/(\d{3})(\d)/, "$1.$2");

    //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    value = value.replace(/(\d{3})(\d)/, "$1.$2");

    //Coloca um hífen entre o terceiro e o quarto dígitos
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return value;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.get("/tracks", {
        params: {
          cpf,
        },
      });

      history.push("/tracklist", response.data);
    } catch (erro) {
      alert("CPF não encontrado");
    }
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
            <label htmlFor="cpf">CPF:</label>
            <input
              id="cpf"
              type="text"
              maxLength={14}
              value={cpf}
              onChange={(event) => setCpf(cpfMask(event.target.value))}
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
