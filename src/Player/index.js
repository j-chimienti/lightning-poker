import React, { useContext } from "react";
import { PlayerContext } from "../Table/Players";
import { AppContext } from "../App";
import Cards from "./Cards";
import "./styles.scss";

function Player({ position }) {
  const player = useContext(PlayerContext);
  const { profileId, profileHash } = useContext(AppContext);

  return (
    <div className="player">
      <Cards
        cards={player.cards}
        profileId={profileId}
        me={player.profileHash === profileHash}
      />
    </div>
  );
}

export default Player;
