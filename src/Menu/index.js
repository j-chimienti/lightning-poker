import React from "react";
import Deposit from "../Deposit";

import "./styles.scss";

function Menu() {
  return (
    <aside className="menu">
      <div className="content">
        <Deposit />
      </div>
    </aside>
  );
}

export default Menu;
