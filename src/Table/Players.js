import React, { useContext, createContext } from "react";
import JoinTable from "./JoinTable";
import LeaveTable from "./LeaveTable";
import { TableContext } from "./index";
import Player from "../Player";
import PlayerChips from "../Player/PlayerChips";

export const PlayerContext = createContext();

function Players() {
  const { players, me, maxPlayers } = useContext(TableContext);
  return (
    <div className="players">
      {[...Array(maxPlayers)].map((e, i) =>
        players[i + 1] ? (
          <PlayerContext.Provider key={i} value={players[i + 1]}>
            <Player position={i + 1} />
            <PlayerChips position={i + 1} />
          </PlayerContext.Provider>
        ) : (
          !me && <JoinTable key={i} position={i + 1} />
        )
      )}
      {me && <LeaveTable />}
    </div>
  );
}

export default Players;
