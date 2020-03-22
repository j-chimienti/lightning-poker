import React, { useContext } from "react";
import { DepositContext } from "./index";

function validateTokens(amount) {
  const number = Number(amount);
  if (isNaN(number) || number <= 0 || number > 2000000) {
    return false;
  }
  return true;
}

function TokenInput() {
  const { amount, invoiceId, setAmount, addInvoice } = useContext(
    DepositContext
  );

  return (
    <div className="token-input">
      <input
        title="Enter amount in satoshis you want to deposit"
        placeholder="1..1M"
        type="text"
        value={amount}
        onChange={e => {
          setAmount(e.target.value);
        }}
      />
      <button
        aria-label="Deposit satoshis"
        disabled={!validateTokens(amount) || invoiceId}
        onClick={() => {
          if (validateTokens(amount)) {
            addInvoice();
          }
        }}
      >
        Deposit
      </button>
    </div>
  );
}

export default TokenInput;
