import React, { useContext } from "react";
import dispatch from "./dispatch";
import { TableContext } from "./index";

function LeaveTable({ position }) {
  const {
    me: { id: playerId },
    tableId
  } = useContext(TableContext);

  return (
    <div className="join-table">
      <button
        onClick={async () => {
          try {
            await dispatch(
              {
                tableId,
                playerId
              },
              "leave"
            );
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Leave Table
      </button>
    </div>
  );
}

export default LeaveTable;
