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
          await db.runTransaction(async (tx) => {
            const profileSnap = await tx.get(
              db.collection("profiles").doc(profileId)
            );

            if (profileSnap.exists) {
              let { balance = 0 } = profileSnap.data();
              balance = balance + tokens;
              tx.update(profileSnap.ref, { balance });
              tx.update(invoiceSnap.ref, {
                tokens,
                secret,
                state: SETTLED_INVOICE,
              });

              console.log("[deposit]", profileId, tokens, id);
            }
          });

          // await invoiceSnap.ref.update({
          //   tokens,
          //   secret,
          //   state: SETTLED_INVOICE
          // });
          // const profileSnap = await db
          //   .collection("profiles")
          //   .doc(profileId)
          //   .get();
          // if (profileSnap.exists) {
          //   const { balance = 0 } = profileSnap.data();
          //   await profileSnap.ref.update({
          //     balance: balance + tokens
          //   });
          // }
          // console.log("[deposit]", profileId, tokens, secret);
        }
      }
    );
};
