const lnService = require("ln-service");
const { REQUESTED_INVOICE, PENDING_INVOICE } = require("./types");

module.exports = async (db, lnd) => {
  const querySnap = await db
    .collection("invoices")
    .where("state", "==", REQUESTED_INVOICE)
    .limit(3)
    .get();

  if (querySnap.empty) return;

  for (let invoiceSnap of querySnap.docs) {
    let { tokens, profileId, descriptionHash } = invoiceSnap.data();
    tokens = Math.round(Number(tokens));

    const { request, id } = await new Promise((resolve, reject) =>
      lnd.default.addInvoice(
        {
          memo: descriptionHash ? "" : "https://lightning-poker.com [deposit]",
          description_hash: descriptionHash,
          value: tokens,
          expiry: 1000 * 60 * 60 * 3,
        },
        async (err, response) => {
          if (err) return reject(err);

          let request = response.payment_request;
          let { id } = await lnService.decodePaymentRequest({ lnd, request });
          resolve({ request, id });
        }
      )
    );

    // invoice is ready
    await invoiceSnap.ref.update({
      id,
      tokens,
      createdAt: new Date(),
      payment_request: request,
      state: PENDING_INVOICE,
    });

    console.log("[request]", profileId, tokens);
  }
};
