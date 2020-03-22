import React, { useState, useContext, createContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { AppContext } from "../App";
import QR from "./QR";
import Settled from "../Settled";
import TokenInput from "./TokenInput";
import DepositActions from "./DepositActions";
import firebase from "firebase/app";
import { REQUESTED_INVOICE, SETTLED_INVOICE } from "../lib/types";

import "./styles.scss";

export const DepositContext = createContext();

function Deposit() {
  const [invoiceId, setInvoiceId] = useState(null);
  const [amount, setAmount] = useState("");
  const { profileId } = useContext(AppContext);

  let [{ payment_request: request, state } = {}] = useDocumentData(
    invoiceId &&
      firebase
        .firestore()
        .collection("invoices")
        .doc(invoiceId)
  );

  function clearDeposit() {
    setAmount("");
    setInvoiceId(null);
  }

  async function addInvoice() {
    const invoiceRef = await firebase
      .firestore()
      .collection("invoices")
      .add({
        tokens: Math.floor(Number(amount)),
        profileId,
        state: REQUESTED_INVOICE
      });
    setInvoiceId(invoiceRef.id);
  }

  return (
    <DepositContext.Provider
      value={{
        state,
        invoiceId,
        request,
        amount,
        clearDeposit,
        addInvoice,
        setAmount
      }}
    >
      <div className="deposit">
        {request ? (
          <>
            {state === SETTLED_INVOICE ? <Settled /> : <QR value={request} />}
            <DepositActions />
          </>
        ) : (
          <TokenInput />
        )}
      </div>
    </DepositContext.Provider>
  );
}

export default Deposit;
