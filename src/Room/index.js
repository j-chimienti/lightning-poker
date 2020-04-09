import React, { createContext, useContext, useEffect } from "react";
import { AppContext, PORTRAIT } from "../App";
import Card from "../Card";
import { point, SIZE, ASPECT_RATIO, UPDATE_ACTIVE_STATE } from "./utils";
import useTable from "../use-table";
import usePlayers from "../use-players";
import Position from "./TablePosition";
import "./styles.scss";

export const RoomContext = createContext();

const CommunityCards = ({ width, height, cards = [] }) => {
  return (
    <svg
      x={(width - 5 * 62) / 2}
      y={(height - 90) / 2}
      className="community-cards"
    >
      {[...Array(5)].map((e, i) => (
        <Card key={i} {...cards[i]} x={62 * i} />
      ))}
    </svg>
  );
};

function Table({ orientation, children, cards }) {
  const { width, height, maxPlayers } = useContext(RoomContext);
  const points = [...Array(maxPlayers).keys()]
    .map(i => {
      return point(width, height, (360 / maxPlayers) * i, 40).join(",");
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="table">
      <polygon points={points} />
      <polygon className="separator" points={points} />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="none"
        stroke="red"
      />
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

function Positions(args) {
  return (
    <g>
      <Position position={1} {...args} />
      <Position position={2} {...args} />
      <Position position={3} {...args} />
      <Position position={4} {...args} />
      <Position position={5} {...args} />
      <Position position={6} {...args} />
      <Position position={7} {...args} />
      <Position position={8} {...args} />
      <Position position={9} {...args} />
    </g>
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
  const [players, me, playersLoading] = usePlayers(tableId, profileHash);

  let width = SIZE;
  let height = Math.round(width / ASPECT_RATIO);

  if (orientation === PORTRAIT) {
    height = SIZE;
    width = Math.round(height / ASPECT_RATIO);
  }

  let maxPlayers = table ? Math.max(table.maxPlayers, 8) : 8;

  useEffect(() => {
    if (playersLoading) {
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
  }, [playersLoading, activePlayerId, tableId, me, dispatch]);

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
        maxPlayers
      }}
    >
      <div className="room">
        {!loadingTable && (
          <Table orientation={orientation} cards={table.cards}>
            <Positions orientation={orientation} />
          </Table>
        )}
      </div>
    </RoomContext.Provider>
  );
}

export default Room;
