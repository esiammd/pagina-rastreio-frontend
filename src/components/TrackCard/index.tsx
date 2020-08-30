import React, { useState, useEffect } from "react";

import not_found from "../../assets/mail_not_found.svg";
import posted from "../../assets/posted_mail.svg";
import in_transit from "../../assets/in_transit.svg";
import on_delivery from "../../assets/on_delivery.svg";
import delivered from "../../assets/delivered_mail.svg";

import api from "../../services/api";

import "./styles.css";

interface TrackCardProps {
  nameProduct: string;
  trackCode: string;
  status: string;
  date: string;
  hour: string;
}

interface TrackHistoricProps {
  locale: string;
  status: string;
  observation: string;
  date: string;
  hour: string;
}

interface StatusProps {
  icon: string;
  description: string;
  color: string;
}

const TrackCard: React.FC<TrackCardProps> = ({
  nameProduct,
  trackCode,
  status,
  date,
  hour,
}) => {
  const [showHistoric, setShowHistoric] = useState(false);
  const [statusProps, setStatusProps] = useState<StatusProps>();
  const [trackHistoric, setTrackHistoric] = useState<Array<TrackHistoricProps>>(
    []
  );

  useEffect(() => {
    setStatusProps(selectIcon(status));
  }, [status]);

  function selectIcon(status: string) {
    if (status === undefined) {
      return {
        icon: not_found,
        description: "Não Encontrado",
        color: "#D50A0A",
      };
    }
    if (status.toLowerCase().includes("objeto postado")) {
      return { icon: posted, description: "Objeto Postado", color: "#322153" };
    }
    if (status.toLowerCase() === "objeto encaminhado") {
      return { icon: in_transit, description: "Em Trânsito", color: "#F3A409" };
    }
    if (status.toLowerCase() === "objeto saiu para entrega ao destinatário") {
      return { icon: on_delivery, description: "Em Entrega", color: "#1D6080" };
    }
    if (status.toLowerCase() === "objeto entregue ao destinatário") {
      return {
        icon: delivered,
        description: "Entrega Efetuada",
        color: "#578826",
      };
    }
  }

  async function handleHistoric(trackCode: string) {
    const historic = await api.get(`/tracks/${trackCode}`);
    setTrackHistoric(historic.data);
    setShowHistoric(!showHistoric);
  }

  return (
    <div id="card">
      <div id="header-card">
        <p>
          <strong>{nameProduct}</strong>
        </p>
        <p>
          <strong style={{ color: statusProps?.color }}>{trackCode}</strong>
        </p>
      </div>

      <div id="current-state">
        <div id="status">
          <img src={statusProps?.icon} alt={statusProps?.description} />
          <p>{statusProps?.description}</p>
        </div>

        <div id="date">
          <p>{date}</p>
          <p>{hour}</p>
        </div>
      </div>

      <div id="button-historic">
        <button
          disabled={status === undefined}
          type="button"
          onClick={() => handleHistoric(trackCode)}
        >
          + Histórico
        </button>
      </div>

      {showHistoric && (
        <div id="historic">
          <h4>Histórico</h4>

          {trackHistoric.map((item: TrackHistoricProps, index) => {
            const status = selectIcon(item.status);

            return (
              <div key={index} id="phase">
                <div id="status">
                  <img src={status?.icon} alt={status?.description} />
                  <p>{item.date}</p>
                  <p>{item.hour}</p>
                </div>

                <div id="description">
                  <h5>{item.status}</h5>
                  {item.observation ? (
                    <p>{item.observation}</p>
                  ) : (
                    <p>em {item.locale}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackCard;
