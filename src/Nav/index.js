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
      <LeaveRoom />
      <AlertsState />
      <MenuItem />
    </nav>
  );
}

export default Nav;
