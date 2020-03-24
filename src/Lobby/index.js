import React from "react";
import TablePreview from "./TablePreview";
import useTables from "./use-tables";
import { useHistory } from "react-router-dom";

import "./styles.scss";

function Lobby() {
  const [tables, loading] = useTables(20);
  let history = useHistory();

  if (loading) {
    return null;
  }
  return (
    <div className="lobby">
      {tables.map((table, i) => (
        <a
          key={i}
          href={`/${table.id}`}
          onClick={event => {
            event.preventDefault();
            history.push(`/${table.id}`);
          }}
        >
          <TablePreview {...table} />
        </a>
      ))}
    </div>
  );
}

export default Lobby;
