import React from "react";
import { QRCode } from "react-qr-svg";

const QR = ({ value = "" }) => (
  <a
    className="payment-request"
    href={`lightning:${value}`}
    // target="_blank"
    // rel="noopener noreferrer"
  >
    <QRCode bgColor="#FFFFFF" fgColor="#000000" value={value} />
  </a>
);

export default QR;
