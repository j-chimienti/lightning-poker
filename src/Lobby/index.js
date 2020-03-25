import React from "react";
import Games from "../Games";
import "./styles.scss";

function Lobby() {
  return (
    <div className="lobby">
      <h1>No Limit Texas Hold'em</h1>
      <Games />
    </div>
  );
}

export default Lobby;
