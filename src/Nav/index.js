import React from "react";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import AlertsState from "./AlertsState";
import LeaveRoom from "./LeaveRoom";

import "./styles.scss";

function Nav() {
  return (
    <nav>
      <Logo />
      <h1>No Limit Texas Hold'em</h1>
      <LeaveRoom />
      <AlertsState />
      <MenuItem />
    </nav>
  );
}

export default Nav;
