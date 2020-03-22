import React, { useContext } from "react";
import { WithdrawContext } from "./index";

const validateWithdraw = paymentRequest => {
  if (String(paymentRequest).length > 0) return true;
  return false;
};

function PaymentRequestInput() {
  const {
    withdrawLock,
    payment_request,
    paymentId,
    addPayment,
    setPaymentRequest
  } = useContext(WithdrawContext);

  return (
    <div className="payment-request-input">
      <input
        title="Paste Lightning Network Payment Request here"
        placeholder="payment_request"
        type="text"
        value={payment_request}
        onChange={e => {
          let paymentRequest = String(e.target.value).substring(0, 1000);
          setPaymentRequest(paymentRequest);
        }}
      />
      <button
        aria-label="Deposit satoshis"
        disabled={
          !validateWithdraw(payment_request) || paymentId || withdrawLock
        }
        onClick={() => {
          if (validateWithdraw(payment_request)) {
            addPayment();
          }
        }}
      >
        Withdraw
      </button>
    </div>
  );
}

export default PaymentRequestInput;
