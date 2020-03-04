const {
  JOIN,
  LEAVE,
  READY,
  WAITING,
  PRE_FLOP,
  FLOP,
  TURN,
  RIVER,
  SHOWDOWN,
  CALL,
  FOLD,
  ALLIN,
  BET,
  DEAL,
  CALLED,
  CHECKED,
  FOLDED,
  BETTED,
  RAISED,
  SITTING
} = require("./types");

const game = require("./texas-holdem");

test("#1", () => {
  let p1 = {
    position: 1,
    state: READY,
    chips: 100
  };

  let p2 = {
    position: 3,
    state: READY,
    chips: 100
  };

  let t = {
    minPlayers: 3,
    round: WAITING,
    smallBlind: 10,
    bigBlind: 20,
    rake: 0
  };

  game(t, [p1, p2], {
    type: JOIN
  });
  expect(t.round).toEqual(WAITING);
});

test("round bets", () => {
  let p1 = {
    position: 1,
    state: READY,
    chips: 100,
    accountId: "p1-acc"
  };

  let p2 = {
    position: 3,
    state: READY,
    chips: 100,
    accountId: "p2-acc"
  };

  let p3 = {
    position: 7,
    state: READY,
    chips: 100,
    accountId: "p3-acc"
  };

  let t = {
    minPlayers: 3,
    round: WAITING,
    smallBlind: 10,
    bigBlind: 20,
    rake: 0
  };

  let p = [p1, p2, p3];

  game(t, p, {
    type: JOIN,
    seed: 8544783345
  });

  game(t, p, { type: CALL });
  game(t, p, { type: FOLD });
  game(t, p, { type: FOLD });

  expect(p1.chips).toEqual(80);
  expect(p2.chips).toEqual(130);
  expect(p3.chips).toEqual(90);
});

