import React, { useContext, createContext } from "react";
import JoinTable from "./JoinTable";
import LeaveTable from "./LeaveTable";
import { TableContext } from "./index";
import Player from "../Player";
import PlayerChips from "../Player/PlayerChips";

export const PlayerContext = createContext();

export function mapPosition(maxPlayers, position) {
  if (maxPlayers < 8) {
    return {
      6: [1, 3, 4, 5, 7, 8],
      2: [4, 8]
    }[maxPlayers][position];
  } else {
    return position + 1;
  }
}
function Players() {
  const { players, me, maxPlayers } = useContext(TableContext);
  return (
    <div className="players">
      {[...Array(maxPlayers)].map((e, i) => {
        let position = mapPosition(maxPlayers, i);
        return players[position] ? (
          <PlayerContext.Provider key={position} value={players[position]}>
            <Player position={position} />
            <PlayerChips position={position} />
          </PlayerContext.Provider>
        ) : (
          !me && <JoinTable key={position} position={position} />
        );
      })}
      {me && <LeaveTable />}
    </div>
  );
}

export default Players;
