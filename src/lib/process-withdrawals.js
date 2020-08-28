const lnService = require("ln-service");
const {
  REQUESTED_PAYMENT,
  CONFIRMED_PAYMENT,
  ERROR_PAYMENT
} = require("./types");

const MAX_FEE = 49; // sats [tokens]

module.exports = async (db, lnd) => {
  const querySnap = await db
    .collection("payments")
    .where("state", "==", REQUESTED_PAYMENT)
    .limit(1)
    .get();

  if (querySnap.empty) return;

  let paymentSnap = querySnap.docs[0];

  const { profileId, payment_request: request } = paymentSnap.data();

  try {
    let {
      tokens = 0,
      id,
      destination,
      is_expired
    } = await lnService.decodePaymentRequest({ lnd, request });

    if (is_expired) {
      throw new Error(`invoice expired.`);
    }

    await db.runTransaction(async tx => {
      // load with write lock!
      const profileSnap = await tx.get(
        db.collection("profiles").doc(profileId)
      );
      let { balance = 0, withdrawLock = false } = profileSnap.data();

      if (
        isNaN(balance) ||
        isNaN(tokens) ||
        typeof balance === "string" ||
        tokens <= 0 ||
        balance < tokens
      ) {
        throw new Error(
          `invoice amount should be less than or equal to ${balance} satoshis`
        );
      }

      if (tokens > 250000) {
        throw new Error(
          `invoice amount is too big. max 250k. You can withdraw more times if needed`
        );
      }

      if (withdrawLock) {
        throw new Error("this account is locked. Use contact to resolve");
      }

      const { secret, fee } = await lnService.pay({
        lnd,
        request,
        max_fee: MAX_FEE
      });

      balance = balance - tokens - fee;

      tx.update(profileSnap.ref, { balance });
      tx.update(paymentSnap.ref, {
        confirmedAt: new Date(),
        state: CONFIRMED_PAYMENT,
        destination,
        tokens,
        id,
        fee,
        secret
      });

      console.log("[withdraw]", profileId, tokens, fee, secret);
    });
  } catch (e) {
    //
    let error = "";
    try {
      error = e.toString().substring(0, 100);
    } catch (e) {}

    console.log("[error]", profileId, error);

    await paymentSnap.ref.update({
      state: ERROR_PAYMENT,
      error
    });
  }
};
