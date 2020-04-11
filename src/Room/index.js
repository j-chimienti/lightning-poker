import React, { createContext, useContext, useEffect } from "react";
import { AppContext, PORTRAIT } from "../App";
import Card, { CARD_WIDTH, CARD_HEIGHT } from "../Card";
import { point, SIZE, ASPECT_RATIO, UPDATE_ACTIVE_STATE } from "./utils";
import useTable from "../use-table";
import usePlayers from "../use-players";
import Position from "./Position";
import Actions from "../Actions";
import { addHandler } from "../App/reducer";

import "./styles.scss";

addHandler(UPDATE_ACTIVE_STATE, action => {
  // update app state
  delete action.type;
  return action;
});

export const RoomContext = createContext();

const CommunityCards = ({ width, height, cards = [] }) => {
  const MARGIN = 2;
  return (
    <svg
      x={(width - 5 * CARD_WIDTH + MARGIN) / 2}
      y={(height - CARD_HEIGHT) / 2}
      className="community-cards"
    >
      {[...Array(5)].map((e, i) => (
        <Card key={i} {...cards[i]} x={(CARD_WIDTH + MARGIN) * i} />
      ))}
    </svg>
  );
};

function Table({ orientation, children, cards }) {
  const { width, height, tablePositions } = useContext(RoomContext);
  const points = [...Array(tablePositions).keys()]
    .map(i => {
      return point(width, height, (360 / tablePositions) * i, {
        offset: 40
      }).join(",");
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="table">
      <polygon points={points} />
      <polygon className="separator" points={points} />
      <CommunityCards
        orientation={orientation}
        width={width}
        height={height}
        cards={cards}
      />
      {children}
    </svg>
  );
}

function Room({ match }) {
  let {
    state: { orientation, activePlayerId },
    dispatch,
    profileHash
  } = useContext(AppContext);

  const { tableId } = match.params;
  const [table, loadingTable] = useTable(tableId);
  const [players, me, loadingPlayers] = usePlayers(tableId, profileHash);

  let width = SIZE;
  let height = Math.round(width / ASPECT_RATIO);

  if (orientation === PORTRAIT) {
    height = SIZE;
    width = Math.round(height / ASPECT_RATIO);
  }

  useEffect(() => {
    if (loadingPlayers) {
      return;
    }
    const id = me ? me.id : null;
    if (activePlayerId !== id) {
      dispatch({
        type: UPDATE_ACTIVE_STATE,
        activePlayerId: id,
        activeTableId: tableId
      });
    }
  }, [loadingPlayers, activePlayerId, tableId, me, dispatch, table]);

  let maxPlayers = table ? table.maxPlayers : 0;
  let tablePositions = Math.max(8, maxPlayers);

  const ready = !(loadingPlayers && loadingTable);
  const maxBet = Math.max(
    0,
    ...Object.values(players).map(({ bet }) => bet || 0)
  );
  const betSum = Object.values(players).reduce((sum, p) => sum + p.bet || 0, 0);

  return (
    <RoomContext.Provider
      value={{
        table,
        tableId,
        loadingTable,
        orientation,
        players,
        width,
        height,
        tablePositions,
        maxPlayers,
        activePlayerId,
        me,
        maxBet,
        betSum
      }}
    >
      <div className="room">
        {ready && (
          <>
            <Table orientation={orientation} cards={table.cards}>
              <g>
                {[...Array(tablePositions).keys()].map(i => (
                  <Position key={i} tablePosition={i} />
                ))}
              </g>
            </Table>
            <Actions />
          </>
        )}
      </div>
    </RoomContext.Provider>
  );
}

export default Room;
