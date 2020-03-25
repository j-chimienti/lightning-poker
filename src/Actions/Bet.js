import React, { useContext, useState, useEffect } from "react";
import { BET } from "../lib/types";
import dispatch from "../dispatch";
import { TableContext } from "../Table";
import ReactSlider from "react-slider";

function callOnly(me, players) {
  if (!me.allin && players) {
    if (
      Object.values(players).filter(player => player.allin).length ===
      Object.values(players).length - 1
    ) {
      return true;
    }
  }
  return false;
}

function Bet() {
  const {
    tableId,
    players,
    maxBet,
    betSum,
    pot,
    me = {},
    bigBlind: step
  } = useContext(TableContext);

  const { id: playerId, chips = 0, bet = 0 } = me;
  const [disabled, disable] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const amountToCall = maxBet - bet;

  let max = chips + bet;
  let min = maxBet * 2; // min bet is a double call
  if (min === 0) {
    min = step;
  }
  if (min > max) {
    min = max;
  }

  let potAmount = pot + betSum + min;
  if (potAmount > max) {
    potAmount = max;
  }

  useEffect(() => {
    setBetAmount(min);
  }, [min]);

  return (
    <div
      className={[
        "bet-control",
        maxBet > max || callOnly(me, players) ? "disabled" : ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        className="bet"
        disabled={disabled}
        onClick={async () => {
          let amount = betAmount - bet;
          try {
            disable(true);
            await dispatch({ type: BET, tableId, playerId, amount });
            disable(false);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div>{amountToCall === 0 ? "Bet" : "Raise To"}</div>
        <div>{betAmount}</div>
      </button>

      <div>
        <div className="bet-speed-actions">
          <button className="min" onClick={() => setBetAmount(min)}>
            min
          </button>
          <button
            className="half-pot"
            onClick={() => {
              let halfPot = Math.round(potAmount / 2);
              if (halfPot > min) {
                setBetAmount(halfPot);
              } else setBetAmount(min);
            }}
          >
            1/2
          </button>
          <button
            className="pot"
            onClick={() => {
              if (potAmount > min) {
                setBetAmount(potAmount);
              } else setBetAmount(min);
            }}
          >
            pot
          </button>
          <button onClick={() => setBetAmount(max)}>max</button>
        </div>
        <div className="bet-selector">
          <button
            className="min"
            onClick={() => {
              if (betAmount - step >= min) setBetAmount(betAmount - step);
            }}
          >
            -
          </button>
          <ReactSlider
            min={min}
            max={max}
            step={step}
            value={betAmount}
            className="slider"
            thumbClassName="thumb"
            onChange={value => {
              setBetAmount(value);
            }}
          />
          <button
            className="max"
            onClick={() => {
              if (betAmount + step <= max) setBetAmount(betAmount + step);
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
