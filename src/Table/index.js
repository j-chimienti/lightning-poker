import React, { useEffect, useState, useContext, createContext } from "react";
import Body from "./Body";
import Actions from "./Actions";
import Players from "./Players";
import "./styles.scss";
import { HORIZONTAL_LAYOUT, VERTICAL_LAYOUT } from "./defs";
import useTable from "./use-table";
import usePlayers from "./use-players";
import { AppContext } from "../App";

export const TableContext = createContext();

function Table({ match }) {
  const [layout, setLayot] = useState(HORIZONTAL_LAYOUT);
  const { tableId } = match.params;

  const [table = { maxPlayers: 7 }] = useTable(tableId);
  const [players] = usePlayers(tableId);

  const { profileId } = useContext(AppContext);

  console.log(players, profileId);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerHeight > window.innerWidth) {
        setLayot(VERTICAL_LAYOUT);
      } else setLayot(HORIZONTAL_LAYOUT);
    };
    window.onresize();
  }, []);

  return (
    <TableContext.Provider value={{ ...table, layout, tableId }}>
      <div
        className={`table ${
          layout === VERTICAL_LAYOUT ? "vertical" : ""
        }`.trim()}
      >
        <Body layout={layout} players={Math.max(8, table.maxPlayers)} />
        <Players />
        <Actions />
      </div>
    </TableContext.Provider>
  );
}

export default Table;
