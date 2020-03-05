import React, { useContext } from "react";
import dispatch from "./dispatch";
import { TableContext } from "./index";
import { AppContext } from "../App";

function JoinTable({ position }) {
  const { tableId } = useContext(TableContext);
  const { profileHash } = useContext(AppContext);

  return (
    <div className="join-table">
      <button
        onClick={async () => {
          try {
            await dispatch(
              {
                tableId,
                profileHash,
                position
              },
              "join"
            );
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
