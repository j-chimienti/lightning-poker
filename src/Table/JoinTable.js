import React, { useContext } from "react";
import dispatch from "../dispatch";
import { TableContext } from "./index";
import { AppContext } from "../App";
import usePosition from "./use-position";
import { JOIN } from "../lib/types";

function JoinTable({ position }) {
  const { tableId, showError } = useContext(TableContext);
  const { profileId } = useContext(AppContext);
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
      <svg
        viewBox="0 0 100 100"
        onClick={async () => {
          try {
            let { error } = await dispatch({
              type: JOIN,
              tableId,
              profileId,
              position
            });
            console.log(error);
            if (error) {
              showError(error);
            }
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <circle cx="50" cy="50" r="40" fill="#08D362" />
        <text
          x="50%"
          y="50%"
          dy="0.4em"
          fill="white"
          textAnchor="middle"
          fontSize="50"
        >
          +
        </text>
      </svg>
    </div>
  );
}

export default JoinTable;
