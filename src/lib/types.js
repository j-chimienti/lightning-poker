const AUTO_FOLD_DELAY = 25; // 25 sec

// table states (round)
const WAITING = "waiting";
const PRE_FLOP = "preflop";
const FLOP = "flop";
const TURN = "turn";
const RIVER = "river";
const SHOWDOWN = "showdown";

// actions
const JOIN = "join";
const LEAVE = "leave";
const BET = "bet";
const CALL = "call";
const FOLD = "fold";
const DEAL = "deal";
const NEW_ROUND = "newround";

// player states
const READY = "ready";
const SITTING = "sitting";
const CALLED = "called";
const BETTED = "betted";
const RAISED = "raised";
const CHECKED = "checked";
const FOLDED = "folded";

const REQUESTED_INVOICE = "requested";
const PENDING_INVOICE = "pending";
const SETTLED_INVOICE = "settled";

const REQUESTED_PAYMENT = "requested";
const PENDING_PAYMENT = "pending";
const CONFIRMED_PAYMENT = "confirmed";
const ERROR_PAYMENT = "error";

const tableDefaults = {
  bigBlind: 100,
  smallBlind: 50,
  buyIn: 10000,
  round: WAITING,
  cards: [],
  dealer: 1,
  pot: 0,
  pots: [],
  private: true,
  rake: 0,
  seed: 9999
};

const playerDefaults = {};

// TODO: save last action time, because of 30 sec player need to move

module.exports = {
  WAITING,
  PRE_FLOP,
  FLOP,
  TURN,
  RIVER,
  SHOWDOWN,

  // actions
  JOIN,
  LEAVE,
  BET,
  CALL,
  FOLD,
  DEAL,
  NEW_ROUND,

  // player states
  READY,
  SITTING,
  CALLED,
  BETTED,
  RAISED,
  CHECKED,
  FOLDED,

  AUTO_FOLD_DELAY,

  REQUESTED_INVOICE,
  PENDING_INVOICE,
  SETTLED_INVOICE,

  REQUESTED_PAYMENT,
  PENDING_PAYMENT,
  CONFIRMED_PAYMENT,
  ERROR_PAYMENT,

  tableDefaults,
  playerDefaults
};
