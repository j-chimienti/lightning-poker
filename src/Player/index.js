import React, { useContext } from "react";
import { PlayerContext } from "../Table/Players";
import { AppContext } from "../App";
import usePosition from "../Table/use-position";
import Cards from "./Cards";
import PlayerTop from "./PlayerTop";
import "./styles.scss";

function Player({ position }) {
  const player = useContext(PlayerContext);
  const { profileId, profileHash } = useContext(AppContext);
  const ref = React.createRef();
  const [top, left] = usePosition(ref, position);

  if (!player) return null;

  return (
    <div
      className="player"
      ref={ref}
      style={{
        top,
        left
      }}
    >
      <PlayerTop />
      <Cards
        cards={player.cards}
        profileId={profileId}
        me={player.profileHash === profileHash}
      />
    </div>
  );
}

export default Player;
