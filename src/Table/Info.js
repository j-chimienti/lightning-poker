import React, { useContext } from "react";
import { TableContext } from "./index";
import HiddenCard from "../HiddenCard";
import Card from "../Card";

function Info() {
  const { cards = [] } = useContext(TableContext);

  return (
    <div className="table-info">
      <div>
        <div className="round-pot"></div>
        <div className="five-cards">
          {[...Array(5)].map((e, i) =>
            cards[i] ? <Card key={i} {...cards[i]} /> : <HiddenCard key={i} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Info;
