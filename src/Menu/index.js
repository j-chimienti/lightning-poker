import React from "react";
import Deposit from "../Deposit";
import Widhtdraw from "../Withdraw";

import "./styles.scss";

function Menu() {
  return (
    <aside className="menu">
      <div className="content">
        <Deposit />
        <Widhtdraw />
      </div>
    </aside>
  );
}

export default Menu;
