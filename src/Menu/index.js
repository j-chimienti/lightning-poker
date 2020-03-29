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
        <div className="title">CONTACT</div>
        <div className="info">
          <a href="mailto:lightning-poker@protonmail.com">Mail</a>
        </div>
        <div className="info">
          <a href="https://twitter.com/BitcoinLNPoker">Twitter</a>
        </div>
        <div className="info">
          <a href="https://t.me/LightningPoker">Telegram</a>
        </div>
        <div className="info">
          <a href="https://github.com/igreshev/lightning-poker">GitHub</a>
        </div>
      </div>
    </aside>
  );
}

export default Menu;
