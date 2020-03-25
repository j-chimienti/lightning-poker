import React, { useContext } from "react";
import Deposit from "../Deposit";
import Widhtdraw from "../Withdraw";
import { AppContext } from "../App";

import "./styles.scss";

function Menu() {
  let { profileId, balance } = useContext(AppContext);

  return (
    <aside className="menu">
      <div className="content">
        <h3>Balance</h3>
        <h4>{balance} sats</h4>
        <Deposit />
        <Widhtdraw />
        <div className="title">Account</div>
        <div className="info">{profileId}</div>
        <div className="title">Telegram</div>
        <div className="info">LNPoker</div>
        <div className="title">CONTACT</div>
        <div className="info">lightning-poker@protonmail.com</div>
      </div>
    </aside>
  );
}

export default Menu;
