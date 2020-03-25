import React from "react";
import PositionsInfo from "./PositionsInfo";
import TableCardsPreview from "./TableCardsPreview";

function TablePreview({
  title,
  fun,
  posMap = [],
  maxPlayers,
  smallBlind,
  bigBlind,
  rake,
  cards,
  activeTableId,
  id
}) {
  return (
    <div
      className={["table-preview", id === activeTableId ? "active" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <PositionsInfo map={posMap} maxPlayers={maxPlayers} />
      <div>
        <div>
          {title}
          {fun ? <span className="fun"> / free</span> : ""}
          {rake > 0 ? <span className="rake"> / rake {rake}%</span> : ""}
        </div>
        <div className="stakes">{`Stakes: ${smallBlind}/${bigBlind}`}</div>
      </div>
      <TableCardsPreview cards={cards} />
      <div>
        <div>
          <span>NL Hold'em</span>
        </div>
        <div className="players-info">
          Players {posMap.length} of {maxPlayers}
        </div>
      </div>
    </div>
  );
}

export default TablePreview;
