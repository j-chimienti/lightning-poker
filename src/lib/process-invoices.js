const lnService = require("ln-service");
const PENDING_INVOICE = "pending";
const SETTLED_INVOICE = "settled";

module.exports = (db, lnd) => {
  lnService
    .subscribeToInvoices({ lnd })
    .on(
      "invoice_updated",
      async ({ id, is_confirmed, received, tokens, secret }) => {
        // locate invoice
        const querySnap = await db
          .collection("invoices")
          .where("id", "==", id)
          .limit(1)
          .get();

        if (querySnap.empty) return;

        let [invoiceSnap] = querySnap.docs;
        const { state, profileId } = invoiceSnap.data();

        if (state === PENDING_INVOICE && is_confirmed && received) {
          await invoiceSnap.ref.update({
            tokens,
            secret,
            state: SETTLED_INVOICE
          });
          const profileSnap = await db
            .collection("profiles")
            .doc(profileId)
            .get();
          if (profileSnap.exists) {
            const { balance = 0 } = profileSnap.data();
            await profileSnap.ref.update({
              balance: balance + tokens
            });
          }
          console.log(profileId, tokens, secret);
        }
      }
    );
};
