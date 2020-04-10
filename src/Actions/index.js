import React, { useContext } from "react";
import Fold from "./Fold";
import Call from "./Call";
import Bet from "./Bet";
import "./styles.scss";
import { RoomContext } from "../Room";

function Actions() {
  let { me: { active } = {} } = useContext(RoomContext);
  // active = true;

  return (
    <div className={`actions${active ? " active" : ""}`}>
      <div className="left">
        <Fold />
        <Call />
      </div>
      <div className="right">
        <Bet />
      </div>
    </div>
  );
}

export default Actions;
