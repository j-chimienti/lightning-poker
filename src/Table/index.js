import React from "react";
import Body from "./body";
import "./styles.scss";

function Table() {
  return (
    <div className="table">
      <Body />
    </div>
  );
}

function handleWindowSize() {
  if (window.innerHeight > window.innerWidth) {
    document.body.classList.add("vertical-layout");
  } else document.body.classList.remove("vertical-layout");
}

handleWindowSize();
window.onresize = handleWindowSize;

export default Table;
