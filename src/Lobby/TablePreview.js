import React from "react";
import PositionsInfo from "./PositionsInfo";

function TablePreview({
  title,
  fun,
  posMap = [],
  maxPlayers,
  smallBlind,
  bigBlind
}) {
  return (
    <div className="table-preview">
      <PositionsInfo map={posMap} />
      <div>
        <div>
          {title}
          {fun ? <span className="fun"> / free</span> : ""}
        </div>
        <div className="stakes">{`Stakes: ${smallBlind}/${bigBlind}`}</div>
      </div>
      <div>
        <div>
          <span>NL Hold'em</span>
        </div>
        <div>
          Players {posMap.length} of {maxPlayers}
        </div>
      </div>
    </div>
  );
}

export default TablePreview;
