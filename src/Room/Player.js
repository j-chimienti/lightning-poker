import React, { useContext, useState, useEffect } from "react";
import Card, { CARD_WIDTH, CARD_HEIGHT } from "../Card";
import CryptoJS from "crypto-js";
import { AppContext } from "../App";
import { POSITION_WIDTH, POSITION_PADDING, formatSats } from "./utils";

import {
  SITTING,
  CALLED,
  BETTED,
  RAISED,
  CHECKED,
  FOLDED,
  READY
} from "../lib/types";

const translateState = {
  [SITTING]: "\u00a0",
  [CALLED]: "CALL",
  [BETTED]: "BET",
  [RAISED]: "RAISE",
  [CHECKED]: "CHECK",
  [FOLDED]: "FOLD",
  [READY]: "\u00a0"
};

const FULL_PROGRESS = "35%";

function Player({ cards = [], id, chips = 0, state, winner, active, allin }) {
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

  const [progressWidth, setProgressWidth] = useState(FULL_PROGRESS);

  useEffect(() => {
    // there is a transition-duration == AUTO_FOLD_DELAY == 25s
    if (active) {
      setProgressWidth(0);
    } else {
      setProgressWidth(FULL_PROGRESS);
    }
  }, [progressWidth, active]);

  return (
    <g
      className={[
        "player-new",
        state,
        allin && "all-in",
        winner && "winner",
        active && "active"
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* <rect width="100%" height="100%" fill="red" /> */}
      <Card x={POSITION_PADDING} y={POSITION_PADDING} {...cards[0]} />
      <Card
        x={POSITION_WIDTH - CARD_WIDTH - POSITION_PADDING}
        y={POSITION_PADDING * 2}
        {...cards[1]}
      />

      <svg
        className="info"
        y={CARD_HEIGHT * 0.7}
        rx={3}
        ry={3}
        width={POSITION_WIDTH}
        height={CARD_HEIGHT * 0.32}
      >
        <rect className="state" rx={3} ry={3} width="100%" height="100%" />
        <text
          className="chips"
          y="50%"
          dy="7"
          x="48%"
          width="50%"
          height="100%"
        >
          {formatSats(chips)}
        </text>

        <rect
          style={{
            width: progressWidth,
            transitionDuration: active ? "20s" : "0s",
            visibility: active ? "visible" : "hidden"
          }}
          x="5%"
          y="45%"
          height="10%"
          width="0"
          fill="white"
          rx={2}
          ry={2}
        />

        {!active && (
          <text
            className="state-text"
            y="50%"
            dy="7"
            x="3%"
            width="50%"
            height="100%"
          >
            {winner ? "WINNER" : allin ? "ALL-IN" : translateState[state]}
          </text>
        )}
      </svg>
    </g>
  );
}

export default Player;
