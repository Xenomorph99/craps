const Dealer = {
  init: function() {
    // Do nothing
  },

  run: function(bets, dice, point) {
    let q = bets ? Dealer.buildQueue(bets) : Table.bet;

    if (dice) {
      Craps.dice[0] = dice[0];
      Craps.dice[1] = dice[1];
      Craps.call = dice[0] + dice[1];
    }

    if (point) Craps.point = point;

    for (let bet in q) {
      if (Dealer[bet]) Dealer[bet]();
    }
  },

  buildQueue: function(bets) {
    let q = {};
    for (let bet of bets) {
      q[bet] = Table.bet[bet];
    }
    return q;
  },

  pay: function(key, amount, takedown = false) {
    if (key) {
      if (amount) {
        console.log('you WIN $' + amount);
        Craps.purse.amount += amount;
        Craps.won += amount;
      }
      if (takedown) Dealer.takedown(key);
    }
  },

  take: function(key) {
    if (key) {
      console.log('you LOSE $' + Table.bet[key].amount);
      Craps.lost += Table.bet[key].amount;
      Table.bet[key].amount = 0;
      Table.removeBets([key]);
    }
  },

  move: function(key, destination) {
    console.log('move ' + key + ' --> ' + destination);
    if (key && destination) Table.moveBets([[key, destination]]);
  },

  takedown: function(key) {
    console.log('take down $' + Table.bet[key].amount);
    if (key) Table.removeBets([key]);
  },

  handleBet: function(key, pointCheckFunc, payoffCalc) {
    let bet = Table.bet[key];
    let call = Craps.call;

    if (bet.amount && bet.working) {
      if (pointCheckFunc(call)) {
        Dealer.pay(key, payoffCalc(bet.amount), true);
      } else if (call === 7) {
        Dealer.take(key);
      }
    }
  },

  passline: function() {
    Dealer.handleBet('passline', call => call === Craps.point, amount => amount);
  },

  passlineodds: function() {
    const payoffCalc = amount => {
      const point = Craps.point;
      const odds = {
        4: 2,
        5: 1.5,
        6: 1.2,
        8: 1.2,
        9: 1.5,
        10: 2
      };
      return Math.floor(amount * odds[point]);
    };

    Dealer.handleBet('passlineodds', call => call === Craps.point, payoffCalc);
  },

  dontpass: function() {
    Dealer.handleBet('dontpass', call => call === 7, amount => amount);
  },

  dontpassodds: function() {
    const payoffCalc = amount => {
      const point = Craps.point;
      const odds = {
        4: 0.5,
        5: 0.67,
        6: 0.83,
        8: 0.83,
        9: 0.67,
        10: 0.5
      };
      return Math.floor(amount * odds[point]);
    };

    Dealer.handleBet('dontpassodds', call => call === 7, payoffCalc);
  },

  newcome: function() {
    const handleNewCome = (key, num) => {
      let bet = Table.bet[key];
      let call = Craps.call;

      if (bet.amount && bet.working) {
        if ([2, 3, 12].includes(call)) {
          Dealer.take(key);
        } else if ([4, 5, 6, 8, 9, 10].includes(call)) {
          Dealer.move(key, 'come' + call);
        } else if ([7, 11].includes(call)) {
          Dealer.pay(key, bet.amount);
        }
      }
    };

    handleNewCome('newcome', Craps.call);
  },

  newdontcome: function() {
    const handleNewDontCome = (key, num) => {
      let bet = Table.bet[key];
      let call = Craps.call;

      if (bet.amount && bet.working) {
        if ([2, 3].includes(call)) {
          Dealer.pay(key, bet.amount);
        } else if ([4, 5, 6, 8, 9, 10].includes(call)) {
          Dealer.move(key, 'dontcome' + call);
        } else if ([7, 11].includes(call)) {
          Dealer.take(key);
        }
      }
    };

    handleNewDontCome('newdontcome', Craps.call);
  },

  handlePlaceBuy: function(type, key, num, odds) {
    let bet = Table.bet[key];
    let call = Craps.call;
    let payoffCalc = amount => Math.floor(amount * odds);

    if (bet.amount && bet.working) {
      if (call === num) {
        Dealer.pay(key, payoffCalc(bet.amount));
      } else if (call === 7) {
        Dealer.take(key);
      }
    }
  },

  place4: function() { Dealer.handlePlaceBuy('place', 'place4', 4, 9 / 5); },
  place5: function() { Dealer.handlePlaceBuy('place', 'place5', 5, 7 / 5); },
  place6: function() { Dealer.handlePlaceBuy('place', 'place6', 6, 7 / 6); },
  place8: function() { Dealer.handlePlaceBuy('place', 'place8', 8, 7 / 6); },
  place9: function() { Dealer.handlePlaceBuy('place', 'place9', 9, 7 / 5); },
  place10: function() { Dealer.handlePlaceBuy('place', 'place10', 10, 9 / 5); },

  buy4: function() { Dealer.handlePlaceBuy('buy', 'buy4', 4, (2 / 1) * 0.95); },
  buy5: function() { Dealer.handlePlaceBuy('buy', 'buy5', 5, (3 / 2) * 0.95); },
  buy6: function() { Dealer.handlePlaceBuy('buy', 'buy6', 6, (6 / 5) * 0.95); },
  buy8: function() { Dealer.handlePlaceBuy('buy', 'buy8', 8, (6 / 5) * 0.95); },
  buy9: function() { Dealer.handlePlaceBuy('buy', 'buy9', 9, (3 / 2) * 0.95); },
  buy10: function() { Dealer.handlePlaceBuy('buy', 'buy10', 10, (2 / 1) * 0.95); },

  come: function(key, num) {
    let bet = Table.bet[key];
    let call = Craps.call;

    if (bet.amount && bet.working) {
      if (call === num) {
        Dealer.pay(key, bet.amount);
      } else if (call === 7) {
        Dealer.take(key);
      }
    }
  },

  come4: function() { Dealer.come('come4', 4); },
  come5: function() { Dealer.come('come5', 5); },
  come6: function() { Dealer.come('come6', 6); },
  come8: function() { Dealer.come('come8', 8); },
  come9: function() { Dealer.come('come9', 9); },
  come10: function() { Dealer.come('come10', 10); },

  comeodds: function(key, num) {
    let bet = Table.bet[key];
    let call = Craps.call;
    let odds = {
      4: 2,
      5: 1.5,
      6: 1.2,
      8: 1.2,
      9: 1.5,
      10: 2
    };
    let payoffCalc = amount => Math.floor(amount * odds[num]);

    Dealer.handleBet(key, call => call === num, payoffCalc);
  },

  comeodds4: function() { Dealer.comeodds('comeodds4', 4); },
  comeodds5: function() { Dealer.comeodds('comeodds5', 5); },
  comeodds6: function() { Dealer.comeodds('comeodds6', 6); },
  comeodds8: function() { Dealer.comeodds('comeodds8', 8); },
  comeodds9: function() { Dealer.comeodds('comeodds9', 9); },
  comeodds10: function() { Dealer.comeodds('comeodds10', 10); },

  lay: function(key, num) {
    let bet = Table.bet[key];
    let call = Craps.call;
    let odds = {
      4: 0.5,
      5: 0.67,
      6: 0.83,
      8: 0.83,
      9: 0.67,
      10: 0.5
    };
    let payoffCalc = amount => Math.ceil(amount * odds[num] * 0.95);

    Dealer.handleBet(key, call => call === 7, payoffCalc);
  },

  lay4: function() { Dealer.lay('lay4', 4); },
  lay5: function() { Dealer.lay('lay5', 5); },
  lay6: function() { Dealer.lay('lay6', 6); },
  lay8: function() { Dealer.lay('lay8', 8); },
  lay9: function() { Dealer.lay('lay9', 9); },
  lay10: function() { Dealer.lay('lay10', 10); },

  dontcome: function(key, num) {
    let bet = Table.bet[key];
    let call = Craps.call;

    if (bet.amount && bet.working) {
      if (call === 7) {
        Dealer.pay(key, bet.amount);
      } else if (call === num) {
        Dealer.take(key);
      }
    }
  },

  dontcome4: function() { Dealer.dontcome('dontcome4', 4); },
  dontcome5: function() { Dealer.dontcome('dontcome5', 5); },
  dontcome6: function() { Dealer.dontcome('dontcome6', 6); },
  dontcome8: function() { Dealer.dontcome('dontcome8', 8); },
  dontcome9: function() { Dealer.dontcome('dontcome9', 9); },
  dontcome10: function() { Dealer.dontcome('dontcome10', 10); },

  dontcomeodds: function(key, num) {
    let bet = Table.bet[key];
    let call = Craps.call;
    let odds = {
      4: 0.5,
      5: 0.67,
      6: 0.83,
      8: 0.83,
      9: 0.67,
      10: 0.5
    };
    let payoffCalc = amount => Math.floor(amount * odds[num]);

    Dealer.handleBet(key, call => call === 7, payoffCalc);
  },

  dontcomeodds4: function() { Dealer.dontcomeodds('dontcomeodds4', 4); },
  dontcomeodds5: function() { Dealer.dontcomeodds('dontcomeodds5', 5); },
  dontcomeodds6: function() { Dealer.dontcomeodds('dontcomeodds6', 6); },
  dontcomeodds8: function() { Dealer.dontcomeodds('dontcomeodds8', 8); },
  dontcomeodds9: function() { Dealer.dontcomeodds('dontcomeodds9', 9); },
  dontcomeodds10: function() { Dealer.dontcomeodds('dontcomeodds10', 10); },

  hard: function(key, num) {
    let bet = Table.bet[key];
    let dice = Craps.dice;
    let call = Craps.call;
    let hard = dice[0] === dice[1];
    let odds = {
      4: 7,
      6: 9,
      8: 9,
      10: 7
    };
    let payoffCalc = amount => Math.floor(amount * odds[num]);

    if (bet.amount && bet.working) {
      if (hard && call === num) {
        Dealer.pay(key, payoffCalc(bet.amount));
      } else if (!hard && call === num || call === 7) {
        Dealer.take(key);
      }
    }
  },

  hard4: function() { Dealer.hard('hard4', 4); },
  hard6: function() { Dealer.hard('hard6', 6); },
  hard8: function() { Dealer.hard('hard8', 8); },
  hard10: function() { Dealer.hard('hard10', 10); },

  craps: function() {
    Dealer.handleBet('craps', call => [2, 3, 12].includes(call), amount => Math.floor(amount * 7));
  },

  yo11: function() {
    Dealer.handleBet('yo11', call => call === 11, amount => Math.floor(amount * 15));
  },

  field: function() {
    const odds = {
      2: 2,
      3: 1,
      4: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 2
    };

    Dealer.handleBet('field', call => call in odds, amount => Math.floor(amount * odds[call]));
  },

  big: function(key, num) {
    Dealer.handleBet(key, call => call === num, amount => amount);
  },

  big6: function() { Dealer.big('big6', 6); },
  big8: function() { Dealer.big('big8', 8); }
};
