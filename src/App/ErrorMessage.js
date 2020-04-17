import React, { useContext } from "react";
import { AppContext, CLEAR_ERROR } from "../App";

function Attention() {
  return (
    <svg width="100" viewBox="0 0 1113 1000">
      <path
        d="M1113 920c0 26-9.17 45.833-27.5 59.5-18.33 13.667-40.83 20.5-67.5 20.5H95c-26.667 0-49.167-7-67.5-21S0
        945.333 0 920c0-20 6-40.333 18-61L479 55c22-36.667 48-55 78-55s55.333 18.333 76 55l462 805c12 21.333 18
        41.333 18 60zM626 409V263H487v146c0 9.333.667 18.167 2 26.5 1.333 8.333 3.167 17.667 5.5 28 2.333
        10.333 4.167 19.167 5.5 26.5l26 162h59l27-162c1.333-6.667 3.333-15.333 6-26s4.667-20.167
        6-28.5c1.333-8.333 2-17.167 2-26.5zm0 387c0-19.333-6.833-35.667-20.5-49-13.667-13.333-30.167-20-49.5-20-18.667 0-34.833
        6.667-48.5 20-13.667 13.333-20.5 29.667-20.5 49s6.833 35.833 20.5 49.5c13.667 13.667 29.833 20.5
        48.5 20.5 19.333 0 35.833-6.833 49.5-20.5 13.667-13.667 20.5-30.167 20.5-49.5z"
        fill="#fff"
      />
    </svg>
  );
}

function ErrorMessage({ message }) {
  let { dispatch } = useContext(AppContext);

  return (
    <div
      onClick={() => {
        dispatch({
          type: CLEAR_ERROR
        });
      }}
      className="error-message"
    >
      <div>
        <Attention />
      </div>
      <div>{message}</div>
    </div>
  );
}

export default ErrorMessage;
