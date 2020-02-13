var Calc = {};

(function($) {

  Calc = {

    init: function() {

      // Do nothing

    },

    run: function(bets, dice, point) { // array of bets e.g. ['passline', 'dontpass']; array of dice e.g. [3,5]

      var q = {};

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

        if(takedown) Calc.takedown(key);

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

    takedown: function(key) {

      console.log('take down $' + Table.bet[key].amount);
      // Craps.purse.amount += Table.bet[key].amount;
      // Table.bet[key].amount = 0;

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

    place: function(key, num) {

      var bet = Table.bet[key];
      var call = Craps.call;
      var point = Craps.point;
      var ref = { 4:0, 5:1, 6:2, 8:2, 9:1, 10:0 };
      var calc = [];

      calc.push(Math.floor(bet.amount * (9/5))); // 4, 10
      calc.push(Math.floor(bet.amount * (7/5))); // 5, 9
      calc.push(Math.floor(bet.amount * (7/6))); // 6, 8

      if(bet.amount && num in ref) {
        if(point) { // ON
          if(bet.working) {
            switch(call) {
              case num: Calc.win(key, calc[ref[num]]); break;
              case 7: Calc.lose(key); break;
            }
          }
        } else { // OFF
          if(bet.working) {
            switch(call) {
              case num: Calc.win(key, calc[ref[num]]); break;
              case 7: Calc.lose(key); break;
            }
          } else {
            switch(call) {
              case num: Calc.takedown(key); break;
            }
          }
        }
      }

    },

    place4: function() {
      Calc.place('place4', 4);
    },

    place5: function() {
      Calc.place('place5', 5);
    },

    place6: function() {
      Calc.place('place6', 6);
    },

    place8: function() {
      Calc.place('place8', 8);
    },

    place9: function() {
      Calc.place('place9', 9);
    },

    place10: function() {
      Calc.place('place10', 10);
    },

    buy: function(key, num) {

      var bet = Table.bet[key];
      var call = Craps.call;
      var point = Craps.point;
      var ref = { 4:0, 5:1, 6:2, 8:2, 9:1, 10:0 };
      var calc = [];

      calc.push(Math.ceil((bet.amount * (2/1)) - (bet.amount * 0.05))); // 4, 10
      calc.push(Math.ceil((bet.amount * (3/2)) - (bet.amount * 0.05))); // 5, 9
      calc.push(Math.ceil((bet.amount * (6/5)) - (bet.amount * 0.05))); // 6, 8

      if(bet.amount && num in ref) {
        if(point) { // ON
          if(bet.working) {
            switch(call) {
              case num: Calc.win(key, calc[ref[num]]); break;
              case 7: Calc.lose(key); break;
            }
          }
        } else { // OFF
          if(bet.working) {
            switch(call) {
              case num: Calc.win(key, calc[ref[num]]); break;
              case 7: Calc.lose(key); break;
            }
          } else {
            switch(call) {
              case num: Calc.takedown(key); break;
            }
          }
        }
      }

    },

    buy4: function() {
      Calc.buy('buy4', 4);
    },

    buy5: function() {
      Calc.buy('buy5', 5);
    },

    buy6: function() {
      Calc.buy('buy6', 6);
    },

    buy8: function() {
      Calc.buy('buy8', 8);
    },

    buy9: function() {
      Calc.buy('buy9', 9);
    },

    buy10: function() {
      Calc.buy('buy10', 10);
    },

    come: function(key, num) {

      var bet = Table.bet[key];
      var call = Craps.call;
      var point = Craps.point;
      var ref = [ 4, 5, 6, 8, 9, 10 ];

      if(bet.amount && ref.includes(num)) {
        if(point) { // ON
          if(bet.working) {
            switch(call) {
              case num: Calc.win(key, bet.amount); break;
              case 7: Calc.lose(key); break;
            }
          }
        } else { // OFF
          if(bet.working) {
            switch(call) {
              case num: Calc.win(key, bet.amount, true); break;
              case 7: Calc.lose(key); break;
            }
          } else {
            switch(call) {
              case num: Calc.takedown(key);
            }
          }
        }
      }

    },

    come4: function() {
      Calc.come('come4', 4);
    },

    come5: function() {
      Calc.come('come5', 5);
    },

    come6: function() {
      Calc.come('come6', 6);
    },

    come8: function() {
      Calc.come('come8', 8);
    },

    come9: function() {
      Calc.come('come9', 9);
    },

    come10: function() {
      Calc.come('come10', 10);
    },

    comeodds: function(key, num) {

      var bet = Table.bet[key];
      var call = Craps.call;
      var point = Craps.point;
      var ref = { 4:0, 5:1, 6:2, 8:2, 9:1, 10:0 };
      var calc = [];

      calc.push(Math.floor(bet.amount * (2/1))); // 4, 10
      calc.push(Math.floor(bet.amount * (3/2))); // 5, 9
      calc.push(Math.floor(bet.amount * (6/5))); // 6, 8

      if(bet.amount && num in ref) {
        if(point) { // ON
          if(bet.working) {
            switch(call) {
              case num: Calc.win(key, calc[ref[num]]); break;
              case 7: Calc.lose(key); break;
            }
          }
        } else { // OFF
          if(bet.working) {
            switch(call) {
              case num: Calc.win(key, calc[ref[num]], true); break;
              case 7: Calc.takedown(key); break;
            }
          } else {
            switch(call) {
              case num: Calc.takedown(key); break;
            }
          }
        }
      }

    },

    comeodds4: function() {
      Calc.comeodds('comeodds4', 4);
    },

    comeodds5: function() {
      Calc.comeodds('comeodds5', 5);
    },

    comeodds6: function() {
      Calc.comeodds('comeodds6', 6);
    },

    comeodds8: function() {
      Calc.comeodds('comeodds8', 8);
    },

    comeodds9: function() {
      Calc.comeodds('comeodds9', 9);
    },

    comeodds10: function() {
      Calc.comeodds('comeodds10', 10);
    },

    lay: function(key, num) {

      var bet = Table.bet[key];
      var call = Craps.call;
      var point = Craps.point;
      var ref = { 4:0, 5:1, 6:2, 8:2, 9:1, 10:0 };
      var calc = [];

      calc.push(Math.ceil((bet.amount * (1/2)) - (bet.amount * 0.05))); // 4, 10
      calc.push(Math.ceil((bet.amount * (2/3)) - (bet.amount * 0.05))); // 5, 9
      calc.push(Math.ceil((bet.amount * (5/6)) - (bet.amount * 0.05))); // 6, 8


      // if(bet.amount && num in ref) {
      //   if(point) { // ON
      //     if(bet.working) {
      //       switch(call) {
      //         case num: Calc.win(key, calc[ref[num]]); break;
      //         case 7: Calc.lose(key); break;
      //       }
      //     }
      //   } else { // OFF
      //     if(bet.working) {
      //       switch(call) {
      //         case num: Calc.win(key, calc[ref[num]], true); break;
      //         case 7: Calc.takedown(key); break;
      //       }
      //     } else {
      //       switch(call) {
      //         case num: Calc.takedown(key); break;
      //       }
      //     }
      //   }
      // }

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

    lay4: function() {
      Calc.lay('lay4', 4);
    },

    lay5: function() {
      Calc.lay('lay5', 5);
    },

    lay6: function() {
      Calc.lay('lay6', 6);
    },

    lay8: function() {
      Calc.lay('lay8', 8);
    },

    lay9: function() {
      Calc.lay('lay9', 9);
    },

    lay10: function() {
      Calc.lay('lay10', 10);
    },

    dontcome: function(key, num) {



    },

    dontcome4: function() {
      Calc.dontcome('dontcome4', 4);

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
      Calc.dontcome('dontcome5', 5);

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
      Calc.dontcome('dontcome6', 6);

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
      Calc.dontcome('dontcome8', 8);

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
      Calc.dontcome('dontcome9', 9);

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
      Calc.dontcome('dontcome10', 10);

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

    dontcomeodds: function(key, num) {



    },

    dontcomeodds4: function() {
      Calc.dontcomeodds('dontcomeodds4', 4);
    },

    dontcomeodds5: function() {
      Calc.dontcomeodds('dontcomeodds5', 5);
    },

    dontcomeodds6: function() {
      Calc.dontcomeodds('dontcomeodds6', 6);
    },

    dontcomeodds8: function() {
      Calc.dontcomeodds('dontcomeodds8', 8);
    },

    dontcomeodds9: function() {
      Calc.dontcomeodds('dontcomeodds9', 9);
    },

    dontcomeodds10: function() {
      Calc.dontcomeodds('dontcomeodds10', 10);
    },

    hard: function(key, num) {



    },

    hard4: function() {
      Calc.hard('hard4', 4);

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
      Calc.hard('hard6', 6);

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
      Calc.hard('hard8', 8);

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
      Calc.hard('hard10', 10);

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

    big: function(key, num) {



    },

    big6: function() {
      Calc.big('big6', 6);

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
      Calc.big('big8', 8);

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
