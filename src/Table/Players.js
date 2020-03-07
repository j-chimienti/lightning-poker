import React, { useContext, createContext } from "react";
import JoinTable from "./JoinTable";
import LeaveTable from "./LeaveTable";
import { TableContext } from "./index";
import Player from "../Player";

export const PlayerContext = createContext();

function Players() {
  const { players, me, maxPlayers } = useContext(TableContext);
  return (
    <div className="players">
      {me && <LeaveTable />}
      {[...Array(maxPlayers)].map((e, i) =>
        players[i + 1] ? (
          <PlayerContext.Provider key={i} value={players[i + 1]}>
            <Player position={i + i} />
          </PlayerContext.Provider>
        ) : (
          <JoinTable key={i} position={i + 1} />
        )
      )}
    </div>
  );
}

export default Players;
