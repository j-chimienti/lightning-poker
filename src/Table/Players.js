import React from "react";
import JoinTable from "./JoinTable";

function Players() {
  return (
    <div className="players">
      <JoinTable position={1} />
      <JoinTable position={2} />
    </div>
  );
}

export default Players;