test.skip("#2", () => {
  let p1 = {
    position: 1,
    state: READY,
    chips: 300,
    accountId: "p1-acc"
  };

  let p2 = {
    position: 3,
    state: READY,
    chips: 300,
    accountId: "p2-acc"
  };

  let p3 = {
    position: 7,
    state: READY,
    chips: 300,
    accountId: "p3-acc"
  };

  let t = {
    minPlayers: 2,
    round: WAITING,
    smallBlind: 10,
    bigBlind: 20
  };

  let p = [p1, p2, p3];

  game(t, p, {
    type: JOIN,
    seed: 8544783345
  });

  expect(t.dealer).toEqual(3);
  expect(t.pot).toEqual(0);
  expect(t.flopIndex).toEqual(p.length * 2);
  expect(t.round).toEqual(PRE_FLOP);
  expect(t.cards).toEqual([]);

  // p1 is small blind
  expect(p1.chips).toEqual(280);
  expect(p1.bet).toEqual(20);
  expect(p1.active).toEqual(false);

  // p2 is the dealer
  // chips should be full (100)
  expect(p2.chips).toEqual(300);
  expect(p2.active).toEqual(true);

  // p1 is small blind
  expect(p3.chips).toEqual(290);
  expect(p3.bet).toEqual(10);
  expect(p3.active).toEqual(false);

  // expect all not to talked
  p.forEach(p => expect(p.talked).toEqual(false));

  // p2 calls
  game(t, p, {
    type: CALL
  });

  expect(t.round).toEqual(PRE_FLOP);
  expect(t.pot).toEqual(0);
  expect(p2.talked).toEqual(true);
  expect(p2.state).toEqual(CALLED);
  expect(p2.bet).toEqual(20);

  expect(p1.active).toEqual(false);
  expect(p3.active).toEqual(true);

  // p3 calls
  game(t, p, { type: CALL });
  expect(t.round).toEqual(PRE_FLOP);
  expect(t.pot).toEqual(0);
  expect(p3.talked).toEqual(true);
  expect(p3.state).toEqual(CALLED);
  expect(p3.bet).toEqual(20);

  expect(p1.active).toEqual(true);
  expect(p2.active).toEqual(false);
  expect(p3.active).toEqual(false);

  // p1 calls
  game(t, p, { type: CALL });
  expect(t.round).toEqual(FLOP);
  p.forEach(p => expect(p.talked).toEqual(false));
  expect(p1.state).toEqual(CALLED);
  expect(p2.state).toEqual(CALLED);
  expect(p3.state).toEqual(CALLED);
  expect(t.pot).toEqual(60);

  expect(p1.active).toEqual(false);
  expect(p2.active).toEqual(false);
  // p3 is next to the dealer,
  // new round should talk first
  expect(p3.active).toEqual(true);

  // p3 calls again, round = FLOP
  game(t, p, { type: FOLD });

  expect(p1.active).toEqual(true);
  expect(p2.active).toEqual(false);
  expect(p3.active).toEqual(false);
  expect(p3.talked).toEqual(true);
  expect(p3.state).toEqual(FOLDED);
  expect(p3.bet).toEqual(0);

  // p1 is active
  // p1 is checking
  game(t, p, { type: CALL });

  expect(p1.active).toEqual(false);
  expect(p2.active).toEqual(true);
  expect(p3.active).toEqual(false);
  expect(p2.bet).toEqual(0);
  expect(p3.bet).toEqual(0);

  // p2 is active
  game(t, p, { type: CALL });
  // new turn, because p3 is folded
  expect(t.round).toEqual(TURN);
  // talked, because has FLODED
  expect(p3.talked).toEqual(true);
  expect(p1.talked).toEqual(false);
  expect(p2.talked).toEqual(false);

  // pot is still 60, p1,p2 -> checked p3 -> folded
  expect(t.pot).toEqual(60);
  expect(p3.state).toEqual(FOLDED);
  expect(p1.state).toEqual(CHECKED);
  expect(p2.state).toEqual(CHECKED);
  expect(p1.bet).toEqual(0);
  expect(p2.bet).toEqual(0);
  expect(p3.bet).toEqual(0);

  expect(p1.active).toEqual(true);
  expect(p2.active).toEqual(false);
  expect(p3.active).toEqual(false);

  // p1 bets 20
  game(t, p, { type: BET, amount: 20 });
  //
  expect(p1.active).toEqual(false);
  expect(p2.active).toEqual(true);
  expect(p3.active).toEqual(false);

  expect(p1.bet).toEqual(20);
  expect(p1.chips).toEqual(260);

  expect(p1.talked).toEqual(true);
  expect(p2.talked).toEqual(false);
  // folded, talked is true
  expect(p3.talked).toEqual(true);

  // p2 raises to 40
  game(t, p, { type: BET, amount: 40 });

  expect(p1.talked).toEqual(true);
  expect(p2.talked).toEqual(true);
  // folded, talked is true
  expect(p3.talked).toEqual(true);

  // still turn
  expect(t.round).toEqual(TURN);
  expect(p1.active).toEqual(true);
  expect(p2.active).toEqual(false);

  // p1 raises to 80 (bet more 40)
  game(t, p, { type: BET, amount: 80 });

  // still TURN
  expect(t.round).toEqual(TURN);
  expect(p1.active).toEqual(false);
  expect(p2.active).toEqual(true);
  expect(p1.bet).toEqual(100);
  expect(p1.chips).toEqual(180);

  // close this round,
  // p2 calls!
  game(t, p, { type: CALL });

  expect(t.round).toEqual(RIVER);
  expect(p1.talked).toEqual(false);
  expect(p2.talked).toEqual(false);

  expect(p1.active).toEqual(true);
  expect(p2.active).toEqual(false);
  expect(t.pot).toEqual(260);

  // p1 bets 60
  game(t, p, { type: BET, amount: 60 });
  expect(p1.state).toEqual(BETTED);
  expect(p1.bet).toEqual(60);
  expect(p1.chips).toEqual(120);
  expect(p2.active).toEqual(true);

  // p2 raies to 80
  game(t, p, { type: BET, amount: 80 });
  expect(p2.state).toEqual(RAISED);

  // p1 calls
  expect(p1.active).toEqual(true);
  game(t, p, { type: CALL });
  expect(t.round).toEqual(SHOWDOWN);

  expect(p1.active).toEqual(false);
  // expect(p2.active).toEqual(false);
  expect(p3.active).toEqual(false);

  // transfer pot to winners, should be 0
  expect(t.pot).toEqual(0);

  expect(p1.chips).toEqual(310);
  expect(p2.chips).toEqual(310);

  expect(p1.winner).toEqual(true);
  expect(p1.winner).toEqual(true);

  // new hand
  game(t, p, {
    type: DEAL
  });

  expect(t.round).toEqual(PRE_FLOP);
  expect(t.pot).toEqual(0);
  expect(t.cards).toEqual([]);

  p.forEach(p => expect(p.state).toEqual(READY));

  // now p3 is dealer
  expect(p3.position).toEqual(t.dealer);
  // after blinds
  expect(p3.active).toEqual(true);

  // all but last fold's

  // p3 folds first
  game(t, p, {
    type: FOLD
  });

  expect(p1.active).toEqual(true);
  expect(p2.chips).toEqual(290);

  // p1 folds as well
  game(t, p, { type: FOLD });

  // p2 is winner, because is the only one left
  // +20 from pot, and -10 for smallblind
  expect(p2.chips).toEqual(320);
  expect(p2.bet).toEqual(0);
  // p3 is BB
  expect(p3.bet).toEqual(20);

  expect(t.round).toEqual(PRE_FLOP);
  expect(t.pot).toEqual(0);
  expect(t.cards).toEqual([]);

  p.forEach(p => expect(p.state).toEqual(READY));

  // now p3 is dealer
  expect(p1.position).toEqual(t.dealer);
  // after blinds
  expect(p1.active).toEqual(true);
  expect(t.round).toEqual(PRE_FLOP);

  // add one sitting player
  // he should be treated as folded until next hand

  let p4 = {
    position: 5,
    state: SITTING,
    chips: 666,
    accountId: "p4-acc"
  };

  // call action add
  p.push(p4);
  game(t, p, {
    type: JOIN
  });

  // p1 is active, p1 calls
  game(t, p, { type: CALL });

  expect(p2.active).toEqual(true);
  // p2 calls too
  game(t, p, { type: CALL });

  expect(p3.active).toEqual(true);
  expect(p4.active).toEqual(false);

  // p3 calls (checks)
  game(t, p, { type: CALL });

  expect(t.round).toEqual(FLOP);

  // p2 calls, p2 is nex to dealer
  game(t, p, { type: CALL });
  // p3 calls
  game(t, p, { type: CALL });
  // p1 calls
  game(t, p, { type: CALL });

  expect(t.round).toEqual(TURN);

  let p5 = {
    position: 10,
    state: SITTING,
    chips: 999,
    accountId: "p5-acc"
  };
  p.push(p5);

  expect(p2.active).toEqual(true);
  game(t, p, { type: CALL });
  expect(p3.active).toEqual(true);
  game(t, p, { type: CALL });
  expect(p1.active).toEqual(true);
  game(t, p, { type: CALL });
  expect(t.round).toEqual(RIVER);

  expect(p2.active).toEqual(true);
  game(t, p, { type: CALL });
  expect(p3.active).toEqual(true);
  game(t, p, { type: CALL });
  expect(p1.active).toEqual(true);
  game(t, p, { type: CALL });
  expect(t.round).toEqual(SHOWDOWN);
});

