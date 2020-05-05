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
        <div className="info courier">{profileId}</div>
        <div className="title">Lightning Node</div>
        <div className="info courier">
          <span>03ad156742a9a9d0e82e0022f264d6857</span>
          <span>addfd534955d5e97de4a695bf8dd12af0</span>
        </div>
        <div className="title">CONTACT</div>
        <div className="info">
          <a href={`mailto:${process.env.REACT_APP_EMAIL}`}>Mail</a>
        </div>
        <div className="info">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.REACT_APP_TWITTER}`}
          >
            Twitter
          </a>
        </div>
        <div className="info">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.REACT_APP_TELEGRAM}`}
          >
            Telegram
          </a>
        </div>
        <div className="info">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.REACT_APP_GITHUB}`}
          >
            GitHub
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Menu;
