import React from "react";

import "./styles.css";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div id="page-page404">
      <h1>Opsss!</h1>
      <span>ERRO 404 - PÁGINA NÃO ENCONTRADA</span>
      <Link to="/">Ir para Home</Link>
    </div>
  );
}

export default Page404;
