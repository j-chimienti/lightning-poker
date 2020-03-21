import React from "react";

function validateTokens(amount) {
  const number = Number(amount);
  if (isNaN(number) || number <= 0 || number > 2000000) {
    return false;
  }
  return true;
}

function TokenInput({ tokens, invoiceId, setTokens, addInvoice }) {
  return (
    <div className="token-input">
      <input
        title="Enter amount in satoshis you want to deposit"
        placeholder="1..1M"
        type="text"
        value={tokens}
        onChange={e => {
          setTokens(e.target.value);
        }}
      />
      <button
        aria-label="Deposit satoshis"
        disabled={!validateTokens(tokens) || invoiceId}
        onClick={() => {
          if (validateTokens(tokens)) {
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
