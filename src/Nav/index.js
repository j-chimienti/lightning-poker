import React from "react";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import AlertsState from "./AlertsState";
import "./styles.scss";

function Nav() {
  return (
    <nav>
      <Logo />
      <AlertsState />
      <MenuItem />
    </nav>
  );
}

export default Nav;
