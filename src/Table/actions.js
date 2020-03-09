import React, { useContext, useState } from "react";
import { FOLD, CALL } from "../lib/types";
import dispatch from "./dispatch";
import { TableContext } from "./index";

function Actions({ id: playerId, active }) {
  const { tableId } = useContext(TableContext);

  // const [allInDisabled, setAllInDisabled] = useState(active);
  // setAllInDisabled(!active);

  return (
    <div className="actions">
      <button disabled={!active}>All-In</button>
      <button disabled={!active}>Bet</button>
      <button
        disabled={!active}
        onClick={async () => {
          try {
            await dispatch({ type: CALL, tableId, playerId });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Check
      </button>
      <button
        disabled={!active}
        onClick={async () => {
          try {
            await dispatch({ type: FOLD, tableId, playerId });
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
