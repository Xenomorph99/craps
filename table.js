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

      Table.refresh();

    },

    refresh: function(array) { // array of bets e.g. ['passline', 'dontpass'];

      let bets = {};

      // Refresh all bets unless specific ones are listed
      if(array) {
        for(bet in array) {
          bets[array[bet]] = Table.bet[array[bet]];
        }
      } else {
        bets = Table.bet;
      }

      // Update the HTML table
      for(key in bets) {
        $('#bet-' + key).text(Table.bet[key].amount);
      }

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

    },

    addBets: function(array) { // associative array of bets and amounts e.g. {passline: 100, field: 200}

      if(array) {
        for(bet in array) {
          Craps.purse.amount -= array[bet]; // Take from purse
          Table.bet[bet].amount += array[bet]; // Add to table
          Table.refresh([bet]); // Refresh HTML
        }
      }

    },

    moveBets: function(array) { // array of bet and destination pairings [['hard4','hard6'], ['passline','field']]

      if(array) {
        for(var i = 0; i < array.length; i++) {
          Table.bet[array[i][1]].amount += Table.bet[array[i][0]].amount;
          Table.bet[array[i][0]].amount = 0;
          Table.refresh([array[i][0], array[i][1]]);
        }
      }

    },

    removeBets: function(array) { // array of bets e.g. ['passline', 'dontpass'];

      if(array) {
        for(var i = 0; i < array.length; i++) {
          Craps.purse.amount += Table.bet[array[i]].amount; // Add to purse
          Table.bet[array[i]].amount = 0; // Remove from table
          Table.refresh([array[i]]); // Refresh HTML
        }
      }

    },

    betsOn: function(array) { // array of bets e.g. ['passline', 'dontpass'];

      if(array) {
        for(var i = 0; i < array.length; i++) {
          Table.bet[array[i]].working = 1;
        }
      }

    },

    betsOff: function(array) { // array of bets e.g. ['passline', 'dontpass'];

      if(array) {
        for(var i = 0; i < array.length; i++) {
          Table.bet[array[i]].working = 0;
        }
      }

    },

    hasBet: function(bet) {

      return (bet && Table.bet[bet].amount) ? true : false;

    }

  };

})(jQuery);
