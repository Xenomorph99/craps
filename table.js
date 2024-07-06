const Table = {
  bet: {
    passline: { amount: 0, working: 1, count: 0 },
    passlineodds: { amount: 0, working: 0, count: 0 },
    dontpass: { amount: 0, working: 1, count: 0 },
    dontpassodds: { amount: 0, working: 0, count: 0 },
    newcome: { amount: 0, working: 0, count: 0 },
    newdontcome: { amount: 0, working: 0, count: 0 },
    place4: { amount: 0, working: 0, count: 0 },
    place5: { amount: 0, working: 0, count: 0 },
    place6: { amount: 0, working: 0, count: 0 },
    place8: { amount: 0, working: 0, count: 0 },
    place9: { amount: 0, working: 0, count: 0 },
    place10: { amount: 0, working: 0, count: 0 },
    buy4: { amount: 0, working: 0, count: 0 },
    buy5: { amount: 0, working: 0, count: 0 },
    buy6: { amount: 0, working: 0, count: 0 },
    buy8: { amount: 0, working: 0, count: 0 },
    buy9: { amount: 0, working: 0, count: 0 },
    buy10: { amount: 0, working: 0, count: 0 },
    come4: { amount: 0, working: 1, count: 0 },
    come5: { amount: 0, working: 1, count: 0 },
    come6: { amount: 0, working: 1, count: 0 },
    come8: { amount: 0, working: 1, count: 0 },
    come9: { amount: 0, working: 1, count: 0 },
    come10: { amount: 0, working: 1, count: 0 },
    comeodds4: { amount: 0, working: 0, count: 0 },
    comeodds5: { amount: 0, working: 0, count: 0 },
    comeodds6: { amount: 0, working: 0, count: 0 },
    comeodds8: { amount: 0, working: 0, count: 0 },
    comeodds9: { amount: 0, working: 0, count: 0 },
    comeodds10: { amount: 0, working: 0, count: 0 },
    lay4: { amount: 0, working: 0, count: 0 },
    lay5: { amount: 0, working: 0, count: 0 },
    lay6: { amount: 0, working: 0, count: 0 },
    lay8: { amount: 0, working: 0, count: 0 },
    lay9: { amount: 0, working: 0, count: 0 },
    lay10: { amount: 0, working: 0, count: 0 },
    dontcome4: { amount: 0, working: 1, count: 0 },
    dontcome5: { amount: 0, working: 1, count: 0 },
    dontcome6: { amount: 0, working: 1, count: 0 },
    dontcome8: { amount: 0, working: 1, count: 0 },
    dontcome9: { amount: 0, working: 1, count: 0 },
    dontcome10: { amount: 0, working: 1, count: 0 },
    dontcomeodds4: { amount: 0, working: 0, count: 0 },
    dontcomeodds5: { amount: 0, working: 0, count: 0 },
    dontcomeodds6: { amount: 0, working: 0, count: 0 },
    dontcomeodds8: { amount: 0, working: 0, count: 0 },
    dontcomeodds9: { amount: 0, working: 0, count: 0 },
    dontcomeodds10: { amount: 0, working: 0, count: 0 },
    hard4: { amount: 0, working: 0, count: 0 },
    hard6: { amount: 0, working: 0, count: 0 },
    hard8: { amount: 0, working: 0, count: 0 },
    hard10: { amount: 0, working: 0, count: 0 },
    craps: { amount: 0, working: 1, count: 0 },
    yo11: { amount: 0, working: 1, count: 0 },
    field: { amount: 0, working: 1, count: 0 },
    big6: { amount: 0, working: 1, count: 0 },
    big8: { amount: 0, working: 1, count: 0 },
  },

  init: function() {
    Table.movePuck();
  },

  refresh: function(array) {
    let bets = array ? Table.buildBetObject(array) : Table.bet;
    Table.updateHTML(bets);
  },

  buildBetObject: function(array) {
    let bets = {};
    for (let bet of array) {
      bets[bet] = Table.bet[bet];
    }
    return bets;
  },

  updateHTML: function(bets) {
    for (let key in bets) {
      let element = document.getElementById('bet-' + key);
      element.innerHTML = Table.bet[key].amount;
      if (Table.bet[key].working) {
        element.parentElement.classList.add('working');
      } else {
        element.parentElement.classList.remove('working');
      }
    }
  },

  movePuck: function() {
    let call = Craps.call;
    let point = Craps.point;
    let onExclude = Craps.shotCountExclude.on.includes(call);
    let offExclude = Craps.shotCountExclude.off.includes(call);
    let bets = [
      'passlineodds', 'dontpassodds', 'newcome', 'newdontcome',
      'place4', 'place5', 'place6', 'place8', 'place9', 'place10',
      'buy4', 'buy5', 'buy6', 'buy8', 'buy9', 'buy10',
      'comeodds4', 'comeodds5', 'comeodds6', 'comeodds8', 'comeodds9', 'comeodds10',
      'lay4', 'lay5', 'lay6', 'lay8', 'lay9', 'lay10',
      'dontcomeodds4', 'dontcomeodds5', 'dontcomeodds6', 'dontcomeodds8', 'dontcomeodds9', 'dontcomeodds10',
      'hard4', 'hard6', 'hard8', 'hard10'
    ];

    if (point) { // ON
      if (call === 7 || call === point) {
        Table.updatePuckDisplay(point, 'off');
        Craps.point = 0;
        Craps.shotCount = 0;
        Table.betsOff(bets);
      } else if (!onExclude) {
        Craps.shotCount++;
      }
    } else { // OFF
      if ([4, 5, 6, 8, 9, 10].includes(call)) {
        Table.updatePuckDisplay(call, 'on');
        Craps.point = call;
        if (!offExclude) Craps.shotCount++;
        Table.betsOn(bets);
      }
    }

    Table.refresh();
  },

  updatePuckDisplay: function(point, state) {
    if (state === 'off') {
      document.getElementById('puck-' + point).innerHTML = '';
      document.getElementById('puck-off').innerHTML = '<b>OFF</b>';
    } else if (state === 'on') {
      document.getElementById('puck-off').innerHTML = '';
      document.getElementById('puck-' + point).innerHTML = '<b>ON</b>';
    }
  },

  addBets: function(obj) {
    if (obj) {
      for (let bet in obj) {
        Craps.purse.amount -= obj[bet];
        Table.bet[bet].amount += obj[bet];
        Table.refresh([bet]);
      }
    }
  },

  moveBets: function(array) {
    if (array.length) {
      for (let pair of array) {
        Table.bet[pair[1]].amount += Table.bet[pair[0]].amount;
        Table.bet[pair[0]].amount = 0;
        Table.refresh([pair[0], pair[1]]);
      }
    }
  },

  removeBets: function(array) {
    if (array.length) {
      for (let bet of array) {
        Craps.purse.amount += Table.bet[bet].amount;
        Table.bet[bet].amount = 0;
        Table.refresh([bet]);
      }
    }
  },

  betsOn: function(array) {
    if (array.length) {
      for (let bet of array) {
        Table.bet[bet].working = 1;
        Table.refresh([bet]);
      }
    }
  },

  betsOff: function(array) {
    if (array.length) {
      for (let bet of array) {
        Table.bet[bet].working = 0;
        Table.refresh([bet]);
      }
    }
  },

  hasBet: function(bet) {
    return bet && Table.bet[bet].amount ? true : false;
  }
};
