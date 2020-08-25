import React from "react";

import "./styles.css";

function TrackList(params: any) {
  const tracks = params.location.state;
  console.log("tracks: ", tracks);

  return (
    <div>
      <p>TrackList</p>
    </div>
  );
}

export default TrackList;
