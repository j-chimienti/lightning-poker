const lnService = require("ln-service");
const {
  REQUESTED_PAYMENT,
  CONFIRMED_PAYMENT,
  ERROR_PAYMENT,
} = require("./types");

const MAX_FEE = 500; // sats [tokens]
const WITDHRAW_LOCK = 10 * 60 * 1000; // 10min in miliseconds
const MAX_WITHDRAWAL = 500000; // 500k max withdrawal limit

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
    if (!isNaN(Number(request))) {
      throw new Error("You need to paste Payment request here, not amount!");
    }

    let {
      tokens = 0,
      id,
      destination,
      is_expired,
    } = await lnService.decodePaymentRequest({ lnd, request });

    if (is_expired) {
      throw new Error(`Invoice expired`);
    }

    await db.runTransaction(
      async (tx) => {
        // load with write lock!
        const profileSnap = await tx.get(
          db.collection("profiles").doc(profileId)
        );
        let {
          balance = 0,
          withdrawLock = false,
          withdrawAt,
        } = profileSnap.data();

        console.log(
          "[withdraw] [attempt]",
          profileId,
          tokens,
          `(${balance})`,
          id
        );

        if (
          isNaN(balance) ||
          isNaN(tokens) ||
          typeof balance === "string" ||
          tokens <= 0 ||
          balance < tokens
        ) {
          throw new Error(
            `Invoice amount should be less than or equal to ${balance} satoshis`
          );
        }

        if (tokens > MAX_WITHDRAWAL) {
          throw new Error(
            `Invoice amount is too big. max ${
              MAX_WITHDRAWAL / 1000
            }k. You can withdraw more times if needed`
          );
        }

        if (withdrawLock) {
          throw new Error("This account is locked. Use contact to resolve");
        }

        if (withdrawAt && Date.now() < withdrawAt.toMillis() + WITDHRAW_LOCK) {
          throw new Error("You can withdraw once every 10 minutes");
          // ok do it!
        }

        const { secret, fee } = await Promise.race([
          new Promise((resolve) => {
            setTimeout(resolve, 1000 * 55, {
              secret: "timeout",
              fee: 0,
            });
          }),
          lnService.pay({
            lnd,
            request,
            max_fee: MAX_FEE,
          }),
        ]);

        // const { secret, fee } = await lnService.pay({
        //   lnd,
        //   request,
        //   max_fee: MAX_FEE,
        // });

        balance = balance - tokens - fee;

        tx.update(profileSnap.ref, { balance, withdrawAt: new Date() });
        tx.update(paymentSnap.ref, {
          confirmedAt: new Date(),
          state: CONFIRMED_PAYMENT,
          destination,
          tokens,
          fee,
          id,
          secret,
        });

        console.log("[withdraw] [success]", profileId, tokens, fee, id, secret);
      },
      { maxAttempts: 1 }
    );
  } catch (e) {
    //
    let error = "Withdraw error";

    if (Array.isArray(e)) {
      error = e[1];
    } else {
      if (e.message) error = e.message;
    }
    console.log("[error]", profileId, error);

    await paymentSnap.ref.update({
      state: ERROR_PAYMENT,
      error: String(error),
    });
  }
};
