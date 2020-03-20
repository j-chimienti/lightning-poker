import React, { useContext, useState } from "react";
import { FOLD } from "../lib/types";
import dispatch from "../dispatch";
import { TableContext } from "../Table";

function Fold() {
  const { tableId, me = {} } = useContext(TableContext);
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
