import React, { useContext } from "react";
import serverDispatch from "../dispatch";
import { JOIN } from "../lib/types";
import { AppContext } from "../App";
import { addHandler } from "../App/reducer";
import {
  POSITION_WIDTH,
  POSITION_HEIGHT,
  UPDATE_ACTIVE_STATE,
  PLAYER_JOINED,
  JOIN_CIRCLE_RADIUS
} from "./utils";

addHandler(PLAYER_JOINED, ({ position, tableId, profileId }, state) => {
  console.log(position);
});

addHandler(UPDATE_ACTIVE_STATE, ({ activePlayerId, activeTableId }) => {
  // update app state
  return { activePlayerId, activeTableId };
});

const Join = ({ position, tableId }) => {
  let { dispatch, profileId } = useContext(AppContext);

  return (
    <g
      className="join-table-new"
      onClick={async () => {
        let { error } = await serverDispatch({
          type: JOIN,
          tableId,
          profileId,
          position
        });
        if (!error)
          dispatch({
            type: PLAYER_JOINED,
            tableId,
            profileId,
            position
          });
      }}
    >
      <circle
        cx={POSITION_WIDTH / 2}
        cy={POSITION_HEIGHT / 2}
        r={JOIN_CIRCLE_RADIUS}
      />
      <text
        x="50%"
        y="50%"
        dy="0.4em"
        fill="white"
        textAnchor="middle"
        fontSize="30"
      >
        +
      </text>
    </g>
  );
};

export default Join;