// exequo seed
// 8544783345

test("rake", () => {
  let p1 = {
    position: 1,
    state: READY,
    chips: 100,
    accountId: "p1-acc"
  };

  let p2 = {
    position: 3,
    state: READY,
    chips: 100,
    accountId: "p2-acc"
  };

  let p3 = {
    position: 7,
    state: READY,
    chips: 100,
    accountId: "p3-acc"
  };

  let t = {
    minPlayers: 3,
    round: WAITING,
    smallBlind: 10,
    bigBlind: 20,
    rake: 2.5
  };

  let p = [p1, p2, p3];

  game(t, p, {
    type: JOIN,
    seed: 8544783344
  });

  game(t, p, { type: CALL });
  game(t, p, { type: CALL });
  game(t, p, { type: CALL });

  expect(t.rake).toEqual(2.5);
  expect(t.pot).toEqual(60);

  game(t, p, { type: BET, amount: 20 });
  game(t, p, { type: CALL });
  game(t, p, { type: CALL });

  expect(t.pot).toEqual(120);
  expect(t.round).toEqual(TURN);

  game(t, p, { type: BET, amount: 30 });
  game(t, p, { type: CALL });
  game(t, p, { type: CALL });

  expect(t.pot).toEqual(210);
  expect(t.round).toEqual(RIVER);

  expect(p1.chips).toEqual(30);
  expect(p2.chips).toEqual(30);
  expect(p3.chips).toEqual(30);

  game(t, p, { type: BET, amount: 10 });
  game(t, p, { type: CALL });
  game(t, p, { type: CALL });

  expect(p1.chips).toEqual(254);
  expect(p2.chips).toEqual(20);
  expect(p3.chips).toEqual(20);
});

