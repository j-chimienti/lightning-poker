import React, { useContext, useState } from "react";
import { CALL } from "../lib/types";
import dispatch from "../dispatch";
import { TableContext } from "../Table";

function Call() {
  const { tableId, maxBet, me = {} } = useContext(TableContext);
  const { id: playerId, bet } = me;
  const [disabled, disable] = useState(false);
  const amountToCall = maxBet - bet;

  return (
    <div className="call-control">
      <button
        className="call pill"
        disabled={disabled}
        onClick={async () => {
          try {
            disable(true);
            await dispatch({ type: CALL, tableId, playerId });
            disable(false);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div>{amountToCall === 0 ? "Check" : "Call"}</div>
        <div
          style={{
            display: `${amountToCall === 0 ? "none" : "block"}`
          }}
        >
          {amountToCall}
        </div>
      </button>
    </div>
  );
}

export default Call;
