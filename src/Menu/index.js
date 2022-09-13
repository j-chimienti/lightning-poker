import React, { useContext } from "react";
import Deposit from "../Deposit";
import Widhtdraw from "../Withdraw";
import { AppContext } from "../App";

import "./styles.scss";

function Menu() {
  let { profileId, balance, dispatch } = useContext(AppContext);
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
          <span>02e9abd50c0d0868eb8ae081dd01d885a</span>
          <span>395379c9a4c108a4565c81c45c9ca9d07</span>
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
        <div className="twitter-auth">
          <button
            onClick={() => {
              dispatch({
                type: "AUTH_WITH_TWITTER"
              });
            }}
          >
            Sign In With Twitter
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Menu;
