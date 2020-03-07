import React from "react";
import CryptoJS from "crypto-js";
import HiddenCard from "../HiddenCard";
import Card from "../Card";

function Cards({ cards, profileId, me }) {
  if (typeof cards === "string" && me) {
    // console.log(cards, profileId);
    let bytes = CryptoJS.AES.decrypt(cards, profileId);
    cards = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return (
    <div className="player-cards">
      {cards.length === 2 ? (
        <>
          <Card {...cards[0]} />
          <Card {...cards[1]} />
        </>
      ) : (
        <>
          <HiddenCard />
          <HiddenCard />
        </>
      )}
    </div>
  );
}

export default Cards;
