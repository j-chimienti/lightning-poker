import React from "react";
import Chip from "./Chip";

function Stack({ value, amount }) {
  return (
    <div className="stack">
      {[...Array(amount)].map((e, i) => (
        <Chip value={value} key={i} />
      ))}
    </div>
  );
}

export default Stack;
