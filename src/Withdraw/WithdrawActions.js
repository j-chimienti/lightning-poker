import React, { useContext } from "react";
import { WithdrawContext } from "./index";

function WithdrawActions() {
  const { clearWithdrawal } = useContext(WithdrawContext);

  return (
    <ul className="withdraw-actions">
      <li onClick={clearWithdrawal}>New Withdrawal</li>
    </ul>
  );
}

export default WithdrawActions;
