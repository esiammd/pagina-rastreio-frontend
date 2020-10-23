import React from "react";
import { Link } from "react-router-dom";
import TrackCard from "../../components/TrackCard";

import "./styles.css";

interface TrackProps {
  code: string;
  product: string;
  status: string;
  date: string;
  hour: string;
}

function TrackList(params: any) {
  const tracks = params.location.state;

  return (
    <div id="page-tracklist">
      <header>
        <Link to="/">Voltar</Link>
      </header>

      <main>
        <div id="hello">
          <h2>Olá {tracks.user}.</h2>
          <p>
            Estas são as situações atuais dos <strong>Seus Pacotes.</strong>
          </p>
        </div>

        <div id="mailings">
          {tracks.tracks.map((track: TrackProps) => {
            return (
              <div id="track-card" key={track.code}>
                <TrackCard
                  nameProduct={track.product}
                  trackCode={track.code}
                  status={track.status}
                  date={track.date}
                  hour={track.hour}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default TrackList;
