import React, { useContext } from "react";
import Card, { CARD_WIDTH, CARD_HEIGHT } from "../Card";
import CryptoJS from "crypto-js";
import { AppContext } from "../App";
import { POSITION_WIDTH } from "./utils";

// progress
// chips
// BB, D, SB

function Player({ cards = [], id }) {
  const {
    profileId,
    state: { activePlayerId }
  } = useContext(AppContext);
  if (typeof cards === "string") {
    if (activePlayerId === id) {
      let bytes = CryptoJS.AES.decrypt(cards, profileId);
      cards = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } else cards = [];
  }

  const OVERLAP = 5;

  return (
    <g className="player-new">
      <Card x={20} y={20} {...cards[0]} />
      <Card x={20 + CARD_WIDTH - OVERLAP} y={20} {...cards[1]} />
      <rect
        x={10}
        y={72}
        rx={3}
        ry={3}
        width={POSITION_WIDTH - 2 * 10}
        height={CARD_HEIGHT * 0.32}
        fill="blue"
      />
    </g>
  );
}

export default Player;
