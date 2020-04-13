import React, { useContext, useState } from "react";
import { FOLD } from "../lib/types";
import dispatch from "../dispatch";
import { RoomContext } from "../Room";

function Fold() {
  const { tableId, me = {} } = useContext(RoomContext);
  const { id: playerId } = me;
  const [disabled, disable] = useState(false);

  return (
    <div className="fold-control">
      <button
        className="fold"
        disabled={disabled}
        onClick={async () => {
          try {
            disable(true);
            await dispatch({ type: FOLD, tableId, playerId });
            disable(false);
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

export default Fold;
