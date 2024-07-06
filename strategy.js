const Strategy = {
  action: {
    add: {},
    move: [],
    remove: [],
    on: [],
    off: [],
  },

  init: function() {
    Craps.shotCountExclude.on = [2, 3, 11];
  },

  resetActions: function() {
    Strategy.action.add = {};
    Strategy.action.move = [];
    Strategy.action.remove = [];
    Strategy.action.on = [];
    Strategy.action.off = [];
  },

  runActions: function() {
    Table.removeBets(Strategy.action.remove);
    Table.moveBets(Strategy.action.move);
    Table.addBets(Strategy.action.add);
    Table.betsOn(Strategy.action.on);
    Table.betsOff(Strategy.action.off);
  },

  play: function() {
    let shot = Craps.shotCount;
    let call = Craps.call;
    let point = Craps.point;
    Strategy.resetActions();

    if (!shot) {
      // Come out roll instructions
      Strategy.comeOutRoll();
    } else {
      switch (shot) {
        case 1:
          // First roll after point is set
          Strategy.firstRollAfterPoint(point);
          break;
        case 2:
          // Second roll after point is set
          Strategy.secondRollAfterPoint(point);
          break;
        default:
          // Subsequent rolls
          Strategy.subsequentRolls(call);
      }
    }

    Strategy.runActions();
  },

  comeOutRoll: function() {
    console.log('Strategy: no shot');
    // Make $10 passline bet
    // Make $10 dontpass bet
    // Turn on hard bet(s) if not working

    if (!Table.hasBet('passline')) Strategy.action.add['passline'] = 10;
    if (!Table.hasBet('dontpass')) Strategy.action.add['dontpass'] = 10;
    Strategy.turnOnHardBets();
  },

  firstRollAfterPoint: function(point) {
    console.log('Strategy: setup DC');
    // Make $90 dontpassodds bet
    // Make $75 newdontcome bet
    // Make $5 yo 11 bet
    // Make $10 hard bet on point if not 5 or 9

    if (!Table.hasBet('dontpassodds')) Strategy.action.add['dontpassodds'] = 90;
    if (!Table.hasBet('newdontcome')) Strategy.action.add['newdontcome'] = 75;
    if (!Table.hasBet('yo11')) Strategy.action.add['yo11'] = 5;

    Strategy.addHardBetOnPoint(point);
  },

  secondRollAfterPoint: function(point) {
    console.log('Strategy: setup place/buy bets');
    // Remove dontpassodds
    // Move or add hard bet to hedge dontcome
    // Make $30 passlineodds bet
    // Make $10 newcome bet
    // Make $25 buy on 4 & 10 if not point
    // Make $30 buy on 5 & 9 if not point
    // Make $30 place on 6 & 8 if not point

    if (Table.hasBet('dontpassodds')) Strategy.action.remove.push('dontpassodds');
    Strategy.addPassLineOddsAndComeBets();
    Strategy.addPlaceBuyBets(point);
  },

  subsequentRolls: function(call) {
    console.log('Strategy: win money $$$');
    // Make $10 newcome bet
    // If 4, 5, 6, 8, 9, 10 move place/buy bet to comeodds bet

    if (!Table.hasBet('newcome')) Strategy.action.add['newcome'] = 10;
    Strategy.movePlaceBuyToComeOdds(call);
  },

  turnOnHardBets: function() {
    const hardBets = ['hard4', 'hard6', 'hard8', 'hard10'];
    for (let bet of hardBets) {
      if (Table.hasBet(bet)) Strategy.action.on.push(bet);
    }
  },

  addHardBetOnPoint: function(point) {
    const hardBets = {
      4: 'hard4',
      6: 'hard6',
      8: 'hard8',
      10: 'hard10'
    };
    if (hardBets[point] && !Table.hasBet(hardBets[point])) {
      Strategy.action.add[hardBets[point]] = 10;
    }
  },

  addPassLineOddsAndComeBets: function() {
    if (!Table.hasBet('passlineodds')) Strategy.action.add['passlineodds'] = 30;
    if (!Table.hasBet('newcome')) Strategy.action.add['newcome'] = 10;
  },

  addPlaceBuyBets: function(point) {
    const placeBuyBets = {
      buy4: 25, buy5: 30, place6: 30, place8: 30, buy9: 30, buy10: 25
    };
    for (let [bet, amount] of Object.entries(placeBuyBets)) {
      if (!Table.hasBet(bet) && !Table.hasBet(bet.replace('place', 'dontcome')) && point !== parseInt(bet.slice(-1))) {
        Strategy.action.add[bet] = amount;
      }
    }
  },

  movePlaceBuyToComeOdds: function(call) {
    const placeBuyToComeOdds = {
      4: 'buy4', 5: 'buy5', 6: 'place6', 8: 'place8', 9: 'buy9', 10: 'buy10'
    };
    if (placeBuyToComeOdds[call] && Table.hasBet(placeBuyToComeOdds[call])) {
      Strategy.action.move.push([placeBuyToComeOdds[call], 'comeodds' + call]);
    }
  }
};
