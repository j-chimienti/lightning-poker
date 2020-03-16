import React, { useContext } from "react";
import { PlayerContext } from "../Table/Players";

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
  const { state } = useContext(PlayerContext);

  return (
    <div className="player-info">
      <div className="state">{translateState[state]}</div>
    </div>
  );
}

export default PlayerInfo;
