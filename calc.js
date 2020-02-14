let Calc = {};

(function($) {

  Calc = {

    init: function() {

      // Do nothing

    },

    run: function(bets, dice, point) { // array of bets e.g. ['passline', 'dontpass']; array of dice e.g. [3,5]

      let q = {};

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

      let key = 'passline';
      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;

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

      let key = 'passlineodds';
      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;
      let calc = [];

      calc.push(Math.floor(bet.amount * (2/1))); // 4, 10
      calc.push(Math.floor(bet.amount * (3/2))); // 5, 9
      calc.push(Math.floor(bet.amount * (6/5))); // 6, 8

      if(bet.amount && bet.working) {
        if(point) {
          if(call === point) {
            switch(call) {
              case 4: Calc.win(key, calc[0], true); break;
              case 5: Calc.win(key, calc[1], true); break;
              case 6: Calc.win(key, calc[2], true); break;
              case 8: Calc.win(key, calc[2], true); break;
              case 9: Calc.win(key, calc[1], true); break;
              case 10: Calc.win(key, calc[0], true); break;
            }
          }
          if(call === 7) Calc.lose(key);
        }
      }

    },

    dontpass: function() {

      let key = 'dontpass';
      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;

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

      let key = 'dontpassodds';
      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;
      let calc = [];

      calc.push(Math.floor(bet.amount * (1/2))); // 4, 10
      calc.push(Math.floor(bet.amount * (2/3))); // 5, 9
      calc.push(Math.floor(bet.amount * (5/6))); // 6, 8

      if(bet.amount && bet.working) {
        if(point) {
          if(call === 7) {
            switch(point) {
              case 4: Calc.win(key, calc[0], true); break;
              case 5: Calc.win(key, calc[1], true); break;
              case 6: Calc.win(key, calc[2], true); break;
              case 8: Calc.win(key, calc[2], true); break;
              case 9: Calc.win(key, calc[1], true); break;
              case 10: Calc.win(key, calc[0], true); break;
            }
          }
          if(call === point) Calc.lose(key);
        }
      }

    },

    newcome: function() {

      let key = 'newcome';
      let bet = Table.bet[key];
      let call = Craps.call;

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

      let key = 'newdontcome';
      let bet = Table.bet[key];
      let call = Craps.call;

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

      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;
      let ref = { 4:0, 5:1, 6:2, 8:2, 9:1, 10:0 };
      let calc = [];

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

      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;
      let ref = { 4:0, 5:1, 6:2, 8:2, 9:1, 10:0 };
      let calc = [];

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

      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;
      let ref = [ 4, 5, 6, 8, 9, 10 ];

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

      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;
      let ref = { 4:0, 5:1, 6:2, 8:2, 9:1, 10:0 };
      let calc = [];

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

      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;
      let ref = { 4:0, 5:1, 6:2, 8:2, 9:1, 10:0 };
      let calc = [];

      calc.push(Math.ceil((bet.amount * (1/2)) - (bet.amount * 0.05))); // 4, 10
      calc.push(Math.ceil((bet.amount * (2/3)) - (bet.amount * 0.05))); // 5, 9
      calc.push(Math.ceil((bet.amount * (5/6)) - (bet.amount * 0.05))); // 6, 8

      if(bet.amount && num in ref) {
        if(point) { // ON
          if(bet.working) {
            switch(call) {
              case 7: Calc.win(key, calc[ref[num]]); break;
              case num: Calc.lose(key); break;
            }
          }
        } else { // OFF
          if(bet.working) {
            switch(call) {
              case 7: Calc.win(key, calc[ref[num]]); break;
              case num: Calc.lose(key); break;
            }
          }
        }
      }

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

      let bet = Table.bet[key];
      let call = Craps.call;
      let point = Craps.point;
      let ref = [ 4, 5, 6, 8, 9, 10 ];

      if(bet.amount && ref.includes(num)) {
        if(point) { // ON
          if(bet.working) {
            switch(call) {
              case 7: Calc.win(key, bet.amount); break;
              case num: Calc.lose(key); break;
            }
          }
        } else { // OFF
          if(bet.working) {
            switch(call) {
              case 7: Calc.win(key, bet.amount); break;
              case num: Calc.lose(key); break;
            }
          }
        }
      }

    },

    dontcome4: function() {
      Calc.dontcome('dontcome4', 4);
    },

    dontcome5: function() {
      Calc.dontcome('dontcome5', 5);
    },

    dontcome6: function() {
      Calc.dontcome('dontcome6', 6);
    },

    dontcome8: function() {
      Calc.dontcome('dontcome8', 8);
    },

    dontcome9: function() {
      Calc.dontcome('dontcome9', 9);
    },

    dontcome10: function() {
      Calc.dontcome('dontcome10', 10);
    },

    dontcomeodds: function(key, num) {

      let bet = Table.bet[key];
      let call = Craps.call;
      let ref = { 4:0, 5:1, 6:2, 8:2, 9:1, 10:0 };
      let calc = [];

      calc.push(Math.floor(bet.amount * (1/2))); // 4, 10
      calc.push(Math.floor(bet.amount * (2/3))); // 5, 9
      calc.push(Math.floor(bet.amount * (5/6))); // 6, 8

      if(bet.amount && num in ref) {
        if(bet.working) {
          switch(call) {
            case 7: Calc.win(key, calc[ref[num]]); break;
            case num: Calc.lose(key); break;
          }
        } else {
          switch(call) {
            case num: Calc.takedown(key); break;
          }
        }
      }

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

      let bet = Table.bet[key];
      let dice = Craps.dice;
      let call = Craps.call;
      let hard = false;
      let ref = { 4:1, 6:0, 8:0, 10:1 };
      let calc = [];

      calc.push(Math.floor(bet.amount * (9/1))); // 6, 8
      calc.push(Math.floor(bet.amount * (7/1))); // 4, 10

      if(dice[0] === dice[1]) hard = true;

      if(bet.amount && bet.working && num in ref) {
        if(hard) {
          switch(call) {
            case num: Calc.win(key, calc[ref[num]]); break;
            case 7: Calc.lose(key); break;
          }
        } else {
          switch(call) {
            case num: Calc.lose(key); break;
            case 7: Calc.lose(key); break;
          }
        }
      }

    },

    hard4: function() {
      Calc.hard('hard4', 4);
    },

    hard6: function() {
      Calc.hard('hard6', 6);
    },

    hard8: function() {
      Calc.hard('hard8', 8);
    },

    hard10: function() {
      Calc.hard('hard10', 10);
    },

    craps: function() {

      let key = 'craps';
      let bet = Table.bet[key];
      let call = Craps.call;
      let calc = [];

      calc.push(Math.floor(bet.amount * (7/1)));

      if(bet.amount && bet.working) {
        switch(call) {
          case 2: Calc.win(key, calc[0]); break;
          case 3: Calc.win(key, calc[0]); break;
          case 12: Calc.win(key, calc[0]); break;
          default: Calc.lose(key);
        }
      }

    },

    yo11: function() {

      let key = 'yo11';
      let bet = Table.bet[key];
      let call = Craps.call;
      let calc = [];

      calc.push(Math.floor(bet.amount * (15/1)));

      if(bet.amount && bet.working) {
        switch(call) {
          case 11: Calc.win(key, calc[0]); break;
          default: Calc.lose(key);
        }
      }

    },

    field: function() {

      let key = 'field';
      let bet = Table.bet[key];
      let call = Craps.call;
      let calc = [];

      calc.push(Math.floor(bet.amount * 2)); // 2, 12
      calc.push(Math.floor(bet.amount)); // 3, 4, 9, 10, 11

      if(bet.amount && bet.working) {
        switch(call) {
          case 2: Calc.win(key, calc[0]); break;
          case 3: Calc.win(key, calc[1]); break;
          case 4: Calc.win(key, calc[1]); break;
          case 9: Calc.win(key, calc[1]); break;
          case 10: Calc.win(key, calc[1]); break;
          case 11: Calc.win(key, calc[1]); break;
          case 12: Calc.win(key, calc[0]); break;
          default: Calc.lose(key);
        }
      }

    },

    big: function(key, num) {

      let bet = Table.bet[key];
      let call = Craps.call;
      let ref = [ 6, 8 ];

      if(bet.amount && bet.working && ref.includes(num)) {
        switch(call) {
          case num: Calc.win(key, bet.amount); break;
          case 7: Calc.lose(key); break;
        }
      }

    },

    big6: function() {
      Calc.big('big6', 6);
    },

    big8: function() {
      Calc.big('big8', 8);
    }

  };

})(jQuery);
