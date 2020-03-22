import React, { useState, useContext, createContext } from "react";
import PaymentRequestInput from "./PaymentRequestInput";
import WithdrawActions from "./WithdrawActions";
import WithdrawError from "./WithdrawError";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { AppContext } from "../App";
import Settled from "../Settled";
import firebase from "firebase/app";

import {
  REQUESTED_PAYMENT,
  CONFIRMED_PAYMENT,
  ERROR_PAYMENT
} from "../lib/types";

import "./styles.scss";

export const WithdrawContext = createContext();

function Withdraw() {
  const [payment_request, setPaymentRequest] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const { profileId, withdrawLock = false } = useContext(AppContext);

  let [{ state, error } = {}] = useDocumentData(
    paymentId &&
      firebase
        .firestore()
        .collection("payments")
        .doc(paymentId)
  );

  const clearWithdrawal = () => {
    setPaymentId(null);
    setPaymentRequest("");
  };

  const addPayment = async () => {
    const paymentRef = await firebase
      .firestore()
      .collection("payments")
      .add({
        payment_request,
        profileId,
        state: REQUESTED_PAYMENT
      });
    setPaymentId(paymentRef.id);
  };

  return (
    <WithdrawContext.Provider
      value={{
        payment_request,
        setPaymentRequest,
        paymentId,
        error,
        addPayment,
        clearWithdrawal,
        withdrawLock
      }}
    >
      <div className="withdraw">
        {state === CONFIRMED_PAYMENT ? (
          <>
            <Settled />
            <WithdrawActions />
          </>
        ) : state === ERROR_PAYMENT ? (
          <>
            <WithdrawError />
            <WithdrawActions />
          </>
        ) : (
          <PaymentRequestInput />
        )}
      </div>
    </WithdrawContext.Provider>
  );
}

export default Withdraw;
