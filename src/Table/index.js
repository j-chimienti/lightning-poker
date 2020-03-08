import React, { useEffect, useState, useContext, createContext } from "react";
import Body from "./Body";
import Actions from "./Actions";
import Players from "./Players";
import Info from "./Info";
import "./styles.scss";
import { HORIZONTAL_LAYOUT, VERTICAL_LAYOUT } from "./defs";
import useTable from "./use-table";
import usePlayers from "./use-players";
import { AppContext } from "../App";

export const TableContext = createContext();

function Table({ match }) {
  const { tableId } = match.params;
  const [layout, setLayot] = useState(HORIZONTAL_LAYOUT);
  const { profileHash } = useContext(AppContext);

  const [table = { maxPlayers: 7 }, loadingTable] = useTable(tableId);
  const [players, me] = usePlayers(tableId, profileHash);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerHeight > window.innerWidth) {
        setLayot(VERTICAL_LAYOUT);
      } else setLayot(HORIZONTAL_LAYOUT);
    };
    window.onresize();
  }, []);

  return (
    <TableContext.Provider value={{ ...table, layout, tableId, players, me }}>
      <div
        className={`table ${
          layout === VERTICAL_LAYOUT ? "vertical" : ""
        }`.trim()}
      >
        <Body layout={layout} playersCount={Math.max(8, table.maxPlayers)} />
        {!loadingTable && <Players />}
        {!loadingTable && <Info />}
        {me && <Actions {...me} />}
      </div>
    </TableContext.Provider>
  );
}

export default Table;
