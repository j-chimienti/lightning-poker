import React from "react";
import { FOLD } from "../lib/types";

const dispatch = args =>
  window
    .fetch("/action", {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" }
    })
    .then(raw => raw.json());

function Actions() {
  return (
    <div className="actions">
      <button>All-In</button>
      <button>Bet</button>
      <button>Check</button>
      <button
        onClick={async () => {
          const playerId = "pl";
          const tableId = "sdsd";

          try {
            const x = await dispatch({ type: FOLD, tableId, playerId });
            console.log(x);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Fold
      </button>
    </div>
  );
}

export default Actions;
