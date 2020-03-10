import React, { useContext } from "react";
import { PlayerContext } from "../Table/Players";
import { TableContext } from "../Table";

const InfoCircle = ({ text, fill = "rgba(0,0,0,0.2)" }) => {
  return (
    <svg className="info-circle" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill={fill} />
      <text
        x="50%"
        y="50%"
        dy="0.38em"
        fill="white"
        textAnchor="middle"
        fontSize="50"
      >
        {text}
      </text>
    </svg>
  );
};

function PlayerTop() {
  const { dealer } = useContext(TableContext);
  const { position, sb, bb } = useContext(PlayerContext);

  return (
    <div className="player-top">
      {position === dealer && <InfoCircle text="D" fill="gold" />}
      {sb && <InfoCircle text="SB" />}
      {bb && <InfoCircle text="BB" />}
    </div>
  );
}

export default PlayerTop;
