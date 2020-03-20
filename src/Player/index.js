import React, { useContext } from "react";
import { PlayerContext } from "../Table/Players";
import { AppContext } from "../App";
import usePosition from "../Table/use-position";
import Cards from "./Cards";
import PlayerTop from "./PlayerTop";
import PlayerInfo from "./PlayerInfo";
import "./styles.scss";

function Player({ position }) {
  const player = useContext(PlayerContext);
  const { profileId, profileHash } = useContext(AppContext);
  const ref = React.createRef();
  const [top, left] = usePosition(ref, position);

  if (!player) return null;

  const {
    state,
    active,
    winner,
    cards,
    allin,
    profileHash: playerProfileHash
  } = player;

  return (
    <div
      className={`player ${state} ${allin ? "all-in" : ""} ${
        winner ? "winner" : ""
      } ${active ? "active" : ""}`}
      ref={ref}
      style={{
        top,
        left
      }}
    >
      <PlayerTop />
      <Cards
        cards={cards}
        profileId={profileId}
        me={playerProfileHash === profileHash}
      />
      <PlayerInfo />
    </div>
  );
}

export default Player;
