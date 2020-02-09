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
      come: {four: 30, five: 30, six: 30, eight: 30, nine: 30, ten: 30},
      odds: {four: 0, five: 0, six: 0, eight: 0, nine: 0, ten: 0},
      passLine: 0,
      passLineOdds: 0,
      dontPass: 0,
      dontPassOdds: 0,
      field: 0,
      dontCome: 0,
      newCome: 0,
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

      // Calculate place bets
      if(Craps.bet.place.four && Craps.call === 4) {
        if(Craps.point) {
          Craps.winnings = Craps.winnings + Math.floor(Craps.bet.place.four * (9/5));
        }
      }
      if(Craps.bet.place.five && Craps.call === 5) {
        if(Craps.point) {
          Craps.winnings = Craps.winnings + Math.floor(Craps.bet.place.five * (7/5));
        }
      }
      if(Craps.bet.place.six && Craps.call === 6) {
        if(Craps.point) {
          Craps.winnings = Craps.winnings + Math.floor(Craps.bet.place.six * (7/6));
        }
      }
      if(Craps.bet.place.eight && Craps.call === 8) {
        if(Craps.point) {
          Craps.winnings = Craps.winnings + Math.floor(Craps.bet.place.eight * (7/6));
        }
      }
      if(Craps.bet.place.nine && Craps.call === 9) {
        if(Craps.point) {
          Craps.winnings = Craps.winnings + Math.floor(Craps.bet.place.nine * (7/5));
        }
      }
      if(Craps.bet.place.ten && Craps.call === 10) {
        if(Craps.point) {
          Craps.winnings = Craps.winnings + Math.floor(Craps.bet.place.ten * (9/5));
        }
      }

      // Calculate buy bets
      if(Craps.bet.buy.four && Craps.call === 4) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.buy.four * (2/1)) - (Craps.bet.buy.four * 0.05));
      }
      if(Craps.bet.buy.five && Craps.call === 5) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.buy.five * (3/2)) - (Craps.bet.buy.five * 0.05));
      }
      if(Craps.bet.buy.six && Craps.call === 6) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.buy.six * (6/5)) - (Craps.bet.buy.six * 0.05));
      }
      if(Craps.bet.buy.eight && Craps.call === 8) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.buy.eight * (6/5)) - (Craps.bet.buy.eight * 0.05));
      }
      if(Craps.bet.buy.nine && Craps.call === 9) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.buy.nine * (3/2)) - (Craps.bet.buy.nine * 0.05));
      }
      if(Craps.bet.buy.ten && Craps.call === 10) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.buy.ten * (2/1)) - (Craps.bet.buy.ten * 0.05));
      }

      // Calculate lay bets
      if(Craps.bet.lay.four && Craps.call === 7) {
          Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.lay.four * (1/2)) - (Craps.bet.lay.four * 0.05));
      }
      if(Craps.bet.lay.five && Craps.call === 7) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.lay.five * (2/3)) - (Craps.bet.lay.five * 0.05));
      }
      if(Craps.bet.lay.six && Craps.call === 7) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.lay.six * (5/6)) - (Craps.bet.lay.six * 0.05));
      }
      if(Craps.bet.lay.eight && Craps.call === 7) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.lay.eight * (5/6)) - (Craps.bet.lay.eight * 0.05));
      }
      if(Craps.bet.lay.nine && Craps.call === 7) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.lay.nine * (2/3)) - (Craps.bet.lay.nine * 0.05));
      }
      if(Craps.bet.lay.ten && Craps.call === 7) {
        Craps.winnings = Craps.winnings + Math.ceil((Craps.bet.lay.ten * (1/2)) - (Craps.bet.lay.ten * 0.05));
      }

      // Calculate come bets
      if(Craps.bet.come.four && Craps.call === 4) {
          Craps.winnings = Craps.winnings + Craps.bet.come.four;
      }
      if(Craps.bet.come.five && Craps.call === 5) {
          Craps.winnings = Craps.winnings + Craps.bet.come.five;
      }
      if(Craps.bet.come.six && Craps.call === 6) {
          Craps.winnings = Craps.winnings + Craps.bet.come.six;
      }
      if(Craps.bet.come.eight && Craps.call === 8) {
          Craps.winnings = Craps.winnings + Craps.bet.come.eight;
      }
      if(Craps.bet.come.nine && Craps.call === 9) {
          Craps.winnings = Craps.winnings + Craps.bet.come.nine;
      }
      if(Craps.bet.come.ten && Craps.call === 10) {
          Craps.winnings = Craps.winnings + Craps.bet.come.ten;
      }

      // Calculate odds bets
      if(Craps.bet.odds.four && Craps.call === 4) {
        Craps.winnings = Craps.winnings + (Craps.bet.odds.four * (2/1));
      }
      if(Craps.bet.odds.five && Craps.call === 5) {
        Craps.winnings = Craps.winnings + (Craps.bet.odds.five * (3/2));
      }
      if(Craps.bet.odds.six && Craps.call === 6) {
        Craps.winnings = Craps.winnings + (Craps.bet.odds.six * (6/5));
      }
      if(Craps.bet.odds.eight && Craps.call === 8) {
        Craps.winnings = Craps.winnings + (Craps.bet.odds.eight * (6/5));
      }
      if(Craps.bet.odds.nine && Craps.call === 9) {
        Craps.winnings = Craps.winnings + (Craps.bet.odds.nine * (3/2));
      }
      if(Craps.bet.odds.ten && Craps.call === 10) {
        Craps.winnings = Craps.winnings + (Craps.bet.odds.ten * (2/1));
      }

      // Calculate pass line bets
      if(Craps.bet.passLine) {
        if(Craps.point) {
          if(Craps.call === Craps.point) {
            Craps.winnings = Craps.winnings + Craps.bet.passLine;
          }
        } else {
          if(Craps.call === 7 || Craps.call === 11) {
            Craps.winnings = Craps.winnings + Craps.bet.passLine;
          }
        }
      }

      // Calculate pass line odds bets
      if(Craps.bet.passLineOdds) {
        if(Craps.point) {
            if(Craps.call === Craps.point) {
              if(Craps.call === 4) {
                Craps.winnings = Craps.winnings + Math.floor(Craps.bet.passLineOdds * (9/5));
              }
              if(Craps.call === 5) {
                Craps.winnings = Craps.winnings + Math.floor(Craps.bet.passLineOdds * (7/5));
              }
              if(Craps.call === 6) {
                Craps.winnings = Craps.winnings + Math.floor(Craps.bet.passLineOdds * (7/6));
              }
              if(Craps.call === 8) {
                Craps.winnings = Craps.winnings + Math.floor(Craps.bet.passLineOdds * (7/6));
              }
              if(Craps.call === 9) {
                Craps.winnings = Craps.winnings + Math.floor(Craps.bet.passLineOdds * (7/5));
              }
              if(Craps.call === 10) {
                Craps.winnings = Craps.winnings + Math.floor(Craps.bet.passLineOdds * (9/5));
              }
            }
        } else {
          // No payout if point is off?
        }
      }





      // console.log('Roll: ' + i + '; Dice: ' + Craps.call + '; Winnings:' + Craps.winnings + ';');


      // dontPass: 0,
      // dontPassOdds: 0,
      // field: 0,
      // dontCome: 0,
      // newCome: 0,
      // yo: 0,
      // craps: 0,
      // hard: {four: 0, six: 0, eight: 0, ten: 0},
      // big: {six: 0, eight: 0}

    },

    placeBets: function() {

      console.log("Placing bets");

    }

  };

})(jQuery);

Craps.init();
