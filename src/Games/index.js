import React from "react";
import TablePreview from "./TablePreview";
import useTables from "./use-tables";
import { useHistory, useLocation } from "react-router-dom";

import "./styles.scss";

function Games() {
  const [tables, loading] = useTables(20);
  let history = useHistory();
  let { pathname = "" } = useLocation();

  if (loading) {
    return null;
  }

  return (
    <div className="games-list">
      {tables.map((table, i) => (
        <a
          key={i}
          href={`/${table.id}`}
          onClick={event => {
            event.preventDefault();
            history.push(`/${table.id}`);
          }}
        >
          <TablePreview {...table} activeTableId={pathname.replace("/", "")} />
        </a>
      ))}
    </div>
  );
}

export default Games;