test("all-in #1", () => {
  let p1 = {
    position: 1,
    state: READY,
    chips: 100,
    accountId: "p1-acc"
  };

  let p2 = {
    position: 5,
    state: READY,
    chips: 200,
    accountId: "p2-acc"
  };

  let p3 = {
    position: 7,
    state: READY,
    chips: 450,
    accountId: "p3-acc"
  };

  let t = {
    minPlayers: 3,
    round: WAITING,
    smallBlind: 10,
    bigBlind: 20,
    rake: 0
  };

  let p = [p1, p2, p3];

  game(t, p, {
    type: JOIN,
    seed: 8544783340
  });

  expect(t.round).toEqual(PRE_FLOP);

  game(t, p, { type: ALLIN });

  expect(p2.chips).toEqual(0);
  expect(p2.allin).toEqual(true);
  expect(p2.talked).toEqual(true);

  expect(p3.active).toEqual(true);
  expect(t.round).toEqual(PRE_FLOP);

  game(t, p, { type: ALLIN });

  expect(p3.chips).toEqual(0);
  expect(p3.allin).toEqual(true);
  expect(p3.talked).toEqual(true);

  expect(p1.active).toEqual(true);
  expect(t.round).toEqual(PRE_FLOP);

  game(t, p, { type: ALLIN });

  expect(p1.chips).toEqual(0);
  expect(p1.allin).toEqual(true);
  expect(p1.talked).toEqual(true);

  // all chips are assigned back
  expect(t.pot).toEqual(0);

  expect(p1.chips).toEqual(0);
  expect(p2.chips).toEqual(500);
  expect(p3.chips).toEqual(250);
});

test("all-in, blinds", () => {
  let p1 = {
    position: 1,
    state: READY,
    chips: 30,
    accountId: "p1-acc"
  };

  let p2 = {
    position: 5,
    state: READY,
    chips: 40,
    accountId: "p2-acc"
  };

  let p3 = {
    position: 7,
    state: READY,
    chips: 50,
    accountId: "p3-acc"
  };

  let t = {
    minPlayers: 3,
    round: WAITING,
    smallBlind: 100,
    bigBlind: 200,
    rake: 0
  };

  let p = [p1, p2, p3];

  game(t, p, {
    type: JOIN,
    seed: 8544783340
  });

  expect(t.round).toEqual(PRE_FLOP);

  game(t, p, { type: CALL });

  expect(t.round).toEqual(SHOWDOWN);
  expect(t.pot).toEqual(0);
});

test("all-in, after one wins, second should go sitting", () => {
  let p1 = {
    position: 1,
    state: READY,
    chips: 100,
    accountId: "p1-acc"
  };

  let p2 = {
    position: 5,
    state: READY,
    chips: 200,
    accountId: "p2-acc"
  };

  let t = {
    minPlayers: 2,
    round: WAITING,
    smallBlind: 10,
    bigBlind: 20,
    rake: 0
  };

  let p = [p1, p2];

  game(t, p, {
    type: JOIN,
    seed: 8544783340
  });

  game(t, p, { type: ALLIN });
  game(t, p, { type: ALLIN });

  expect(t.round).toEqual(SHOWDOWN);

  // // new hand
  game(t, p, {
    type: DEAL
  });

  // console.log(p);

  expect(p1.leaving).toEqual(true);
  expect(p2.state).toEqual(SITTING);
  expect(t.round).toEqual(WAITING);
  expect(t.cards).toEqual([]);
  expect(t.pot).toEqual(0);
});

test("autofold, return bets two players", () => {
  let p1 = {
    position: 1,
    state: READY,
    chips: 100,
    accountId: "p1-acc"
  };

  let p2 = {
    position: 5,
    state: READY,
    chips: 200,
    accountId: "p2-acc"
  };

  let t = {
    minPlayers: 2,
    round: WAITING,
    smallBlind: 10,
    bigBlind: 20,
    rake: 0
  };

  let p = [p1, p2];

  game(t, p, {
    type: JOIN,
    seed: 8544783340
  });

  game(t, p, { type: CALL });
  game(t, p, { type: CALL });

  expect(t.round).toEqual(FLOP);
  expect(t.pot).toEqual(40);

  expect(p1.chips).toEqual(80);
  expect(p2.chips).toEqual(180);

  p1.chips = 0;
  p1.leaving = true;

  game(t, p, { type: LEAVE });

  expect(p2.chips).toEqual(220);

  // console.log(p);
});
