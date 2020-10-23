import React, { FormEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dropzone from "../../components/Dropzone";

import api from "../../services/api";

import "./styles.css";

function Admin() {
  const [file, setFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  function handleLogout() {
    localStorage.removeItem("token");

    history.push("/");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();
    if (file) {
      data.append("file", file);
    } else {
      alert("Selecione um arquivo para ser enviado");
    }

    try {
      const token = localStorage.getItem("token");

      await api.post("uploads", data, {
        headers: {
          Authorization: token,
        },
      });

      alert("Upload realizado com sucesso");
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
            <Dropzone onFileUploaded={setFile} />
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
