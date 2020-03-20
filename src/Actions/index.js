import React, { useContext } from "react";
import { TableContext } from "../Table/index";
import "./styles.scss";

import Fold from "./Fold";
import Call from "./Call";
import Bet from "./Bet";

function Actions() {
  const { me: { active } = {} } = useContext(TableContext);

  return (
    <div className={`actions${active ? " active" : ""}`}>
      <Fold />
      <Call />
      <Bet />
    </div>
  );
}

export default Actions;
