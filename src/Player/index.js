import React, { useContext } from "react";
import { PlayerContext } from "../Table/Players";
import { AppContext } from "../App";
import usePosition from "../Table/use-position";
import Cards from "./Cards";
import PlayerTop from "./PlayerTop";
import PlayerInfo from "./PlayerInfo";
import PlayerProgress from "./PlayerProgress";
import "./styles.scss";

function Player({ position }) {
  const player = useContext(PlayerContext);
  const { profileId, profileHash } = useContext(AppContext);
  const ref = React.createRef();
  const [top, left] = usePosition(ref, position);

  if (!player) return null;

  return (
    <div
      className={`player ${player.state}`}
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
      <PlayerInfo />
      {player.active && <PlayerProgress />}
    </div>
  );
}

export default Player;
