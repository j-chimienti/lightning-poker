import React, { useContext, useEffect } from "react";
import Clipboard from "clipboard";
import { DepositContext } from "./index";
import { PENDING_INVOICE } from "../lib/types";

function DepositActions() {
  const { clearDeposit, state, request } = useContext(DepositContext);

  useEffect(() => {
    // executed only once
    console.log("ONCE");
    new Clipboard("#copy-payment-request");
  }, []);

  return (
    <ul className="deposit-actions">
      {state === PENDING_INVOICE && (
        <>
          <li>
            <a href={`lightning:${request}`}>Open in Wallet</a>
          </li>
          <li id="copy-payment-request" data-clipboard-text={request}>
            Copy Payment Request to Clipboard
          </li>
        </>
      )}
      <li onClick={clearDeposit}>New Deposit</li>
    </ul>
  );
}

export default DepositActions;
