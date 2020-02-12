var Calc = {};

(function($) {

  Calc = {

    init: function() {

      // Do nothing

    },

    run: function(bets, dice, point) { // array of bets e.g. ['passline', 'dontpass']; array of dice e.g. [3,5]

      var q = {};
      var name = null;

      // Build the queue
      if(bets) { // add only specified bets
         for(var i = 0; i < bets.length; i++) {
           q[bets[i]] = Table.bet[bets[i]];
         }
      } else { // add all bets
        q = Table.bet;
      }

      // Manually set the dice
      if(dice) {
        Craps.dice[0] = dice[0];
        Craps.dice[1] = dice[1];
        Craps.call = dice[0] + dice[1];
      }

      // Manually set the point
      if(point) Craps.point = point;

      console.log(q);
      console.log('the roll is a ' + Craps.call + ' (' + Craps.dice[0] + '+' + Craps.dice[1] + ')');

      // Run calculations
      for(bet in q) {
        console.log('$' + q[bet].amount + ' ' + bet + ' bet calculating...');
        Calc[bet]();
      };

    },

    win: function(key, amount, takedown) {

      if(key) {

        if(amount) {
          Craps.purse.amount += amount;
          Craps.won += amount;
          console.log('you WIN $' + amount);
        }

        if(takedown) {
          // Craps.purse.amount += Table.bet[key].amount;
          // Table.bet[key].amount = 0;
        }

      }

    },

    lose: function(key) {

      if(key) {

        //Table.bet[key].amount = 0;
        Craps.lost += Table.bet[key].amount;
        console.log('you LOSE $' + Table.bet[key].amount);

      }

    },

    move: function(key, destination) {

      if(key && destination) {
        // Table.bet[destination].amount = Table.bet[key].amount;
        // Table.bet[key].amount = 0;
      }

    },

    passline: function() {

      var key = 'passline';
      var bet = Table.bet[key];
      var call = Craps.call;
      var point = Craps.point;

      if(bet.amount && bet.working) {
        if(point) {
          if(call === point) Calc.win(key, bet.amount);
          if(call === 7) Calc.lose(key);
        } else {
          switch(call) {
            case 2: Calc.lose(key); break;
            case 3: Calc.lose(key); break;
            case 7: Calc.win(key, bet.amount); break;
            case 11: Calc.win(key, bet.amount); break;
            case 12: Calc.lose(key); break;
          }
        }
      }

    },

    passlineodds: function() {

      var key = 'passlineodds';
      var bet = Table.bet[key];
      var call = Craps.call;
      var point = Craps.point;
      var a = [];

      a.push(Math.floor(bet.amount * (2/1))); // 4, 10
      a.push(Math.floor(bet.amount * (3/2))); // 5, 9
      a.push(Math.floor(bet.amount * (6/5))); // 6, 8

      if(bet.amount && bet.working) {
        if(point) {
          if(call === point) {
            switch(call) {
              case 4: Calc.win(key, a[0], true); break;
              case 5: Calc.win(key, a[1], true); break;
              case 6: Calc.win(key, a[2], true); break;
              case 8: Calc.win(key, a[2], true); break;
              case 9: Calc.win(key, a[1], true); break;
              case 10: Calc.win(key, a[0], true); break;
            }
          }
          if(call === 7) Calc.lose(key);
        }
      }

    },

    dontpass: function() {

      var key = 'dontpass';
      var bet = Table.bet[key];
      var call = Craps.call;
      var point = Craps.point;

      if(bet.amount && bet.working) {
        if(point) {
          if(call === 7) Calc.win(key, bet.amount);
          if(call === point) Calc.lose(key);
        } else {
          switch(call) { // 12 pushes
            case 2: Calc.win(key, bet.amount); break;
            case 3: Calc.win(key, bet.amount); break;
            case 7: Calc.lose(key); break;
            case 11: Calc.lose(key); break;
          }
        }
      }

    },

    dontpassodds: function() {

      var key = 'dontpassodds';
      var bet = Table.bet[key];
      var call = Craps.call;
      var point = Craps.point;
      var a = [];

      a.push(Math.floor(bet.amount * (1/2))); // 4, 10
      a.push(Math.floor(bet.amount * (2/3))); // 5, 9
      a.push(Math.floor(bet.amount * (5/6))); // 6, 8

      if(bet.amount && bet.working) {
        if(point) {
          if(call === 7) {
            switch(point) {
              case 4: Calc.win(key, a[0], true); break;
              case 5: Calc.win(key, a[1], true); break;
              case 6: Calc.win(key, a[2], true); break;
              case 8: Calc.win(key, a[2], true); break;
              case 9: Calc.win(key, a[1], true); break;
              case 10: Calc.win(key, a[0], true); break;
            }
          }
          if(call === point) Calc.lose(key);
        }
      }

    },

    newcome: function() {

      var key = 'newcome';
      var bet = Table.bet[key];
      var call = Craps.call;

      if(bet.amount && bet.working) {
        switch(call) {
          case 2: Calc.lose(key); break;
          case 3: Calc.lose(key); break;
          case 4: Calc.move(key, 'come4'); break;
          case 5: Calc.move(key, 'come5'); break;
          case 6: Calc.move(key, 'come6'); break;
          case 7: Calc.win(key, bet.amount); break;
          case 8: Calc.move(key, 'come8'); break;
          case 9: Calc.move(key, 'come9'); break;
          case 10: Calc.move(key, 'come10'); break;
          case 11: Calc.win(key, bet.amount); break;
          case 12: Calc.lose(key); break;
        }
      }

    },

    newdontcome: function() {

      var key = 'newdontcome';
      var bet = Table.bet[key];
      var call = Craps.call;

      if(bet.amount && bet.working) { // 12 pushes
        switch(call) {
          case 2: Calc.win(key, bet.amount); break;
          case 3: Calc.win(key, bet.amount); break;
          case 4: Calc.move(key, 'dontcome4'); break;
          case 5: Calc.move(key, 'dontcome5'); break;
          case 6: Calc.move(key, 'dontcome6'); break;
          case 7: Calc.lose(key); break;
          case 8: Calc.move(key, 'dontcome8'); break;
          case 9: Calc.move(key, 'dontcome9'); break;
          case 10: Calc.move(key, 'dontcome10'); break;
          case 11: Calc.lose(key); break;
        }
      }

    },

    place4: function() {

      // if(Craps.bet.place.four.amt) {
      //   if(Craps.bet.place.four.working) {
      //     if(call === 4) {
      //       Craps.wonBet(Math.floor(Craps.bet.place.four.amt * (9/5)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.place.four.amt);
      //       Craps.bet.place.four.amt = 0;
      //     }
      //   } else {
      //     if(call === 4) { // take down
      //       Craps.purse.amount += Craps.bet.place.four.amt;
      //       Craps.bet.place.four.amt = 0;
      //     }
      //   }
      // }

    },

    place5: function() {

      // if(Craps.bet.place.five.amt) {
      //   if(Craps.bet.place.five.working) {
      //     if(call === 5) {
      //       Craps.wonBet(Math.floor(Craps.bet.place.five.amt * (7/5)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.place.five.amt);
      //       Craps.bet.place.five.amt = 0;
      //     }
      //   } else {
      //     if(call === 5) { // take down
      //       Craps.purse.amount += Craps.bet.place.five.amt;
      //       Craps.bet.place.five.amt = 0;
      //     }
      //   }
      // }

    },

    place6: function() {

      // if(Craps.bet.place.six.amt) {
      //   if(Craps.bet.place.six.working) {
      //     if(call === 6) {
      //       Craps.wonBet(Math.floor(Craps.bet.place.six.amt * (7/6)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.place.six.amt);
      //       Craps.bet.place.six.amt = 0;
      //     }
      //   } else {
      //     if(call === 6) { // take down
      //       Craps.purse.amount += Craps.bet.place.six.amt;
      //       Craps.bet.place.six.amt = 0;
      //     }
      //   }
      // }

    },

    place8: function() {

      // if(Craps.bet.place.eight.amt) {
      //   if(Craps.bet.place.eight.working) {
      //     if(call === 8) {
      //       Craps.wonBet(Math.floor(Craps.bet.place.eight.amt * (7/6)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.place.eight.amt);
      //       Craps.bet.place.eight.amt = 0;
      //     }
      //   } else {
      //     if(call === 8) { // take down
      //       Craps.purse.amount += Craps.bet.place.eight.amt;
      //       Craps.bet.place.eight.amt = 0;
      //     }
      //   }
      // }

    },

    place9: function() {

      // if(Craps.bet.place.nine.amt) {
      //   if(Craps.bet.place.nine.working) {
      //     if(call === 9) {
      //       Craps.wonBet(Math.floor(Craps.bet.place.nine.amt * (7/5)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.place.nine.amt);
      //       Craps.bet.place.nine.amt = 0;
      //     }
      //   } else {
      //     if(call === 9) { // take down
      //       Craps.purse.amount += Craps.bet.place.nine.amt;
      //       Craps.bet.place.nine.amt = 0;
      //     }
      //   }
      // }

    },

    place10: function() {

      // if(Craps.bet.place.ten.amt) {
      //   if(Craps.bet.place.ten.working) {
      //     if(call === 10) {
      //       Craps.wonBet(Math.floor(Craps.bet.place.ten.amt * (9/5)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.place.ten.amt);
      //       Craps.bet.place.ten.amt = 0;
      //     }
      //   } else {
      //     if(call === 10) { // take down
      //       Craps.purse.amount += Craps.bet.place.ten.amt;
      //       Craps.bet.place.ten.amt = 0;
      //     }
      //   }
      // }

    },

    buy4: function() {

      // if(Craps.bet.buy.four.amt) {
      //   if(Craps.bet.buy.four.working) {
      //     if(call === 4) {
      //       Craps.wonBet(Math.ceil((Craps.bet.buy.four.amt * (2/1)) - (Craps.bet.buy.four.amt * 0.05)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.buy.four.amt);
      //       Craps.bet.buy.four.amt = 0;
      //     }
      //   } else {
      //     if(call === 4) { // take down
      //       Craps.purse.amount += Craps.bet.buy.four.amt;
      //       Craps.bet.buy.four.amt = 0;
      //     }
      //   }
      // }

    },

    buy5: function() {

      // if(Craps.bet.buy.five.amt) {
      //   if(Craps.bet.buy.five.working) {
      //     if(call === 5) {
      //       Craps.wonBet(Math.ceil((Craps.bet.buy.five.amt * (3/2)) - (Craps.bet.buy.five.amt * 0.05)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.buy.five.amt);
      //       Craps.bet.buy.five.amt = 0;
      //     }
      //   } else {
      //     if(call === 5) { // take down
      //       Craps.purse.amount += Craps.bet.buy.five.amt;
      //       Craps.bet.buy.five.amt = 0;
      //     }
      //   }
      // }

    },

    buy6: function() {

      // if(Craps.bet.buy.six.amt) {
      //   if(Craps.bet.buy.six.working) {
      //     if(call === 6) {
      //       Craps.wonBet(Math.ceil((Craps.bet.buy.six.amt * (6/5)) - (Craps.bet.buy.six.amt * 0.05)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.buy.six.amt);
      //       Craps.bet.buy.six.amt = 0;
      //     }
      //   } else {
      //     if(call === 6) { // take down
      //       Craps.purse.amount += Craps.bet.buy.six.amt;
      //       Craps.bet.buy.six.amt = 0;
      //     }
      //   }
      // }

    },

    buy8: function() {

      // if(Craps.bet.buy.eight.amt) {
      //   if(Craps.bet.buy.eight.working) {
      //     if(call === 8) {
      //       Craps.wonBet(Math.ceil((Craps.bet.buy.eight.amt * (6/5)) - (Craps.bet.buy.eight.amt * 0.05)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.buy.eight.amt);
      //       Craps.bet.buy.eight.amt = 0;
      //     }
      //   } else {
      //     if(call === 8) { // take down
      //       Craps.purse.amount += Craps.bet.buy.eight.amt;
      //       Craps.bet.buy.eight.amt = 0;
      //     }
      //   }
      // }

    },

    buy9: function() {

      // if(Craps.bet.buy.nine.amt) {
      //   if(Craps.bet.buy.nine.working) {
      //     if(call === 9) {
      //       Craps.wonBet(Math.ceil((Craps.bet.buy.nine.amt * (3/2)) - (Craps.bet.buy.nine.amt * 0.05)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.buy.nine.amt);
      //       Craps.bet.buy.nine.amt = 0;
      //     }
      //   } else {
      //     if(call === 9) { // take down
      //       Craps.purse.amount += Craps.bet.buy.nine.amt;
      //       Craps.bet.buy.nine.amt = 0;
      //     }
      //   }
      // }

    },

    buy10: function() {

      // if(Craps.bet.buy.ten.amt) {
      //   if(Craps.bet.buy.ten.working) {
      //     if(call === 10) {
      //       Craps.wonBet(Math.ceil((Craps.bet.buy.ten.amt * (2/1)) - (Craps.bet.buy.ten.amt * 0.05)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.buy.ten.amt);
      //       Craps.bet.buy.ten.amt = 0;
      //     }
      //   } else {
      //     if(call === 10) { // take down
      //       Craps.purse.amount += Craps.bet.buy.ten.amt;
      //       Craps.bet.buy.ten.amt = 0;
      //     }
      //   }
      // }

    },

    come4: function() {

      // if(Craps.bet.come.four.amt) {
      //   if(Craps.bet.come.four.working) {
      //     if(call === 4) {
      //       Craps.wonBet(Craps.bet.come.four.amt);
      //       Craps.purse.amount += Craps.bet.come.four.amt; // take down
      //       Craps.bet.come.four.amt = 0;
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.come.four.amt);
      //       Craps.bet.come.four.amt = 0;
      //     }
      //   }
      // }

    },

    come5: function() {

      // if(Craps.bet.come.five.amt) {
      //   if(Craps.bet.come.five.working) {
      //     if(call === 5) {
      //       Craps.wonBet(Craps.bet.come.five.amt);
      //       Craps.purse.amount += Craps.bet.come.five.amt; // take down
      //       Craps.bet.come.five.amt = 0;
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.come.five.amt);
      //       Craps.bet.come.five.amt = 0;
      //     }
      //   }
      // }

    },

    come6: function() {

      // if(Craps.bet.come.six.amt) {
      //   if(Craps.bet.come.six.working) {
      //     if(call === 6) {
      //       Craps.wonBet(Craps.bet.come.six.amt);
      //       Craps.purse.amount += Craps.bet.come.six.amt; // take down
      //       Craps.bet.come.six.amt = 0;
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.come.six.amt);
      //       Craps.bet.come.six.amt = 0;
      //     }
      //   }
      // }

    },

    come8: function() {

      // if(Craps.bet.come.eight.amt) {
      //   if(Craps.bet.come.eight.working) {
      //     if(call === 8) {
      //       Craps.wonBet(Craps.bet.come.eight.amt);
      //       Craps.purse.amount += Craps.bet.come.eight.amt; // take down
      //       Craps.bet.come.eight.amt = 0;
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.come.eight.amt);
      //       Craps.bet.come.eigh.amt = 0;
      //     }
      //   }
      // }

    },

    come9: function() {

      // if(Craps.bet.come.nine.amt) {
      //   if(Craps.bet.come.nine.working) {
      //     if(call === 9) {
      //       Craps.wonBet(Craps.bet.come.nine.amt);
      //       Craps.purse.amount += Craps.bet.come.nine.amt; // take down
      //       Craps.bet.come.nine.amt = 0;
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.come.nine.amt);
      //       Craps.bet.come.nine.amt = 0;
      //     }
      //   }
      // }

    },

    come10: function() {

      // if(Craps.bet.come.ten.amt) {
      //   if(Craps.bet.come.ten.working) {
      //     if(call === 10) {
      //       Craps.wonBet(Craps.bet.come.ten.amt);
      //       Craps.purse.amount += Craps.bet.come.ten.amt; // take down
      //       Craps.bet.come.ten.amt = 0;
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.come.ten.amt);
      //       Craps.bet.come.ten.amt = 0;
      //     }
      //   }
      // }

    },

    comeodds4: function() {

      // if(Craps.bet.odds.four.amt) {
      //   if(Craps.bet.odds.four.working) {
      //     if(call === 4) {
      //       Craps.wonBet(Math.floor(Craps.bet.odds.four.amt * (2/1)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.odds.four.amt);
      //       Craps.bet.odds.four.amt = 0;
      //     }
      //   } else {
      //     if(call === 7) { // take down
      //       Craps.purse.amount += Craps.bet.odds.four.amt;
      //       Craps.bet.odds.four.amt = 0;
      //     }
      //   }
      // }

    },

    comeodds5: function() {

      // if(Craps.bet.odds.five.amt) {
      //   if(Craps.bet.odds.five.working) {
      //     if(call === 5) {
      //       Craps.wonBet(Math.floor(Craps.bet.odds.five.amt * (3/2)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.odds.five.amt);
      //       Craps.bet.odds.five.amt = 0;
      //     }
      //   } else {
      //     if(call === 7) { // take down
      //       Craps.purse.amount += Craps.bet.odds.five.amt;
      //       Craps.bet.odds.five.amt = 0;
      //     }
      //   }
      // }

    },

    comeodds6: function() {

      // if(Craps.bet.odds.six.amt) {
      //   if(Craps.bet.odds.six.working) {
      //     if(call === 6) {
      //       Craps.wonBet(Math.floor(Craps.bet.odds.six.amt * (6/5)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.odds.six.amt);
      //       Craps.bet.odds.six.amt = 0;
      //     }
      //   } else {
      //     if(call === 7) { // take down
      //       Craps.purse.amount += Craps.bet.odds.six.amt;
      //       Craps.bet.odds.six.amt = 0;
      //     }
      //   }
      // }

    },

    comeodds8: function() {

      // if(Craps.bet.odds.eight.amt) {
      //   if(Craps.bet.odds.eight.working) {
      //     if(call === 8) {
      //       Craps.wonBet(Math.floor(Craps.bet.odds.eight.amt * (6/5)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.odds.eight.amt);
      //       Craps.bet.odds.eight.amt = 0;
      //     }
      //   } else {
      //     if(call === 7) { // take down
      //       Craps.purse.amount += Craps.bet.odds.eight.amt;
      //       Craps.bet.odds.eight.amt = 0;
      //     }
      //   }
      // }

    },

    comeodds9: function() {

      // if(Craps.bet.odds.nine.amt) {
      //   if(Craps.bet.odds.nine.working) {
      //     if(call === 9) {
      //       Craps.wonBet(Math.floor(Craps.bet.odds.nine.amt * (3/2)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.odds.nine.amt);
      //       Craps.bet.odds.nine.amt = 0;
      //     }
      //   } else {
      //     if(call === 7) { // take down
      //       Craps.purse.amount += Craps.bet.odds.nine.amt;
      //       Craps.bet.odds.nine.amt = 0;
      //     }
      //   }
      // }

    },

    comeodds10: function() {

      // if(Craps.bet.odds.ten.amt) {
      //   if(Craps.bet.odds.ten.working) {
      //     if(call === 10) {
      //       Craps.wonBet(Math.floor(Craps.bet.odds.ten.amt * (2/1)));
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.odds.ten.amt);
      //       Craps.bet.odds.ten.amt = 0;
      //     }
      //   } else {
      //     if(call === 7) { // take down
      //       Craps.purse.amount += Craps.bet.odds.ten.amt;
      //       Craps.bet.odds.ten.amt = 0;
      //     }
      //   }
      // }

    },

    lay4: function() {

      // if(Craps.bet.lay.four.amt) {
      //   if(Craps.bet.lay.four.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Math.ceil((Craps.bet.lay.four.amt * (1/2)) - (Craps.bet.lay.four.amt * 0.05)));
      //     }
      //     if(call === 4) {
      //       Craps.lostBet(Craps.bet.lay.four.amt);
      //       Craps.bet.lay.four.amt = 0;
      //     }
      //   }
      // }

    },

    lay5: function() {

      // if(Craps.bet.lay.five.amt) {
      //   if(Craps.bet.lay.five.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Math.ceil((Craps.bet.lay.five.amt * (2/3)) - (Craps.bet.lay.five.amt * 0.05)));
      //     }
      //     if(call === 5) {
      //       Craps.lostBet(Craps.bet.lay.five.amt);
      //       Craps.bet.lay.five.amt = 0;
      //     }
      //   }
      // }

    },

    lay6: function() {

      // if(Craps.bet.lay.six.amt) {
      //   if(Craps.bet.lay.six.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Math.ceil((Craps.bet.lay.six.amt * (5/6)) - (Craps.bet.lay.six.amt * 0.05)));
      //     }
      //     if(call === 6) {
      //       Craps.lostBet(Craps.bet.lay.six.amt);
      //       Craps.bet.lay.six.amt = 0;
      //     }
      //   }
      // }

    },

    lay8: function() {

      // if(Craps.bet.lay.eight.amt) {
      //   if(Craps.bet.lay.eight.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Math.ceil((Craps.bet.lay.eight.amt * (5/6)) - (Craps.bet.lay.eight.amt * 0.05)));
      //     }
      //     if(call === 8) {
      //       Craps.lostBet(Craps.bet.lay.eight.amt);
      //       Craps.bet.lay.eight.amt = 0;
      //     }
      //   }
      // }

    },

    lay9: function() {

      // if(Craps.bet.lay.nine.amt) {
      //   if(Craps.bet.lay.nine.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Math.ceil((Craps.bet.lay.nine.amt * (2/3)) - (Craps.bet.lay.nine.amt * 0.05)));
      //     }
      //     if(call === 9) {
      //       Craps.lostBet(Craps.bet.lay.nine.amt);
      //       Craps.bet.lay.nine.amt = 0;
      //     }
      //   }
      // }

    },

    lay10: function() {

      // if(Craps.bet.lay.ten.amt) {
      //   if(Craps.bet.lay.ten.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Math.ceil((Craps.bet.lay.ten.amt * (1/2)) - (Craps.bet.lay.ten.amt * 0.05)));
      //     }
      //     if(call === 10) {
      //       Craps.lostBet(Craps.bet.lay.ten.amt);
      //       Craps.bet.lay.ten.amt = 0;
      //     }
      //   }
      // }

    },

    dontcome4: function() {

      // if(Craps.bet.dontCome.four.amt) {
      //   if(Craps.bet.dontCome.four.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Craps.bet.dontCome.four.amt);
      //       Craps.purse.amount += Craps.bet.dontCome.four.amt; // take down
      //       Craps.bet.dontCome.four.amt = 0;
      //     }
      //     if(call === 4) {
      //       Craps.lostBet(Craps.bet.dontCome.four.amt);
      //       Craps.bet.dontCome.four.amt = 0;
      //     }
      //   }
      // }

    },

    dontcome5: function() {

      // if(Craps.bet.dontCome.five.amt) {
      //   if(Craps.bet.dontCome.five.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Craps.bet.dontCome.five.amt);
      //       Craps.purse.amount += Craps.bet.dontCome.five.amt; // take down
      //       Craps.bet.dontCome.five.amt = 0;
      //     }
      //     if(call === 5) {
      //       Craps.lostBet(Craps.bet.dontCome.five.amt);
      //       Craps.bet.dontCome.five.amt = 0;
      //     }
      //   }
      // }

    },

    dontcome6: function() {

      // if(Craps.bet.dontCome.six.amt) {
      //   if(Craps.bet.dontCome.six.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Craps.bet.dontCome.six.amt);
      //       Craps.purse.amount += Craps.bet.dontCome.six.amt; // take down
      //       Craps.bet.dontCome.six.amt = 0;
      //     }
      //     if(call === 6) {
      //       Craps.lostBet(Craps.bet.dontCome.six.amt);
      //       Craps.bet.dontCome.six.amt = 0;
      //     }
      //   }
      // }

    },

    dontcome8: function() {

      // if(Craps.bet.dontCome.eight.amt) {
      //   if(Craps.bet.dontCome.eight.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Craps.bet.dontCome.eight.amt);
      //       Craps.purse.amount += Craps.bet.dontCome.eight.amt; // take down
      //       Craps.bet.dontCome.eight.amt = 0;
      //     }
      //     if(call === 8) {
      //       Craps.lostBet(Craps.bet.dontCome.eight.amt);
      //       Craps.bet.dontCome.eight.amt = 0;
      //     }
      //   }
      // }
      //
    },

    dontcome9: function() {

      // if(Craps.bet.dontCome.nine.amt) {
      //   if(Craps.bet.dontCome.nine.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Craps.bet.dontCome.nine.amt);
      //       Craps.purse.amount += Craps.bet.dontCome.nine.amt; // take down
      //       Craps.bet.dontCome.nine.amt = 0;
      //     }
      //     if(call === 9) {
      //       Craps.lostBet(Craps.bet.dontCome.nine.amt);
      //       Craps.bet.dontCome.nine.amt = 0;
      //     }
      //   }
      // }

    },

    dontcome10: function() {

      // if(Craps.bet.dontCome.ten.amt) {
      //   if(Craps.bet.dontCome.ten.working) {
      //     if(call === 7) {
      //       Craps.wonBet(Craps.bet.dontCome.ten.amt);
      //       Craps.purse.amount += Craps.bet.dontCome.ten.amt; // take down
      //       Craps.bet.dontCome.ten.amt = 0;
      //     }
      //     if(call === 10) {
      //       Craps.lostBet(Craps.bet.dontCome.ten.amt);
      //       Craps.bet.dontCome.ten.amt = 0;
      //     }
      //   }
      // }

    },

    dontcomeodds4: function() {

    },

    dontcomeodds5: function() {

    },

    dontcomeodds6: function() {

    },

    dontcomeodds8: function() {

    },

    dontcomeodds9: function() {

    },

    dontcomeodds10: function() {

    },

    hard4: function() {

      // if(Craps.bet.hard.four.amt) {
      //   if(Craps.bet.hard.four.working) {
      //     if(call === 4) {
      //       if(Craps.dice[0] === 2 && Craps.dice[1] === 2) {
      //         Craps.wonBet(Math.floor(Craps.bet.hard.four.amt * (7/1)));
      //       } else {
      //         Craps.lostBet(Craps.bet.hard.four.amt);
      //         Craps.bet.hard.four.amt = 0;
      //       }
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.hard.four.amt);
      //       Craps.bet.hard.four.amt = 0;
      //     }
      //   }
      // }

    },

    hard6: function() {

      // if(Craps.bet.hard.six.amt) {
      //   if(Craps.bet.hard.six.working) {
      //     if(call === 6) {
      //       if(Craps.dice[0] === 3 && Craps.dice[1] === 3) {
      //         Craps.wonBet(Math.floor(Craps.bet.hard.six.amt * (9/1)));
      //       } else {
      //         Craps.lostBet(Craps.bet.hard.six.amt);
      //         Craps.bet.hard.six.amt = 0;
      //       }
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.hard.six.amt);
      //       Craps.bet.hard.six.amt = 0;
      //     }
      //   }
      // }

    },

    hard8: function() {

      // if(Craps.bet.hard.eight.amt) {
      //   if(Craps.bet.hard.eight.working) {
      //     if(call === 8) {
      //       if(Craps.dice[0] === 4 && Craps.dice[1] === 4) {
      //         Craps.wonBet(Math.floor(Craps.bet.hard.eight.amt * (9/1)));
      //       } else {
      //         Craps.lostBet(Craps.bet.hard.eight.amt);
      //         Craps.bet.hard.eight.amt = 0;
      //       }
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.hard.eight.amt);
      //       Craps.bet.hard.eight.amt = 0;
      //     }
      //   }
      // }

    },

    hard10: function() {

      // if(Craps.bet.hard.ten.amt) {
      //   if(Craps.bet.hard.ten.working) {
      //     if(call === 10) {
      //       if(Craps.dice[0] === 5 && Craps.dice[1] === 5) {
      //         Craps.wonBet(Math.floor(Craps.bet.hard.ten.amt * (7/1)));
      //       } else {
      //         Craps.lostBet(Craps.bet.hard.ten.amt);
      //         Craps.bet.hard.ten.amt = 0;
      //       }
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.hard.ten.amt);
      //       Craps.bet.hard.ten.amt = 0;
      //     }
      //   }
      // }

    },

    craps: function() {

      // if(Craps.bet.craps.amt) {
      //   if(Craps.bet.craps.working) {
      //     if(call === 2 || call === 3 || call === 12) {
      //       Craps.wonBet(Math.floor(Craps.bet.craps.amt *(7/1)));
      //     } else {
      //       Craps.lostBet(Craps.bet.craps.amt);
      //       Craps.bet.craps.amt = 0;
      //     }
      //   }
      // }

    },

    yo11: function() {

      // if(Craps.bet.yo.amt) {
      //   if(Craps.bet.yo.working) {
      //     if(call === 11) {
      //       Craps.wonBet(Math.floor(Craps.bet.yo.amt * (15/1)));
      //     } else {
      //       Craps.lostBet(Craps.bet.yo.amt);
      //       Craps.bet.yo.amt = 0;
      //     }
      //   }
      // }

    },

    field: function() {

      // if(Craps.bet.field.amt) {
      //   if(Craps.bet.field.working) {
      //     if(call === 2) {
      //       Craps.wonBet(Craps.bet.field.amt * 2);
      //     } else if(call === 3) {
      //       Craps.wonBet(Craps.bet.field.amt);
      //     } else if(call === 4) {
      //       Craps.wonBet(Craps.bet.field.amt);
      //     } else if(call === 9) {
      //       Craps.wonBet(Craps.bet.field.amt);
      //     } else if(call === 10) {
      //       Craps.wonBet(Craps.bet.field.amt);
      //     } else if(call === 11) {
      //       Craps.wonBet(Craps.bet.field.amt);
      //     } else if(call === 12) {
      //       Craps.wonBet(Craps.bet.field.amt * 2);
      //     } else {
      //       Craps.lostBet(Craps.bet.field.amt);
      //       Craps.bet.field.amt = 0;
      //     }
      //   }
      // }

    },

    big6: function() {

      // if(Craps.bet.big.six.amt) {
      //   if(Craps.bet.big.six.working) {
      //     if(call === 6) {
      //       Craps.wonBet(Craps.bet.big.six.amt);
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.big.six.amt);
      //       Craps.bet.big.six.amt = 0;
      //     }
      //   }
      // }

    },

    big8: function() {

      // if(Craps.bet.big.eight.amt) {
      //   if(Craps.bet.big.eight.working) {
      //     if(call === 8) {
      //       Craps.wonBet(Craps.bet.big.eight.amt);
      //     }
      //     if(call === 7) {
      //       Craps.lostBet(Craps.bet.big.eight.amt);
      //       Craps.bet.big.eight.amt = 0;
      //     }
      //   }
      // }

    }

  };

})(jQuery);
