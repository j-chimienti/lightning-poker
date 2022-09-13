import React, {createContext, useContext, useEffect, useState} from "react";
import {AppContext, PORTRAIT} from "../App";
import Card, {CARD_HEIGHT, CARD_WIDTH} from "../Card";
import {
    ASPECT_RATIO_LANDSCAPE,
    ASPECT_RATIO_PORTRAIT,
    CHIP_SIZE,
    formatSats,
    point,
    SIZE,
    UPDATE_ACTIVE_STATE
} from "./utils";
import Position from "./Position";
import Actions from "../Actions";
import {addHandler} from "../App/reducer";
import Pot, {getPotChipStackWidth} from "./Pot";

import "./styles.scss";
import {fetchPlayers, fetchTable} from "../api";

addHandler(UPDATE_ACTIVE_STATE, action => {
  // update app state
  delete action.type;
  return action;
});

export const RoomContext = createContext();

const CommunityCards = ({ cards = [] }) => {
  const { width, height, potsOffset } = useContext(RoomContext);

  const MARGIN = 2;
  return (
    <svg
      x={(width - 5 * CARD_WIDTH + MARGIN) / 2}
      y={(height - CARD_HEIGHT) / 2 - potsOffset + 35}
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
  const innerPoints = [...Array(tablePositions).keys()]
    .map(i => {
      return point(width, height, (360 / tablePositions) * i, {
        offset: 120
      }).join(",");
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="table">
      <polygon points={points} />
      <polygon className="inner-poly" points={innerPoints} />
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
  const [table, setTable] = useState([])
  const [players, setPlayers] = useState([])
    const [loadingTable, setLoadingTable] = useState(true)
    const [loadingPlayers, setLoadingPlayers] = useState(true)

    const [me, setMe] = useState({})
  let width = SIZE;
  let height = Math.round(width / ASPECT_RATIO_LANDSCAPE);

  if (orientation === PORTRAIT) {
    height = SIZE;
    width = Math.round(height / ASPECT_RATIO_PORTRAIT);
  }

  useEffect(() => {

      fetchPlayers(tableId, profileHash).then(({players, me, loading}) => {
          setPlayers(players)
          setLoadingPlayers(loading)
          setMe(me)
      })
      fetchTable(tableId).then(({table, loading, error}) => {
          if (error) throw error
          setTable(table)
          setLoadingTable(loading)
      })
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

  const ready = !(loadingPlayers || loadingTable);
  const maxBet = Math.max(
    0,
    ...Object.values(players).map(({ bet }) => bet || 0)
  );
  const betSum = Object.values(players).reduce((sum, p) => sum + p.bet || 0, 0);

  let potsOffset = 0;

  let fullPot;
  let pots;
  if (ready) {
    fullPot = betSum + table.pot;
    pots = [...table.pots].map(({ pot }) => pot);
    if (pots.length === 0) {
      pots.push(table.pot);
    }
    potsOffset = pots.length * 35;
  }

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
        betSum,
        potsOffset
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
              {pots.map((pot, i) => (
                <svg
                  className="pot"
                  key={i}
                  x={(width - getPotChipStackWidth(pot)) / 2}
                  y={(height - CARD_HEIGHT) / 2 + 135 - potsOffset + i * 57}
                  width={getPotChipStackWidth(pot)}
                  height={CHIP_SIZE}
                >
                  <Pot pot={pot} />
                </svg>
              ))}
              <foreignObject
                y={(height - CARD_HEIGHT) / 2 - potsOffset}
                width="100%"
                height="50"
              >
                <div className="bet-text">
                  {fullPot > 0 && <div>{`POT:  ${formatSats(fullPot)}`}</div>}
                </div>
              </foreignObject>
            </Table>
            <Actions />
          </>
        )}
      </div>
    </RoomContext.Provider>
  );
}

export default Room;
