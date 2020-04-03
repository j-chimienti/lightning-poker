import React, { useState, useEffect, useContext } from "react";
import TablePreview from "./TablePreview";
import useTables from "./use-tables";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import "./styles.scss";

export const PLAY_NOTIFY_SOUND = "PLAY_NOTIFY_SOUND";

function Games() {
  const [tables = [], loading] = useTables(20);
  let history = useHistory();
  let { pathname = "" } = useLocation();

  let { dispatch } = useContext(AppContext);
  const [savedPlayersCount, savePlayresCount] = useState(9999);

  let playersCount = tables.reduce(
    (sum, p) => sum + (p.posMap || []).length,
    0
  );

  useEffect(() => {
    if (loading) {
      return;
    }
    if (playersCount > savedPlayersCount) {
      dispatch({
        type: PLAY_NOTIFY_SOUND
      });
    }
    savePlayresCount(playersCount);
  }, [loading, playersCount, savedPlayersCount, dispatch]);

  if (loading) {
    return null;
  }

  return (
    <div className="games">
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
