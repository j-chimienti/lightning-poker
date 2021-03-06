import React, { useContext } from "react";
import { TableContext } from "./index";
import HiddenCard from "../HiddenCard";
import Card from "../Card";
import ChipStack from "../ChipStack";
import { format } from "../Games/TablePreview";

function Info() {
  const {
    cards = [],
    round,
    smallBlind,
    bigBlind,
    buyIn,
    pot = "",
    tableId,
    betSum
  } = useContext(TableContext);

  return (
    <div className="table-info">
      <div>
        <h2>
          {tableId} {format(smallBlind)}/{format(bigBlind)}/{format(buyIn)}
        </h2>
        <div className="round-pot">
          <div className="round pill">{round}</div>
          <div className="pot pill">
            POT <span>{pot + betSum}</span>
          </div>
        </div>
        <div className="five-cards">
          {[...Array(5)].map((e, i) =>
            cards[i] ? <Card key={i} {...cards[i]} /> : <HiddenCard key={i} />
          )}
        </div>
        <ChipStack chips={pot} />
      </div>
    </div>
  );
}

export default Info;
