import React, { useContext } from "react";
import JoinTable from "./JoinTable";
import LeaveTable from "./LeaveTable";
import { TableContext } from "./index";

function Players() {
  const { players, me } = useContext(TableContext);
  console.log(players);

  return (
    <div className="players">
      {me && <LeaveTable />}
      <JoinTable position={1} />
      <JoinTable position={2} />
    </div>
  );
}

export default Players;
