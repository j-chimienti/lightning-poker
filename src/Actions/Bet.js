import React, { useContext, useState } from "react";
import { BET } from "../lib/types";
import dispatch from "../dispatch";
import { TableContext } from "../Table";
import ReactSlider from "react-slider";

function Bet() {
  const { tableId, maxBet, betSum, me = {}, bigBlind: step } = useContext(
    TableContext
  );

  const { chips: max } = me;
  const { id: playerId, bet: currentBet } = me;
  const [disabled, disable] = useState(false);
  const [amount, setBetAmount] = useState(200);

  const min = 200;

  const canBet = maxBet - currentBet === 0;
  console.log(maxBet, betSum);

  return (
    <div className="bet-control">
      <button
        className="bet"
        disabled={disabled}
        onClick={async () => {
          try {
            disable(true);
            await dispatch({ type: BET, tableId, playerId, amount });
            disable(false);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div>{canBet ? "Bet" : "Raise To"}</div>
        <div>{amount}</div>
      </button>

      <div>
        <div className="bet-speed-actions">
          <button onClick={() => setBetAmount(min)}>min</button>
          <button>3BB</button>
          <button>pot</button>
          <button onClick={() => setBetAmount(max)}>max</button>
        </div>
        <div className="bet-selector">
          <button
            onClick={() => {
              if (amount - step >= min) setBetAmount(amount - step);
            }}
          >
            -
          </button>
          <ReactSlider
            min={min}
            max={max}
            step={step}
            value={amount}
            className="slider"
            thumbClassName="thumb"
            trackClassName="example-track"
            onChange={value => {
              setBetAmount(value);
            }}
          />
          <button
            onClick={() => {
              if (amount + step <= max) setBetAmount(amount + step);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bet;
