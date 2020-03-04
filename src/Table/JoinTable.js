import React, { useContext } from "react";
import { JOIN } from "../lib/types";
import dispatch from "./dispatch";
import { TableContext } from "./index";

function JoinTable({ position }) {
  const { tableId } = useContext(TableContext);

  return (
    <div className="join-table">
      <button
        onClick={async () => {
          try {
            await dispatch({
              type: JOIN,
              tableId,
              position
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Join Table
      </button>
    </div>
  );
}

export default JoinTable;
