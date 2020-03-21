import React, { useState, useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { AppContext } from "../App";
import QR from "./QR";
import Settled from "./Settled";
import TokenInput from "./TokenInput";
import DepositActions, { ClearDeposit } from "./DepositActions";

import firebase from "firebase/app";

const REQUESTED_INVOICE = "requested";
const SETTLED_INVOICE = "settled";

function Deposit() {
  const [invoiceId, setInvoiceId] = useState(null);
  const [tokens, setTokens] = useState("");
  const { profileId } = useContext(AppContext);

  let [{ payment_request, state } = {}] = useDocumentData(
    invoiceId &&
      firebase
        .firestore()
        .collection("invoices")
        .doc(invoiceId)
  );

  function clearDeposit() {
    setTokens("");
    setInvoiceId(null);
  }

  async function addInvoice() {
    const invoiceRef = await firebase
      .firestore()
      .collection("invoices")
      .add({
        tokens: Math.floor(Number(tokens)),
        profileId,
        state: REQUESTED_INVOICE
      });
    setInvoiceId(invoiceRef.id);
  }

  return (
    <div className="deposit">
      {payment_request ? (
        state === SETTLED_INVOICE ? (
          <>
            <Settled />
            <ul className="deposit-actions">
              <ClearDeposit clearDeposit={clearDeposit} />
            </ul>
          </>
        ) : (
          <>
            <QR value={payment_request} />
            <DepositActions
              paymentRequest={payment_request}
              clearDeposit={clearDeposit}
            />
          </>
        )
      ) : (
        <TokenInput
          tokens={tokens}
          invoiceId={invoiceId}
          setTokens={setTokens}
          addInvoice={addInvoice}
        />
      )}
    </div>
  );
}

export default Deposit;
