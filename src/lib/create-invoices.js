const lnService = require("ln-service");

const REQUESTED_INVOICE = "requested";
const PENDING_INVOICE = "pending";

module.exports = async (db, lnd) => {
  const querySnap = await db
    .collection("invoices")
    .where("state", "==", REQUESTED_INVOICE)
    .limit(3)
    .get();

  if (querySnap.empty) return;

  for (let invoiceSnap of querySnap.docs) {
    let { tokens, profileId } = invoiceSnap.data();
    tokens = Math.round(Number(tokens));

    const { request, id } = await lnService.createInvoice({
      lnd,
      description: "https://lightning-poker.com [deposit]",
      tokens
    });

    // invoice is ready
    await invoiceSnap.ref.update({
      id,
      tokens,
      createdAt: new Date(),
      payment_request: request,
      state: PENDING_INVOICE
    });

    console.log("[request]", profileId, tokens);
  }
};
