const sortByRank = require("poker-rank");
const getAllCombination = require("poker-combinations");
const CryptoJS = require("crypto-js");
const { shuffleDeck, generateSeed } = require("./utils");

const {
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
  ALLIN,
  DEAL,

  // player states
  READY,
  SITTING,
  CALLED,
  BETTED,
  RAISED,
  CHECKED,
  FOLDED,

  AUTO_FOLD_DELAY
} = require("./types");

module.exports = (table, players, action) => {
  players.sort((a, b) => a.position - b.position);

  const maxBet = Math.max.apply(null, players.map(({ bet }) => bet || 0));

  let {
    round = WAITING,
    seed = 12345,
    dealer = 1,
    minPlayers = 2,
    bigBlind,
    smallBlind,
    cards = [],
    flopIndex = 0,
    pot = 0,
    pots = [],
    rake = 0,
    winners = []
  } = table;
  const { type, playerId } = action;

  // helpers

  const button = () => {
    //todo use activePlayers here
    for (let player of players) {
      if (player.position >= dealer && player.state !== SITTING) {
        return player;
      }
    }
    return players[0];
  };

  const active = () => players.find(p => p.active);
  const first = () => next(button());

  const circle = player => {
    const index = players.indexOf(player);
    return index === players.length - 1 ? players[0] : players[index + 1];
  };

  const next = player => {
    let i = 0;
    do {
      player = circle(player);
      if (
        !(
          player.state === FOLDED ||
          player.state === SITTING ||
          player.leaving ||
          player.allin
        )
      )
        return player;
      i++;
    } while (i < players.length);
  };

  const setActive = player => {
    for (const player of players) {
      player.active = false;
      player.foldAt = null;
    }
    if (player) {
      player.active = true;
      player.foldAt = new Date(Date.now() + AUTO_FOLD_DELAY * 1000);
    }
    return player;
  };

  const clearTalked = () => {
    for (let player of players) {
      if (player.state !== FOLDED) {
        if (!player.allin) {
          player.talked = false;
        }
      }
    }
  };

  const placeBet = (player, amount) => {
    if (!player.bet) player.bet = 0;
    if (!player.chipsBet) player.chipsBet = 0;

    if (player.chips === 0 && !player.allin) {
      player.leaving = true;
      return;
    }

    if (player.chips >= amount) {
      player.chips -= amount;
      player.bet += amount;
      player.chipsBet += amount;
    } else {
      player.bet += player.chips;
      player.chipsBet += player.chips;
      player.chips = 0;
      player.allin = true;
    }
  };

  const checkForEndOfRound = () => {
    for (let player of players) {
      if (
        !(
          (player.talked && player.bet === maxBet) ||
          player.allin ||
          player.state === FOLDED ||
          player.leaving ||
          player.state === SITTING
        )
      ) {
        return false;
      }
    }
    return true;
  };

  const splitPot = () => {
    const sub = val => val - bet;
    // Array of bets,
    // sort in ascending order.
    let bets = players
      .filter(player => player.state !== SITTING)
      // .filter(player => player.state !== FOLDED)
      .map(player => player.chipsBet)
      .sort((bet1, bet2) => bet1 - bet2);

    pots = [];

    if (bets[0] === bets[bets.length - 1]) {
      // Everyone has bet the same amount,
      // so no sidepots.
      return;
    }

    let bet;

    while ((bet = bets.shift()) >= 0) {
      if (bet > 0) {
        const threshold =
          pots.length === 0 ? bet : bet + pots[pots.length - 1].minChipsBet;

        pots.push({
          minChipsBet: threshold,
          pot: bet * (bets.length + 1)
        });

        bets = bets.map(sub);
      }
    }
  };

  const moveBets = () => {
    if ([...activePlayers()].filter(p => p.allin).length > 0) {
      // at least 1 all-in player
      splitPot();
    }
    for (let player of players) {
      if (player.state !== SITTING) {
        pot += player.bet;
        player.bet = 0;
      }
    }
  };

  const checkForSoloPlayer = () => {
    const solo = [...activePlayers()];
    if (solo.length === 1) {
      return solo[0];
    }
  };

  const checkForCompleteAllIn = () => {
    const activeCount = [...activePlayers()].length;
    const allinCont = players.filter(({ allin }) => allin).length;
    if (activeCount === allinCont) {
      return true;
    }
    if (activeCount - allinCont === 1) {
      for (let p of activePlayers()) {
        // if the single not all-in player talked return true
        if (!p.allin && p.talked) {
          return true;
        }
      }
    }
  };

  const resetTable = () => {
    round = WAITING;
    cards = [];
    pot = 0;
    pots = [];
    winners = [];

    players.forEach(p => {
      p.state = SITTING;
      p.cards = [];
      p.winner = false;
      p.allin = false;
      p.sb = false;
      p.bb = false;
    });
  };

  function* activePlayers() {
    for (let player of players) {
      if (
        !(player.state === FOLDED || player.state === SITTING || player.leaving)
      ) {
        yield player;
      }
    }
  }

  const assignChips = (player, amount) => {
    pot -= amount;

    // substract rake
    if (round === PRE_FLOP) {
      rake = 0; // no rake on pre-flop
    }
    amount = Math.floor((amount * (100 - rake)) / 100);

    player.chips += amount;
    player.winner = true;

    const winner = winners.find(w => w.position === player.position);

    if (winner) {
      winner.amount += amount;
    } else {
      winners.push({
        amount,
        position: player.position
      });
    }
  };

  const newHand = () => {
    seed = action.seed || generateSeed();
    const gameDeck = shuffleDeck(seed);

    // deal cards
    for (let player of players) {
      const cards = [gameDeck.shift(), gameDeck.shift()];
      // encrypt cards with profileId for each player
      if (!player.profileId) {
        throw new Error("player profileId is missing, can not encrypt cards");
      }
      player.cards = CryptoJS.AES.encrypt(
        JSON.stringify(cards),
        player.profileId
      ).toString();
      // console.log(player);
    }

    flopIndex = players.length * 2;
    cards = [];
    round = PRE_FLOP;
    pot = 0;
    pots = [];
    winners = [];

    // set all ready status, all sitting are comming into play
    for (let player of players) {
      player.bet = 0;
      player.chipsBet = 0;
      player.state = READY;
      player.winner = false;
      player.talked = false;
      player.allin = false;
      player.bb = false;
      player.sb = false;
      player.bestPoint = [];
    }

    // next dealer
    dealer = first().position;

    const sb = first();
    placeBet(sb, smallBlind);
    sb.sb = true;

    const bb = next(sb);
    placeBet(bb, bigBlind);
    bb.bb = true;

    // first to play is UTG next to big blind
    setActive(next(bb));
  };

  // start here
  // player joined the game
  if (type === JOIN) {
    // his state per default is SITTING
    if (round === WAITING) {
      if (players.length >= minPlayers) {
        // start new Hand
        newHand();
      }
    }
  }

  const checkPlayersTurn = () => {
    let activeId = active() && active().id;
    if (activeId !== playerId) {
      throw new Error("it's not your turn");
    }
  };

  // func starts here
  if (type === LEAVE) {
    if (round !== WAITING) {
      let winner = checkForSoloPlayer();
      if (winner) {
        moveBets();
        assignChips(winner, pot);
        round = SHOWDOWN;
      }

      if (players.filter(p => !p.leaving).length < minPlayers) {
        resetTable();
      } else {
        // set next player to become active, if the active one goes away
        if (active().id === playerId) {
          setActive(next(active()));
        }
      }
    }
  }

  if (type === FOLD) {
    checkPlayersTurn();

    active().state = FOLDED;
    active().talked = true;
    if (next(active())) {
      setActive(next(active()));
    }
    // check if only one left
    let winner = checkForSoloPlayer();
    if (winner) {
      moveBets();
      assignChips(winner, pot);
      round = SHOWDOWN;
      // clear active players
      setActive();
    }
  }

  if (type === CALL) {
    checkPlayersTurn();

    let bet = active() && (active().bet || 0);

    if (maxBet - bet === 0) {
      active().state = CHECKED;
    } else {
      active().state = CALLED;
    }

    if (maxBet === 0) {
      active().bet = 0;
    } else {
      placeBet(active(), maxBet - (active().bet || 0));
    }
    active().talked = true;
    if (next(active())) {
      setActive(next(active()));
    }
  }

  if (type === BET) {
    checkPlayersTurn();

    let amount = Number(action.amount);

    if (amount < 0 || isNaN(amount)) {
      throw new Error("invalid bet");
    }

    let bet = active() && (active().bet || 0);

    if (maxBet - bet === 0) {
      active().state = BETTED;
      placeBet(active(), action.amount);
    } else {
      active().state = RAISED;
      placeBet(active(), action.amount);
    }
    active().talked = true;
    if (active().allin) {
      for (let p of activePlayers()) {
        if (!p.allin) {
          p.talked = false;
        }
      }
    }
    if (next(active())) {
      setActive(next(active()));
    }
  }

  if (type === ALLIN) {
    checkPlayersTurn();

    if (maxBet === 0) {
      active().state = BETTED;
    } else {
      active().state = RAISED;
    }
    for (let p of activePlayers()) {
      if (!p.allin) {
        p.talked = false;
      }
    }
    active().talked = true;
    active().allin = true;
    placeBet(active(), active().chips);
    if (next(active())) {
      setActive(next(active()));
    }
  }

  if (type === DEAL && round === SHOWDOWN) {
    // remove players without chips
    players.forEach(p => {
      // increase hands played for each player
      p.hands = p.hands + 1;
      if (p.chips <= 0) {
        p.leaving = true;
      }
    });

    // check if there are enought players with chips
    // more or equal to the minPlayers
    if (players.filter(p => !p.leaving).length >= minPlayers) {
      newHand();
    } else {
      resetTable();
    }
  }

  if (type === CALL || type === BET || type === FOLD || type === ALLIN) {
    if (checkForEndOfRound()) {
      if (
        round === RIVER ||
        //sdsd
        (checkForCompleteAllIn() && round !== SHOWDOWN)
      ) {
        round = SHOWDOWN;
        // clear active
        setActive();

        // If during the RIVER session someone has made a bet,
        // the one who has made the first final bet is the one who has
        // to showdown first; otherwise the showdown starts from the
        // player next to the DB.

        if (cards.length < 5) {
          const gameDeck = shuffleDeck(seed);
          do {
            cards.push(gameDeck[flopIndex + cards.length]);
          } while (cards.length < 5);
        }

        for (let player of activePlayers()) {
          // decode cards!
          // console.log(player.cards);
          let bytes = CryptoJS.AES.decrypt(player.cards, player.profileId);
          // console.log(bytes);
          player.cards = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          // fulfill cards if all players go all-in earlier

          player.bestPoint = sortByRank(
            getAllCombination(player.cards.concat(cards), 5)
          )[0];
        }

        // -------------
        const playersBestCombination = sortByRank(
          [...activePlayers()].map(player => player.bestPoint.slice())
        );

        [...activePlayers()].forEach(player => delete player.bestPoint);

        // console.log(playersBestCombination);

        const handRank = playersBestCombination.map(data => {
          const player = [...activePlayers()][data.index];
          return {
            player,
            bestCards: data.slice(),
            bestCardsInfo: data.rank,
            exequo: data.exequo
          };
        });

        // console.log(handRank);

        moveBets();

        // winn calculations
        if (pots.length === 0) {
          // When there're no sidepot
          // I create a single sidepot,
          // so that I can apply the same
          // algorithm to assign the pot.
          pots.push({
            minChipsBet: 0,
            pot: pot
          });
        }

        pots.forEach(sidepot => {
          // For each sidepot:
          // only players who have bet at least
          // `minChipsBet` have right to compete to win `sidepot.pot`
          const sidepotContenders = handRank.filter(
            ({ player }) => player.chipsBet >= sidepot.minChipsBet
          );

          if (!sidepotContenders[0].exequo) {
            return assignChips(sidepotContenders[0].player, sidepot.pot);
          }

          // If execution reaches this point
          // the value of `sidepot.pot` should be
          // split between 2 or more players.
          const tag = sidepotContenders[0].exequo;

          const exequoPlayers = sidepotContenders.filter(
            ({ exequo }) => exequo === tag
          );

          const splitAmount = Math.floor(sidepot.pot / exequoPlayers.length);

          exequoPlayers.forEach(({ player }) => {
            assignChips(player, splitAmount);
          });

          // In case of a split pot,
          // the chips will be split as evenly as possible,
          // with any odd chip(s) left over given out
          // to the winning player with the worst position
          // (left of the button being the worst).

          // const excidingChips = sidepot.pot % exequoPlayers.length;
        });
      }

      if (round === TURN) {
        round = RIVER;
        clearTalked();
        setActive(first());
        moveBets();
        const gameDeck = shuffleDeck(seed);
        cards.push(gameDeck[flopIndex + 4]);
      }
      if (round === FLOP) {
        round = TURN;
        clearTalked();
        setActive(first());
        moveBets();
        const gameDeck = shuffleDeck(seed);
        cards.push(gameDeck[flopIndex + 3]);
      }

      if (round === PRE_FLOP) {
        round = FLOP;
        clearTalked();
        setActive(first());
        moveBets();
        const gameDeck = shuffleDeck(seed);
        cards = [
          gameDeck[flopIndex + 0],
          gameDeck[flopIndex + 1],
          gameDeck[flopIndex + 2]
        ];
      }
    }
  }

  // store table changes
  Object.assign(table, {
    seed,
    dealer,
    round,
    cards,
    flopIndex,
    pot,
    pots,
    winners,
    modifiedAt: new Date()
  });
};
