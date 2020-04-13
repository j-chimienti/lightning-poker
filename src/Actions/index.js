import React, { useContext } from "react";
import Fold from "./Fold";
import Call from "./Call";
import Bet from "./Bet";
import "./styles.scss";
import { RoomContext } from "../Room";

function Actions() {
  let { me: { active } = {} } = useContext(RoomContext);

  return (
    <div className={`actions${active ? " active" : ""}`}>
      <div className="fold-call">
        <Fold />
        <Call />
      </div>
      <Bet />
    </div>
  );
}

export default Actions;
