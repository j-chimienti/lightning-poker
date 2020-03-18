import React, { useState, useEffect } from "react";

function PlayerProgress() {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    // there is a transition-duration == AUTO_FOLD_DELAY == 25s
    setWidth(0);
  }, [width]);

  return (
    <div className="player-progress">
      <div
        className="bar"
        style={{
          width: `${width}%`
        }}
      ></div>
    </div>
  );
}

export default PlayerProgress;
