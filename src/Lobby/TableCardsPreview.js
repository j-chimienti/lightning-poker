import React from "react";

import HiddenCard from "../HiddenCard";
import Card from "../Card";

function TableCardsPreview({ cards = [] }) {
  return (
    <div className="cards-preview">
      {[...Array(5)].map((e, i) =>
        cards[i] ? <Card key={i} {...cards[i]} /> : <HiddenCard key={i} />
      )}
    </div>
  );
}

export default TableCardsPreview;
