import React, { useContext } from "react";
import { PlayerContext } from "../Table/Players";
import PlayerProgress from "./PlayerProgress";

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
  [SITTING]: "sitting",
  [CALLED]: "call",
  [BETTED]: "bet",
  [RAISED]: "raise",
  [CHECKED]: "check",
  [FOLDED]: "fold",
  [READY]: "\u00a0"
};

function PlayerInfo() {
  const { state, winner, active, chips } = useContext(PlayerContext);

  return (
    <div className="player-info">
      <div className="state">
        {winner ? (
          "winner"
        ) : active ? (
          <PlayerProgress />
        ) : (
          translateState[state]
        )}
      </div>
      <div className="stake">{chips}</div>
    </div>
  );
}

export default PlayerInfo;
