import React, { useContext, useState } from "react";
import dispatch from "./dispatch";
import { TableContext } from "./index";
import { AppContext } from "../App";
import usePosition from "./use-position";

function JoinTable({ position }) {
  const { tableId } = useContext(TableContext);
  const { profileId } = useContext(AppContext);
  const [disabled, setDisabled] = useState(false);
  const ref = React.createRef();
  const [top, left] = usePosition(ref, position);

  return (
    <div
      className="join-table"
      ref={ref}
      style={{
        top,
        left
      }}
    >
      <button
        disabled={disabled}
        onClick={async () => {
          try {
            // setDisabled(true);
            await dispatch(
              {
                tableId,
                profileId,
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
