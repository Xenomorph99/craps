var Craps = {};

(function($) {

  Craps = {

    rolls: 0,
    dice: [0,0],
    call: 0,
    point: 0,
    purse: {
      start: 0,
      amount: 0
    },
    winnings: 0,
    bet: {
      place: {four: 0, five: 0, six: 0, eight: 0, nine: 0, ten: 0},
      buy: {four: 0, five: 0, six: 0, eight: 0, nine: 0, ten: 0},
      lay: {four: 0, five: 0, six: 0, eight: 0, nine: 0, ten: 0},
      newCome: 0,
      come: {four: 0, five: 0, six: 0, eight: 0, nine: 0, ten: 0},
      odds: {four: 0, five: 0, six: 0, eight: 0, nine: 0, ten: 0},
      passLine: 0,
      passLineOdds: 0,
      dontPass: 0,
      dontPassOdds: 0,
      field: 0,
      newDontCome: 0,
      dontCome: {four: 0, five: 0, six: 0, eight: 0, nine: 0, ten: 0},
      yo: 0,
      craps: 0,
      hard: {four: 0, six: 0, eight: 0, ten: 0},
      big: {six: 0, eight: 0}
    },

    init: function() {

      $('#run-button').click(Craps.run);

    },

    run: function() {
      // Get everything reset and ready for the roll
      Craps.reset();

      // Throw the dice and run the calculations for each roll
      for (var i = 1; i <= Craps.rolls; i++) Craps.roll(i);

      // Display the results of the test
      Craps.results();

    },

    reset: function() {

      // Get the form values
      var rolls = parseInt($('#rolls').val());
      var purse = parseFloat($('#purse').val());

      // Reset the JavaScript object variables
      Craps.rolls = rolls > 0 ? rolls : 0;
      Craps.dice[0] = 0;
      Craps.dice[1] = 0;
      Craps.purse.start = purse > 0 ? purse : 0;
      Craps.purse.amount = purse > 0 ? purse : 0;
      Craps.point = 0;

      // Clear the log table
      $('#log-table').empty().append('<tr><th>#</th><th>Dice</th><th>Point</th><th>Purse</th><th>Winnings</th></tr>');

    },

    results: function() {

      $('#purse-start').text(Craps.purse.start);
      $('#purse-end').text(Craps.purse.amount);
      $('#purse-diff').text(Craps.purse.amount - Craps.purse.start);

    },

    roll: function(i) {

      // Set the appropriate bets
      Craps.placeBets();

      // Throwing and calling the dice
      Craps.throwDice();

      // Run the calculation
      Craps.calculate(i);

      // Log the results
      Craps.log(i);

    },

    randNum: function() {

      return Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);

    },

    throwDice: function() {

      // Get random dice numbers
      Craps.dice[0] = Craps.randNum();
      Craps.dice[1] = Craps.randNum();

      // Add dice together
      Craps.call = Craps.dice[0] + Craps.dice[1];

      // Turn the point on or off
      if(Craps.call === 7) {
        Craps.point = 0;
      } else if(!Craps.point && (Craps.call === 4 || Craps.call === 5 || Craps.call === 6 || Craps.call === 8 || Craps.call === 9 || Craps.call === 10)) {
        Craps.point = Craps.call;
      };

    },

    log: function(i) {

      var point = (Craps.point) ? 'ON (' + Craps.point + ')' : "OFF";
      var logEntry = '<tr><td>' + i + '</td><td>(' + Craps.dice[0] + '+' + Craps.dice[1] + ') = ' + Craps.call + '</td><td>' + point + '</td><td>' + Craps.purse.amount + '</td><td>' + Craps.winnings + '</td></tr>';

      $('#log-table').append(logEntry);

    },

    calculate: function(i) {

      Craps.winnings = 0;

      var winnings = Craps.winnings;
      var point = Craps.point;
      var call = Craps.call;

      // CALCULATE PLACE BETS
      if(Craps.bet.place.four) {
        if(point) {
          if(call === 4) {
            winnings += Math.floor(Craps.bet.place.four * (9/5));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.place.five) {
        if(point) {
          if(call === 5) {
            winnings += Math.floor(Craps.bet.place.five * (7/5));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.place.six) {
        if(point) {
          if(call === 6) {
            winnings += Math.floor(Craps.bet.place.six * (7/6));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.place.eight) {
        if(point) {
          if(call === 8) {
            winnings += Math.floor(Craps.bet.place.eight * (7/6));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.place.nine) {
        if(point) {
          if(call === 9) {
            winnings += Math.floor(Craps.bet.place.nine * (7/5));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.place.ten) {
        if(point) {
          if(call === 10) {
            winnings += Math.floor(Craps.bet.place.ten * (9/5));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }

      // CALCULATE BUY BETS
      if(Craps.bet.buy.four) {
        if(point) {
          if(call === 4) {
            winnings += Math.ceil((Craps.bet.buy.four * (2/1)) - (Craps.bet.buy.four * 0.05));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.buy.five) {
        if(point) {
          if(call === 4) {
            winnings += Math.ceil((Craps.bet.buy.five * (3/2)) - (Craps.bet.buy.five * 0.05));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.buy.six) {
        if(point) {
          if(call === 6) {
            winnings += Math.ceil((Craps.bet.buy.six * (6/5)) - (Craps.bet.buy.six * 0.05));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.buy.eight) {
        if(point) {
          if(call === 8) {
            winnings += Math.ceil((Craps.bet.buy.eight * (6/5)) - (Craps.bet.buy.eight * 0.05));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.buy.nine) {
        if(point) {
          if(call === 9) {
            winnings += Math.ceil((Craps.bet.buy.nine * (3/2)) - (Craps.bet.buy.nine * 0.05));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.buy.ten) {
        if(point) {
          if(call === 10) {
            winnings += Math.ceil((Craps.bet.buy.ten * (2/1)) - (Craps.bet.buy.ten * 0.05));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }

      // Calculate lay bets
      if(Craps.bet.lay.four) {
        if(point) {
          if(call === 7) {
            winnings += Math.ceil((Craps.bet.lay.four * (1/2)) - (Craps.bet.lay.four * 0.05));
          }
          if(call === point) {
            // lose bet
          }
        }
      }
      if(Craps.bet.lay.five) {
        if(point) {
          if(call === 7) {
            winnings += Math.ceil((Craps.bet.lay.five * (2/3)) - (Craps.bet.lay.five * 0.05));
          }
          if(call === point) {
            // lose bet
          }
        }
      }
      if(Craps.bet.lay.six) {
        if(point) {
          if(call === 7) {
            winnings += Math.ceil((Craps.bet.lay.six * (5/6)) - (Craps.bet.lay.six * 0.05));
          }
          if(call === point) {
            // lose bet
          }
        }

      }
      if(Craps.bet.lay.eight) {
        if(point) {
          if(call === 7) {
            winnings += Math.ceil((Craps.bet.lay.eight * (5/6)) - (Craps.bet.lay.eight * 0.05));
          }
          if(call === point) {
            // lose bet
          }
        }
      }
      if(Craps.bet.lay.nine) {
        if(point) {
          if(call === 7) {
            winnings += Math.ceil((Craps.bet.lay.nine * (2/3)) - (Craps.bet.lay.nine * 0.05));
          }
          if(call === point) {
            // lose bet
          }
        }
      }
      if(Craps.bet.lay.ten) {
        if(point) {
          if(call === 7) {
            winnings += Math.ceil((Craps.bet.lay.ten * (1/2)) - (Craps.bet.lay.ten * 0.05));
          }
          if(call === point) {
            // lose bet
          }
        }
      }

      // CALCULATE NEW COME BETS
      if(Craps.bet.newCome) {
        if(call === 7 || call === 11) {
          // win bet
        }
        if(call === 2 || call === 3 || call === 12) {
          // lose bet
        }
        // move bet
      }

      // CALCULATE COME BETS
      if(Craps.bet.come.four) {
        if(point) {
          if(call === 4) {
            winnings += Craps.bet.come.four;
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.come.five) {
        if(point) {
          if(call === 5) {
            winnings += Craps.bet.come.five;
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.come.six) {
        if(point) {
          if(call === 6) {
            winnings += Craps.bet.come.six;
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.come.eight) {
        if(point) {
          if(call === 8) {
            winnings += Craps.bet.come.eight;
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.come.nine) {
        if(point) {
          if(call === 9) {
            winnings += Craps.bet.come.nine;
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.come.ten) {
        if(point) {
          if(call === 10) {
            winnings += Craps.bet.come.ten;
          }
          if(call === 7) {
            // lose bet
          }
        }
      }

      // CALCULATE ODDS BETS
      if(Craps.bet.odds.four && Craps.call === 4) {
        if(point) {
          if(call === 4) {
            winnings += Math.floor(Craps.bet.odds.four * (2/1));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.odds.five) {
        if(point) {
          if(call === 5) {
            winnings += Math.floor(Craps.bet.odds.five * (3/2));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.odds.six) {
        if(point) {
          if(call === 6) {
            winnings += Math.floor(Craps.bet.odds.six * (6/5));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.odds.eight) {
        if(point) {
          if(call === 8) {
            winnings += Math.floor(Craps.bet.odds.eight * (6/5));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.odds.nine) {
        if(point) {
          if(call === 9) {
            winnings += Math.floor(Craps.bet.odds.nine * (3/2));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }
      if(Craps.bet.odds.ten) {
        if(point) {
          if(call === 10) {
            winnings += Math.floor(Craps.bet.odds.ten * (2/1));
          }
          if(call === 7) {
            // lose bet
          }
        }
      }

      // CALCULATE PASS LINE BETS
      if(Craps.bet.passLine) {
        if(point) {
          if(call === point) {
            winnings += Craps.bet.passLine;
          }
          if(call === 7) {
            // lose bet
          }
        } else {
          if(call === 7 || call === 11) {
            winnings += Craps.bet.passLine;
          }
          if(call === 2 || call === 3 || call === 12) {
            // lose bet
          }
        }
      }

      // CALCULATE PASS LINE ODDS BETS
      if(Craps.bet.passLineOdds) {
        if(point) {
          if(call === point) {
            if(call === 4) {
              winnings += Math.floor(Craps.bet.passLineOdds * (9/5));
            }
            if(call === 5) {
              winnings += Math.floor(Craps.bet.passLineOdds * (7/5));
            }
            if(call === 6) {
              winnings += Math.floor(Craps.bet.passLineOdds * (7/6));
            }
            if(call === 8) {
              winnings += Math.floor(Craps.bet.passLineOdds * (7/6));
            }
            if(call === 9) {
              winnings += Math.floor(Craps.bet.passLineOdds * (7/5));
            }
            if(call === 10) {
              winnings += Math.floor(Craps.bet.passLineOdds * (9/5));
            }
          }
          if(call === 7) {
            // lose bet
          }
        } else {
          // No payout if point is off?
        }
      }

      // CALCULATE DON'T PASS BETS
      if(Craps.bet.dontPass) {
        if(point) {
          if(call === 7) {
            winnings += Craps.bet.dontPass;
          }
          if(call === point) {
            // lose bet
          }
        } else {
          if(call === 2 || call === 3) { // 12 pushes
            winnings += Craps.bet.dontPass;
          }
          if(call === 7 || call === 11) {
            // lose bet
          }
        }
      }

      // CALCULATE DON'T PASS ODDS BETS
      if(Craps.bet.dontPassOdds) {
        if(point) {
          if(call === 7) {
            if(point === 4) {
              winnings += Math.floor(Craps.bet.dontPassOdds * (1/2));
            }
            if(point === 5) {
              winnings += Math.floor(Craps.bet.dontPassOdds * (2/3));
            }
            if(point === 6) {
              winnings += Math.floor(Craps.bet.dontPassOdds * (5/6));
            }
            if(point === 8) {
              winnings += Math.floor(Craps.bet.dontPassOdds * (5/6));
            }
            if(point === 9) {
              winnings += Math.floor(Craps.bet.dontPassOdds * (2/3));
            }
            if(point === 10) {
              winnings += Math.floor(Craps.bet.dontPassOdds * (1/2));
            }
          }
          if(call === point) {
            // lose bet
          }
        } else {
          // What happens when there is no point?
        }
      }

      // CALCULATE FIELD BETS
      if(Craps.bet.field) {
        if(call === 2) {
          winnings += (Craps.bet.field * 2);
        } else if(call === 3) {
          winnings += Craps.bet.field;
        } else if(call === 4) {
          winnings += Craps.bet.field;
        } else if(call === 9) {
          winnings += Craps.bet.field;
        } else if(call === 10) {
          winnings += Craps.bet.field;
        } else if(call === 11) {
          winnings += Craps.bet.field;
        } else if(call === 12) {
          winnings += (Craps.bet.field * 2);
        } else {
          // lose bet
        }
      }

      // CALCULATE NEW DON'T COME BETS
      if(Craps.bet.newDontCome) {
        if(point) {
          if(call === 3 || call === 11) {
            winnings += Craps.bet.newDontCome;
          }
          if(call === 7) {
            // lose bet
          }
          if(call === point) {
            // lose bet ?
          }
          // move bet
        } else {
          // what happens here?
        }
      }

      // CALCULATE DON'T COME BETS
      if(Craps.bet.dontCome.four) {
        if(point) {
          if(call === 7) {
            winnings += Craps.bet.dontCome.four;
          }
          if(call === 4) {
            // lose bet
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.five) {
        if(point) {
          if(call === 7) {
            winnings += Craps.bet.dontCome.five;
          }
          if(call === 5) {
            // lose bet
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.six) {
        if(point) {
          if(call === 7) {
            winnings += Craps.bet.dontCome.six;
          }
          if(call === 6) {
            // lose bet
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.eight) {
        if(point) {
          if(call === 7) {
            winnings += Craps.bet.dontCome.eight;
          }
          if(call === 8) {
            // lose bet
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.nine) {
        if(point) {
          if(call === 7) {
            winnings += Craps.bet.dontCome.nine;
          }
          if(call === 9) {
            // lose bet
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.ten) {
        if(point) {
          if(call === 7) {
            winnings += Craps.bet.dontCome.ten;
          }
          if(call === 10) {
            // lose bet
          }
        } else {
          // what happens here?
        }
      }

      // CALCULATE YO 11
      if(Craps.bet.yo) {
        if(call === 11) {
          winnings += Math.floor(Craps.bet.yo * (15/1));
        } else {
          // lose bet
        }
      }

      // CALCULATE CRAPS
      if(Craps.bet.craps) {
        if(call === 2 || call === 3 || call === 12) {
          winnings += Math.floor(Craps.bet.craps *(7/1));
        } else {
          // lose bet
        }
      }

      // CALCULATE HARD BETS
      if(Craps.bet.hard.four) {
        if(call === 4) {
          if(Craps.dice[0] === 2 && Craps.dice[1] === 2) {
            winnings += Math.floor(Craps.bet.hard.four * (7/1));
          } else {
            // lose bet
          }
        }
        if(call === 7) {
          // lose bet
        }
      }
      if(Craps.bet.hard.six) {
        if(call === 6) {
          if(Craps.dice[0] === 3 && Craps.dice[1] === 3) {
            winnings += Math.floor(Craps.bet.hard.six * (9/1));
          } else {
            // lose bet
          }
        }
        if(call === 7) {
          // lose bet
        }
      }
      if(Craps.bet.hard.eight) {
        if(call === 8) {
          if(Craps.dice[0] === 4 && Craps.dice[1] === 4) {
            winnings += Math.floor(Craps.bet.hard.eight * (9/1));
          } else {
            // lose bet
          }
        }
        if(call === 7) {
          // lose bet
        }
      }
      if(Craps.bet.hard.ten) {
        if(call === 10) {
          if(Craps.dice[0] === 5 && Craps.dice[1] === 5) {
            winnings += Math.floor(Craps.bet.hard.ten * (7/1));
          } else {
            // lose bet
          }
        }
        if(call === 7) {
          // lose bet
        }
      }

      // CALCULATE BIG BETS
      if(Craps.bet.big.six) {
        if(call === 6) {
          winnings += Craps.bet.big.six;
        }
        if(call === 7) {
          // lose bet
        }
      }
      if(Craps.bet.big.eight) {
        if(call === 8) {
          winnings += Craps.bet.big.eight;
        }
        if(call === 7) {
          // lose bet
        }
      }

      // Add winnings to the purse
      Craps.winnings = winnings;
      Craps.purse.amount += Craps.winnings;

    },

    withdrawl: function(bet) {

      Craps.purse.amount = Craps.purse.amount - bet;
      bet = amount;

    },

    deposit: function(bet) {

      Craps.purse.amount = Craps.purse.amount + bet;
      bet = 0;

    },

    placeBets: function() {

      console.log("Placing bets");

    }

  };

})(jQuery);

Craps.init();
