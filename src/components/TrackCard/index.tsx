import React, { useState, useEffect } from "react";

import not_found from "../../assets/mail_not_found.svg";
import posted from "../../assets/posted_mail.svg";
import in_transit from "../../assets/in_transit.svg";
import on_delivery from "../../assets/on_delivery.svg";
import delivered from "../../assets/delivered_mail.svg";

import "./styles.css";

interface Props {
  nameProduct: string;
  trackCode: string;
  status: string;
  date: string;
  hour: string;
}

const TrackCard: React.FC<Props> = ({
  nameProduct,
  trackCode,
  status,
  date,
  hour,
}) => {
  const [statusIcon, setStatusIcon] = useState("");
  const [statusDescription, setStatusDescription] = useState("");
  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    if (status === undefined) {
      setStatusIcon(not_found);
      setStatusDescription("Não Encontrado");
      setStatusColor("#D50A0A");
    }
    if (status === "objeto postado") {
      setStatusIcon(posted);
      setStatusDescription("Objeto Postado");
      setStatusColor("#322153");
    }
    if (status === "objeto encaminhado") {
      setStatusIcon(in_transit);
      setStatusDescription("Em Trânsito");
      setStatusColor("#F3A409");
    }
    if (status === "objeto saiu para entrega ao destinatário") {
      setStatusIcon(on_delivery);
      setStatusDescription("Em Entrega");
      setStatusColor("#1D6080");
    }
    if (status === "objeto entregue ao destinatário") {
      setStatusIcon(delivered);
      setStatusDescription("Entrega Efetuada");
      setStatusColor("#578826");
    }
  }, [status]);

  return (
    <div id="card">
      <div id="header-card">
        <p>{nameProduct}</p>
        <p>
          <strong style={{ color: statusColor }}>{trackCode}</strong>
        </p>
      </div>

      <div id="main">
        <div id="status">
          <img src={statusIcon} alt={statusDescription} />
          <p>{statusDescription}</p>
        </div>

        <div id="date">
          <p>{date}</p>
          <p>{hour}</p>
        </div>
      </div>

      <div id="button-historic">
        <button>+ Histórico</button>
      </div>
    </div>
  );
};

export default TrackCard;
