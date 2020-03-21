import React from "react";
// import Clipboard from "clipboard";

export function ClearDeposit({ clearDeposit }) {
  return <li onClick={clearDeposit}>New Deposit</li>;
}

function DepositActions({ clearDeposit, paymentRequest }) {
  return (
    <ul className="deposit-actions">
      <li>
        <a href={`lightning:${paymentRequest}`}>Open in Wallet</a>
      </li>
      <li id="copy-payment-request" data-clipboard-text={paymentRequest}>
        "Copy Payment Request to Clipboard"
      </li>
      <ClearDeposit clearDeposit={clearDeposit} />
    </ul>
  );
}

export default DepositActions;
