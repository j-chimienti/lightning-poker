import React, { useContext } from "react";
import { WithdrawContext } from "./index";

function WithdrawError() {
  const { error } = useContext(WithdrawContext);
  return <div className="withdraw-error">{error}</div>;
}

export default WithdrawError;
