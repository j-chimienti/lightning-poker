import React, { useContext, useState } from "react";
import { FOLD, CALL, BET } from "../lib/types";
import dispatch from "./dispatch";
import { TableContext } from "./index";

function Actions() {
  const { tableId, maxBet, me = {} } = useContext(TableContext);
  const { id: playerId, active, bet: currentBet } = me;

  const [foldDisabled, setFoldDisabled] = useState(false);
  const [callDisabled, setCallDisabled] = useState(false);
  const [betDisabled, setBetDisabled] = useState(false);

  const canCheck = maxBet - currentBet === 0;
  const canBet = maxBet - currentBet === 0;

  return (
    <div className={`actions${active ? " active" : ""}`}>
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
    </div>
  );
}

export default Actions;
