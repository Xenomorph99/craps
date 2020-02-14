let Table = {};

(function($) {

  Table = {

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

      craps: { amount: 0, working: 0, count: 0 },
      yo11: { amount: 0, working: 0, count: 0 },

      field: { amount: 0, working: 0, count: 0 },
      big6: { amount: 0, working: 0, count: 0 },
      big8: { amount: 0, working: 0, count: 0 },

    },

    init: function () {

      //console.log(Table.bet);
      Table.refresh();

    },

    refresh: function() {

      for(key in Table.bet) {
        $('#bet-' + key).text(Table.bet[key].amount);
      }

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

      Table.refresh();

      // if(Craps.point) { // if the point is established (ON)
      //
      //   if(Craps.call === 7 || Craps.call === Craps.point) { // seven out or hit the point
      //
      //     // [
      //     //   'newcome',
      //     //   'passlineodds',
      //     //   'dontpassodds',
      //     //   'newdontcome',
      //     //   'place4',
      //     //   'place5',
      //     //   'place6',
      //     //   'place8',
      //     //   'place9',
      //     //   'place10',
      //     //   'buy4',
      //     //   'buy5',
      //     //   'buy6',
      //     //   'buy8',
      //     //   'buy9',
      //     //   'buy10',
      //     //   'lay4',
      //     //   'lay5',
      //     //   'lay6',
      //     //   'lay8',
      //     //   'lay9',
      //     //   'lay10',
      //     //   'odds4',
      //     //   'odds5',
      //     //   'odds6',
      //     //   'odds8',
      //     //   'odds9',
      //     //   'odds10',
      //     //   'dontcome4',
      //     //   'dontcome5',
      //     //   'dontcome6',
      //     //   'dontcome8',
      //     //   'dontcome9',
      //     //   'dontcome10',
      //     //   'dontcomeodds4',
      //     //   'dontcomeodds5',
      //     //   'dontcomeodds6',
      //     //   'dontcomeodds8',
      //     //   'dontcomeodds9',
      //     //   'dontcomeodds10',
      //     //   'hard4',
      //     //   'hard6',
      //     //   'hard8',
      //     //   'hard10',
      //     // ]
      //
      //     Craps.point = 0;
      //     Craps.count = 0;
      //
      //
      //
      //   } else if(Craps.call !== 2 && Craps.call !== 3 && Craps.call !== 11) {
      //
      //     Craps.count += 1 // count the rolls between 7's
      //
      //   }
      //
      // } else { // if the point is not estableshed (OFF)
      //
      //   if(Craps.call === 4 || Craps.call === 5 || Craps.call === 6 || Craps.call === 8 || Craps.call === 9 || Craps.call === 10) { // establish point
      //
      //     Craps.point = Craps.call;
      //     Craps.count += 1; // count the rolls between 7's
      //
      //     // // Turn on bets
      //     // Craps.bet.newCome.working = 1;
      //     // Craps.bet.passLineOdds.working = 1;
      //     // Craps.bet.dontPassOdds.working = 1;
      //     // Craps.bet.newDontCome.working = 1;
      //     //
      //     // // Turn on place bets
      //     // Craps.bet.place.four.working = 1;
      //     // Craps.bet.place.five.working = 1;
      //     // Craps.bet.place.six.working = 1;
      //     // Craps.bet.place.eight.working = 1;
      //     // Craps.bet.place.nine.working = 1;
      //     // Craps.bet.place.ten.working = 1;
      //     //
      //     // // Turn on buy bets
      //     // Craps.bet.buy.four.working = 1;
      //     // Craps.bet.buy.five.working = 1;
      //     // Craps.bet.buy.six.working = 1;
      //     // Craps.bet.buy.eight.working = 1;
      //     // Craps.bet.buy.nine.working = 1;
      //     // Craps.bet.buy.ten.working = 1;
      //     //
      //     // // Turn on lay bets
      //     // Craps.bet.lay.four.working = 1;
      //     // Craps.bet.lay.five.working = 1;
      //     // Craps.bet.lay.six.working = 1;
      //     // Craps.bet.lay.eight.working = 1;
      //     // Craps.bet.lay.nine.working = 1;
      //     // Craps.bet.lay.ten.working = 1;
      //     //
      //     // // Turn on odds bets
      //     // Craps.bet.odds.four.working = 1;
      //     // Craps.bet.odds.five.working = 1;
      //     // Craps.bet.odds.six.working = 1;
      //     // Craps.bet.odds.eight.working = 1;
      //     // Craps.bet.odds.nine.working = 1;
      //     // Craps.bet.odds.ten.working = 1;
      //     //
      //     // // Turn on don't come bets
      //     // Craps.bet.dontCome.four.working = 1;
      //     // Craps.bet.dontCome.five.working = 1;
      //     // Craps.bet.dontCome.six.working = 1;
      //     // Craps.bet.dontCome.eight.working = 1;
      //     // Craps.bet.dontCome.nine.working = 1;
      //     // Craps.bet.dontCome.ten.working = 1;
      //     //
      //     // // Turn on hard bets
      //     // Craps.bet.hard.four.working = 1;
      //     // Craps.bet.hard.six.working = 1;
      //     // Craps.bet.hard.eight.working = 1;
      //     // Craps.bet.hard.ten.working = 1;
      //
      //   }
      //
      // }

    }

  };

})(jQuery);
