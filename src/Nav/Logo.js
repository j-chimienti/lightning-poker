import React from "react";
import { useHistory } from "react-router-dom";

export const LogoSymbol = ({ x, y, width, height }) => (
  <svg x={x} y={y} width={width} height={height} viewBox="0 0 90 110">
    <path
      d="M44.83 0c-.165.205-26.697 33.386-33.662 42.564C3.894 52.149 0
      60.906 0 70.828 0 83.78 10.5 94.28 23.448 94.28c8.195 0 14.41-5.113
      18.277-11.268.144-.225.616-.717 1.073-.717l-1.027 7.82c-2.62 13.815-14.94
      17.055-14.94 17.055v3.484h35.995v-3.484s-12.317-3.24-14.937-17.055l-1.027-7.82c.457
      0 .93.492 1.072.717 3.865 6.155 10.08 11.268 18.274 11.268 12.949
      0 23.45-10.5 23.45-23.453
      0-9.922-3.895-18.679-11.17-28.264-2.867-3.778-9.048-11.62-15.342-19.559l-14.393
      18.01h19.912l-10.022 8.029-35.98 28.812 20.113-28.48H24.854l29.554-37.364C49.218
      5.496 44.893.078 44.83 0z"
    />
  </svg>
);

function Logo() {
  let history = useHistory();

  return (
    <div
      onClick={event => {
        event.preventDefault();
        history.push("/");
      }}
      className="logo"
    >
      <LogoSymbol />
    </div>
  );
}

export default Logo;
