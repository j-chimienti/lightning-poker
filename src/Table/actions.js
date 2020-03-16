import React, { useContext, useState } from "react";
import { FOLD, CALL, BET, ALLIN } from "../lib/types";
import dispatch from "./dispatch";
import { TableContext } from "./index";

function Actions({ id: playerId, active, bet: currentBet }) {
  const { tableId, maxBet } = useContext(TableContext);

  const [foldDisabled, setFoldDisabled] = useState(false);
  const [callDisabled, setCallDisabled] = useState(false);
  const [betDisabled, setBetDisabled] = useState(false);
  const [allInDisabled, setAllInDisabled] = useState(false);

  const canCheck = maxBet - currentBet === 0;
  const canBet = maxBet - currentBet === 0;

  return (
    <div className="actions">
      <button
        className="pill all-in"
        disabled={!active || allInDisabled}
        onClick={async () => {
          try {
            setAllInDisabled(true);
            await dispatch({ type: ALLIN, tableId, playerId });
            setAllInDisabled(false);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        All-In
      </button>
      <button
        className="pill bet"
        disabled={!active || betDisabled}
        onClick={async () => {
          try {
            setBetDisabled(true);
            await dispatch({ type: BET, tableId, playerId, amount: 200 });
            setBetDisabled(false);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {canBet ? "Bet" : "Raise"}
      </button>
      <button
        className="pill call"
        disabled={!active || callDisabled}
        onClick={async () => {
          try {
            setCallDisabled(true);
            await dispatch({ type: CALL, tableId, playerId });
            setCallDisabled(false);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {canCheck ? "Check" : "Call"}
      </button>
      <button
        className="pill fold"
        disabled={!active || foldDisabled}
        onClick={async () => {
          try {
            setFoldDisabled(true);
            await dispatch({ type: FOLD, tableId, playerId });
            setFoldDisabled(false);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Fold
      </button>
    </div>
  );
}

export default Actions;
