var Table = {};

(function($) {

  Table = {

    bet: {

      passline: { amount: 100, working: 1, count: 0 },
      passlineodds: { amount: 0, working: 1, count: 0 },
      dontpass: { amount: 0, working: 1, count: 0 },
      dontpassodds: { amount: 0, working: 1, count: 0 },
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

      come4: { amount: 0, working: 0, count: 0 },
      come5: { amount: 0, working: 0, count: 0 },
      come6: { amount: 0, working: 0, count: 0 },
      come8: { amount: 0, working: 0, count: 0 },
      come9: { amount: 0, working: 0, count: 0 },
      come10: { amount: 0, working: 0, count: 0 },

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

      dontcome4: { amount: 0, working: 0, count: 0 },
      dontcome5: { amount: 0, working: 0, count: 0 },
      dontcome6: { amount: 0, working: 0, count: 0 },
      dontcome8: { amount: 0, working: 0, count: 0 },
      dontcome9: { amount: 0, working: 0, count: 0 },
      dontcome10: { amount: 0, working: 0, count: 0 },

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

      craps: { amount: 0, working: 0, count: 0 },
      yo11: { amount: 0, working: 0, count: 0 },

      field: { amount: 0, working: 0, count: 0 },
      big6: { amount: 0, working: 0, count: 0 },
      big8: { amount: 0, working: 0, count: 0 },

    },

    init: function () {

      console.log(Table.bet);

    },

    placeBet: function(array) {

      // cycle through the array [name, amount]
      // 1. remove amount from purse
      // 2. add amount to the bet object
      // 3. display the bet on the HTML table

    },

    takeDownBet: function(array) {

      // cycle through the array [name, amount]
      // 1. add amount to the purse
      // 2. remove the amount from the bet object
      // 3. remove the bet from the HTML table

    },

    movePuck: function() {

      if(Craps.point) { // if the point is established (ON)

        if(Craps.call === 7 || Craps.call === Craps.point) { // seven out or hit the point

          Craps.point = 0;
          Craps.count = 0;

          // Turn off bets
          Craps.bet.newCome.working = 0;
          Craps.bet.passLineOdds.working = 0;
          Craps.bet.dontPassOdds.working = 0;
          Craps.bet.newDontCome.working = 0;

          // Turn off place bets
          Craps.bet.place.four.working = 0;
          Craps.bet.place.five.working = 0;
          Craps.bet.place.six.working = 0;
          Craps.bet.place.eight.working = 0;
          Craps.bet.place.nine.working = 0;
          Craps.bet.place.ten.working = 0;

          // Turn off buy bets
          Craps.bet.buy.four.working = 0;
          Craps.bet.buy.five.working = 0;
          Craps.bet.buy.six.working = 0;
          Craps.bet.buy.eight.working = 0;
          Craps.bet.buy.nine.working = 0;
          Craps.bet.buy.ten.working = 0;

          // Turn off lay bets
          Craps.bet.lay.four.working = 0;
          Craps.bet.lay.five.working = 0;
          Craps.bet.lay.six.working = 0;
          Craps.bet.lay.eight.working = 0;
          Craps.bet.lay.nine.working = 0;
          Craps.bet.lay.ten.working = 0;

          // Turn off odds bets
          Craps.bet.odds.four.working = 0;
          Craps.bet.odds.five.working = 0;
          Craps.bet.odds.six.working = 0;
          Craps.bet.odds.eight.working = 0;
          Craps.bet.odds.nine.working = 0;
          Craps.bet.odds.ten.working = 0;

          // Turn off don't come bets
          Craps.bet.dontCome.four.working = 0;
          Craps.bet.dontCome.five.working = 0;
          Craps.bet.dontCome.six.working = 0;
          Craps.bet.dontCome.eight.working = 0;
          Craps.bet.dontCome.nine.working = 0;
          Craps.bet.dontCome.ten.working = 0;

          // Turn off hard bets
          Craps.bet.hard.four.working = 0;
          Craps.bet.hard.six.working = 0;
          Craps.bet.hard.eight.working = 0;
          Craps.bet.hard.ten.working = 0;

        } else if(Craps.call !== 2 && Craps.call !== 3 && Craps.call !== 11) {

          Craps.count += 1 // count the rolls between 7's

        }

      } else { // if the point is not estableshed (OFF)

        if(Craps.call === 4 || Craps.call === 5 || Craps.call === 6 || Craps.call === 8 || Craps.call === 9 || Craps.call === 10) { // establish point

          Craps.point = Craps.call;
          Craps.count += 1; // count the rolls between 7's

          // Turn on bets
          Craps.bet.newCome.working = 1;
          Craps.bet.passLineOdds.working = 1;
          Craps.bet.dontPassOdds.working = 1;
          Craps.bet.newDontCome.working = 1;

          // Turn on place bets
          Craps.bet.place.four.working = 1;
          Craps.bet.place.five.working = 1;
          Craps.bet.place.six.working = 1;
          Craps.bet.place.eight.working = 1;
          Craps.bet.place.nine.working = 1;
          Craps.bet.place.ten.working = 1;

          // Turn on buy bets
          Craps.bet.buy.four.working = 1;
          Craps.bet.buy.five.working = 1;
          Craps.bet.buy.six.working = 1;
          Craps.bet.buy.eight.working = 1;
          Craps.bet.buy.nine.working = 1;
          Craps.bet.buy.ten.working = 1;

          // Turn on lay bets
          Craps.bet.lay.four.working = 1;
          Craps.bet.lay.five.working = 1;
          Craps.bet.lay.six.working = 1;
          Craps.bet.lay.eight.working = 1;
          Craps.bet.lay.nine.working = 1;
          Craps.bet.lay.ten.working = 1;

          // Turn on odds bets
          Craps.bet.odds.four.working = 1;
          Craps.bet.odds.five.working = 1;
          Craps.bet.odds.six.working = 1;
          Craps.bet.odds.eight.working = 1;
          Craps.bet.odds.nine.working = 1;
          Craps.bet.odds.ten.working = 1;

          // Turn on don't come bets
          Craps.bet.dontCome.four.working = 1;
          Craps.bet.dontCome.five.working = 1;
          Craps.bet.dontCome.six.working = 1;
          Craps.bet.dontCome.eight.working = 1;
          Craps.bet.dontCome.nine.working = 1;
          Craps.bet.dontCome.ten.working = 1;

          // Turn on hard bets
          Craps.bet.hard.four.working = 1;
          Craps.bet.hard.six.working = 1;
          Craps.bet.hard.eight.working = 1;
          Craps.bet.hard.ten.working = 1;

        }

      }

    }

  };

})(jQuery);
