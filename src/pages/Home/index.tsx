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

        <div id="common-questions">
          <h2>Perguntas Fequentes</h2>

          <div id="questions">
            <div id="row-cards">
              <div id="card-questions">
                <h4>Como rastrear uma compra?</h4>
                <p>
                  Para rastrear uma compra basta informar o CPF do comprador no
                  campo do formulário existente nesta página e clicar no botão
                  "Enviar". Em seguida, você será redirecionado aos resultados
                  da consulta e poderá visualizar a situação atual (e o
                  histórico) de todos os seus produtos.
                </p>
              </div>

              <div id="card-questions">
                <h4>Quando o rastreamento é atualizado?</h4>
                <p>
                  A atualização do rastreamento depende da modalidade de envio,
                  ou seja, se é SEDEX, PAC, carta registrada ou outra. Em geral,
                  os Correios atualizam as informações de rastreio em tempo
                  real, exceto para os casos de encomendas que possuem baixa
                  prioridade de entrega como, por exemplo, as cartas.
                </p>
              </div>
            </div>

            <div id="row-cards">
              <div id="card-questions">
                <h4>Como funcionam as notificações?</h4>
                <p>
                  As notificações do nosso serviço são enviadas para o seu
                  celular ou computador minutos após a atualização do objeto no
                  sistema dos Correios. Você pode ativar as notificações
                  clicando no ícone amarelo que aparece no canto inferior
                  direito da página de consulta.
                </p>
              </div>

              <div id="card-questions">
                <h4>Quais objetos é possível rastrear?</h4>
                <p>
                  É possível rastrear todos os objetos que passam pelos Correios
                  cujo envio tenha origem ou destino no Brasil. Desta forma,
                  você pode rastrear encomendas nacionais e internacionais,
                  vindas de qualquer lugar do mundo, como a China, por exemplo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
