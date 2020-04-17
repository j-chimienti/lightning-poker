import React, { useContext } from "react";
import { AppContext } from "../App";
import { addHandler } from "../App/reducer";

const TOGGLE_ROOMS_VISIBILITY = "TOGGLE_ROOMS_VISIBILITY";

addHandler(TOGGLE_ROOMS_VISIBILITY, (action, state) => {
  let showRooms = !state.showRooms;
  return { showRooms };
});

function ToggleButton() {
  const { dispatch } = useContext(AppContext);

  return (
    <svg
      className="toggle-games"
      width="25"
      height="50"
      viewBox="0 0 25 50"
      onClick={() => {
        dispatch({
          type: TOGGLE_ROOMS_VISIBILITY,
        });
      }}
    >
      <path
        d="M0 50.0058C13.8635 49.682 25 38.6131 25 25.0058C25 11.3986 13.8635 0.329682 0 0.00583267V50.0058Z"
        fill="rgba(0,0,0,0.5)"
      />
      <path
        className="chevron"
        d="M4.41 19L3 20.41L7.58 25L3 29.59L4.41 31L10.41 25L4.41 19Z"
        fill="white"
      />
    </svg>
  );
}

export default ToggleButton;
