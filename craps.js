var Craps = {};

(function($) {

  Craps = {

    rolls: 0, // number of rolls to execute in the simulator
    dice: [0,0], // values of the two dice
    call: 0, // the two dice added together
    point: 0, // the point where the ON puck sits, 0 indicates OFF
    count: 0, // the number of rolls between the puck turning ON and a 7 being rolled
    purse: {
      start: 0, // the dollar amount entered at the beginning on the simulation
      amount: 0 // the running total of money not on the table
    },
    winnings: 0, // the total amount of money won on a roll
    losses: 0, // the total amount of money lost on a roll
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
      Craps.count = 0;

      // Setup the log table columns
      var string = '<tr>';
      string += '<th>#</th>';
      string += '<th>Dice</th>';
      string += '<th>Point</th>';
      string += '<th>Run</th>';
      string += '<th>Purse</th>';
      string += '<th>Winnings</th>';
      string += '<th>Losses</th>';
      string += '</tr>';

      // Clear the log table
      $('#log-table').empty().append(string);

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

      // Turn the point ON or OFF and count between 7's
      if(Craps.point) {
        if(Craps.call === 7) {
          Craps.point = 0;
          Craps.count = 0;
        } else {
          Craps.count += 1;
        }
      } else {
        if(Craps.call === 4 || Craps.call === 5 || Craps.call === 6 || Craps.call === 8 || Craps.call === 9 || Craps.call === 10) {
          Craps.point = Craps.call;
          Craps.count += 1;
        }
      }

      console.log('count: ' + Craps.count);

    },

    tableCell: function(val) {

      return '<td>' + val + '</td>';

    },

    log: function(i) {

      var dice = Craps.dice[0] + '+' + Craps.dice[1] + '=(' + Craps.call + ')';
      var point = (Craps.point) ? 'ON(' + Craps.point + ')' : "OFF";

      var logEntry = '<tr>';
      logEntry += Craps.tableCell(i); // #
      logEntry += Craps.tableCell(dice); // Dice
      logEntry += Craps.tableCell(point); // Point
      logEntry += Craps.tableCell(Craps.count); // Run
      logEntry += Craps.tableCell(Craps.purse.amount); // Purse
      logEntry += Craps.tableCell(Craps.winnings); // Winnings
      logEntry += Craps.tableCell(Craps.losses); // Losses
      logEntry += '</tr>';

      $('#log-table').append(logEntry);

    },

    wonBet: function(val) {

      Craps.winnings += val;
      Craps.purse.amount += val;

    },

    lostBet: function(val) {

      Craps.losses += val;

    },

    calculate: function(i) {

      var point = Craps.point;
      var call = Craps.call;

      Craps.winnings = 0;
      Craps.losses = 0;

      // CALCULATE PLACE BETS
      if(Craps.bet.place.four) {
        Craps.lostBet(Craps.bet.place.four);
        if(point) {
          if(call === 4) {
            Craps.wonBet(Math.floor(Craps.bet.place.four * (9/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.four);
            Craps.bet.place.four = 0;
          }
        }
      }
      if(Craps.bet.place.five) {
        if(point) {
          if(call === 5) {
            Craps.wonBet(Math.floor(Craps.bet.place.five * (7/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.five);
            Craps.bet.place.five = 0;
          }
        }
      }
      if(Craps.bet.place.six) {
        if(point) {
          if(call === 6) {
            Craps.wonBet(Math.floor(Craps.bet.place.six * (7/6)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.six);
            Craps.bet.place.six = 0;
          }
        }
      }
      if(Craps.bet.place.eight) {
        if(point) {
          if(call === 8) {
            Craps.wonBet(Math.floor(Craps.bet.place.eight * (7/6)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.eight);
            Craps.bet.place.eight = 0;
          }
        }
      }
      if(Craps.bet.place.nine) {
        if(point) {
          if(call === 9) {
            Craps.wonBet(Math.floor(Craps.bet.place.nine * (7/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.nine);
            Craps.bet.place.nine = 0;
          }
        }
      }
      if(Craps.bet.place.ten) {
        if(point) {
          if(call === 10) {
            Craps.wonBet(Math.floor(Craps.bet.place.ten * (9/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.ten);
            Craps.bet.place.ten = 0;
          }
        }
      }

      // CALCULATE BUY BETS
      if(Craps.bet.buy.four) {
        if(point) {
          if(call === 4) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.four * (2/1)) - (Craps.bet.buy.four * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.four);
            Craps.bet.buy.four = 0;
          }
        }
      }
      if(Craps.bet.buy.five) {
        if(point) {
          if(call === 4) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.five * (3/2)) - (Craps.bet.buy.five * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.five);
            Craps.bet.buy.five = 0;
          }
        }
      }
      if(Craps.bet.buy.six) {
        if(point) {
          if(call === 6) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.six * (6/5)) - (Craps.bet.buy.six * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.six);
            Craps.bet.buy.six = 0;
          }
        }
      }
      if(Craps.bet.buy.eight) {
        if(point) {
          if(call === 8) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.eight * (6/5)) - (Craps.bet.buy.eight * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.eight);
            Craps.bet.buy.eight = 0;
          }
        }
      }
      if(Craps.bet.buy.nine) {
        if(point) {
          if(call === 9) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.nine * (3/2)) - (Craps.bet.buy.nine * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.nine);
            Craps.bet.buy.nine = 0;
          }
        }
      }
      if(Craps.bet.buy.ten) {
        if(point) {
          if(call === 10) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.ten * (2/1)) - (Craps.bet.buy.ten * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.ten);
            Craps.bet.buy.ten = 0;
          }
        }
      }

      // Calculate lay bets
      if(Craps.bet.lay.four) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.four * (1/2)) - (Craps.bet.lay.four * 0.05)));
          }
          if(call === point) {
            Craps.lostBet(Craps.bet.lay.four);
            Craps.bet.lay.four = 0;
          }
        }
      }
      if(Craps.bet.lay.five) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.five * (2/3)) - (Craps.bet.lay.five * 0.05)));
          }
          if(call === point) {
            Craps.lostBet(Craps.bet.lay.five);
            Craps.bet.lay.five = 0;
          }
        }
      }
      if(Craps.bet.lay.six) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.six * (5/6)) - (Craps.bet.lay.six * 0.05)));
          }
          if(call === point) {
            Craps.lostBet(Craps.bet.lay.six);
            Craps.bet.lay.six = 0;
          }
        }

      }
      if(Craps.bet.lay.eight) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.eight * (5/6)) - (Craps.bet.lay.eight * 0.05)));
          }
          if(call === point) {
            Craps.lostBet(Craps.bet.lay.eight);
            Craps.bet.lay.eight = 0;
          }
        }
      }
      if(Craps.bet.lay.nine) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.nine * (2/3)) - (Craps.bet.lay.nine * 0.05)));
          }
          if(call === point) {
            Craps.lostBet(Craps.bet.lay.nine);
            Craps.bet.lay.nine = 0;
          }
        }
      }
      if(Craps.bet.lay.ten) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.ten * (1/2)) - (Craps.bet.lay.ten * 0.05)));
          }
          if(call === point) {
            Craps.lostBet(Craps.bet.lay.ten);
            Craps.bet.lay.ten = 0;
          }
        }
      }

      // CALCULATE NEW COME BETS
      if(Craps.bet.newCome) {
        if(call === 7 || call === 11) {
          Craps.wonBet(Craps.bet.newCome);
        }
        if(call === 2 || call === 3 || call === 12) {
          Craps.lostBet(Craps.bet.newCome);
          Craps.bet.newCome = 0;
        }
        if(call === 4) { // moves
          Craps.bet.come.four = Craps.bet.newCome;
          Craps.bet.newCome = 0;
        }
        if(call === 5) { // moves
          Craps.bet.come.five = Craps.bet.newCome;
          Craps.bet.newCome = 0;
        }
        if(call === 6) { // moves
          Craps.bet.come.six = Craps.bet.newCome;
          Craps.bet.newCome = 0;
        }
        if(call === 8) { // moves
          Craps.bet.come.eight = Craps.bet.newCome;
          Craps.bet.newCome = 0;
        }
        if(call === 9) { // moves
          Craps.bet.come.nine = Craps.bet.newCome;
          Craps.bet.newCome = 0;
        }
        if(call === 10) { // moves
          Craps.bet.come.ten = Craps.bet.newCome;
          Craps.bet.newCome = 0;
        }
      }

      // CALCULATE COME BETS
      if(Craps.bet.come.four) {
        if(point) {
          if(call === 4) {
            Craps.wonBet(Craps.bet.come.four);
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.four);
            Craps.bet.come.four = 0;
          }
        }
      }
      if(Craps.bet.come.five) {
        if(point) {
          if(call === 5) {
            Craps.wonBet(Craps.bet.come.five);
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.five);
            Craps.bet.come.five = 0;
          }
        }
      }
      if(Craps.bet.come.six) {
        if(point) {
          if(call === 6) {
            Craps.wonBet(Craps.bet.come.six);
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.six);
            Craps.bet.come.six = 0;
          }
        }
      }
      if(Craps.bet.come.eight) {
        if(point) {
          if(call === 8) {
            Craps.wonBet(Craps.bet.come.eight);
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.eight);
            Craps.bet.come.eight = 0;
          }
        }
      }
      if(Craps.bet.come.nine) {
        if(point) {
          if(call === 9) {
            Craps.wonBet(Craps.bet.come.nine);
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.nine);
            Craps.bet.come.nine = 0;
          }
        }
      }
      if(Craps.bet.come.ten) {
        if(point) {
          if(call === 10) {
            Craps.wonBet(Craps.bet.come.ten);
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.ten);
            Craps.bet.come.ten = 0;
          }
        }
      }

      // CALCULATE ODDS BETS
      if(Craps.bet.odds.four && Craps.call === 4) {
        if(point) {
          if(call === 4) {
            Craps.wonBet(Math.floor(Craps.bet.odds.four * (2/1)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.four);
            Craps.bet.odds.four = 0;
          }
        }
      }
      if(Craps.bet.odds.five) {
        if(point) {
          if(call === 5) {
            Craps.wonBet(Math.floor(Craps.bet.odds.five * (3/2)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.five);
            Craps.bet.odds.five = 0;
          }
        }
      }
      if(Craps.bet.odds.six) {
        if(point) {
          if(call === 6) {
            Craps.wonBet(Math.floor(Craps.bet.odds.six * (6/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.six);
            Craps.bet.odds.six = 0;
          }
        }
      }
      if(Craps.bet.odds.eight) {
        if(point) {
          if(call === 8) {
            Craps.wonBet(Math.floor(Craps.bet.odds.eight * (6/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.eight);
            Craps.bet.odds.eight = 0;
          }
        }
      }
      if(Craps.bet.odds.nine) {
        if(point) {
          if(call === 9) {
            Craps.wonBet(Math.floor(Craps.bet.odds.nine * (3/2)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.nine);
            Craps.bet.odds.nine = 0;
          }
        }
      }
      if(Craps.bet.odds.ten) {
        if(point) {
          if(call === 10) {
            Craps.wonBet(Math.floor(Craps.bet.odds.ten * (2/1)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.ten);
            Craps.bet.odds.ten = 0;
          }
        }
      }

      // CALCULATE PASS LINE BETS
      if(Craps.bet.passLine) {
        if(point) {
          if(call === point) {
            Craps.wonBet(Craps.bet.passLine);
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.passLine);
            Craps.bet.passLine = 0;
          }
        } else {
          if(call === 7 || call === 11) {
            Craps.wonBet(Craps.bet.passLine);
          }
          if(call === 2 || call === 3 || call === 12) {
            Craps.lostBet(Craps.bet.passLine);
            Craps.bet.passLine = 0;
          }
        }
      }

      // CALCULATE PASS LINE ODDS BETS
      if(Craps.bet.passLineOdds) {
        if(point) {
          if(call === point) {
            if(call === 4) {
              Craps.wonBet(Math.floor(Craps.bet.passLineOdds * (9/5)));
            }
            if(call === 5) {
              Craps.wonBet(Math.floor(Craps.bet.passLineOdds * (7/5)));
            }
            if(call === 6) {
              Craps.wonBet(Math.floor(Craps.bet.passLineOdds * (7/6)));
            }
            if(call === 8) {
              Craps.wonBet(Math.floor(Craps.bet.passLineOdds * (7/6)));
            }
            if(call === 9) {
              Craps.wonBet(Math.floor(Craps.bet.passLineOdds * (7/5)));
            }
            if(call === 10) {
              Craps.wonBet(Math.floor(Craps.bet.passLineOdds * (9/5)));
            }
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.passLineOdds);
            Craps.bet.passLineOdds = 0;
          }
        } else {
          // No payout if point is off?
        }
      }

      // CALCULATE DON'T PASS BETS
      if(Craps.bet.dontPass) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontPass);
          }
          if(call === point) {
            Craps.lostBet(Craps.bet.dontPass);
            Craps.bet.dontPass = 0;
          }
        } else {
          if(call === 2 || call === 3) { // 12 pushes
            Craps.wonBet(Craps.bet.dontPass);
          }
          if(call === 7 || call === 11) {
            Craps.lostBet(Craps.bet.dontPass);
            Craps.bet.dontPass = 0;
          }
        }
      }

      // CALCULATE DON'T PASS ODDS BETS
      if(Craps.bet.dontPassOdds) {
        if(point) {
          if(call === 7) {
            if(point === 4) {
              Craps.wonBet(Math.floor(Craps.bet.dontPassOdds * (1/2)));
            }
            if(point === 5) {
              Craps.wonBet(Math.floor(Craps.bet.dontPassOdds * (2/3)));
            }
            if(point === 6) {
              Craps.wonBet(Math.floor(Craps.bet.dontPassOdds * (5/6)));
            }
            if(point === 8) {
              Craps.wonBet(Math.floor(Craps.bet.dontPassOdds * (5/6)));
            }
            if(point === 9) {
              Craps.wonBet(Math.floor(Craps.bet.dontPassOdds * (2/3)));
            }
            if(point === 10) {
              Craps.wonBet(Math.floor(Craps.bet.dontPassOdds * (1/2)));
            }
          }
          if(call === point) {
            Craps.lostBet(Craps.bet.dontPassOdds);
            Craps.bet.dontPassOdds = 0;
          }
        } else {
          // What happens when there is no point?
        }
      }

      // CALCULATE FIELD BETS
      if(Craps.bet.field) {
        if(call === 2) {
          Craps.wonBet(Craps.bet.field * 2);
        } else if(call === 3) {
          Craps.wonBet(Craps.bet.field);
        } else if(call === 4) {
          Craps.wonBet(Craps.bet.field);
        } else if(call === 9) {
          Craps.wonBet(Craps.bet.field);
        } else if(call === 10) {
          Craps.wonBet(Craps.bet.field);
        } else if(call === 11) {
          Craps.wonBet(Craps.bet.field);
        } else if(call === 12) {
          Craps.wonBet(Craps.bet.field * 2);
        } else {
          Craps.lostBet(Craps.bet.field);
          Craps.bet.field = 0;
        }
      }

      // CALCULATE NEW DON'T COME BETS
      if(Craps.bet.newDontCome) {
        if(point) {
          if(call === 2 || call === 3) { // 12 pushes
            Craps.wonBet(Craps.bet.newDontCome);
          }
          if(call === 7 || call === 11) {
            Craps.lostBet(Craps.bet.newDontCome);
            Craps.bet.newDontCome = 0;
          }
          if(call === 4) { // moves
            Craps.bet.dontCome.four = Craps.bet.newDontCome;
            Craps.bet.newDontCome = 0;
          }
          if(call === 5) { // moves
            Craps.bet.dontCome.five = Craps.bet.newDontCome;
            Craps.bet.newDontCome = 0;
          }
          if(call === 6) { // moves
            Craps.bet.dontCome.six = Craps.bet.newDontCome;
            Craps.bet.newDontCome = 0;
          }
          if(call === 8) { // moves
            Craps.bet.dontCome.eight = Craps.bet.newDontCome;
            Craps.bet.newDontCome = 0;
          }
          if(call === 9) { // moves
            Craps.bet.dontCome.nine = Craps.bet.newDontCome;
            Craps.bet.newDontCome = 0;
          }
          if(call === 10) { // moves
            Craps.bet.dontCome.ten = Craps.bet.newDontCome;
            Craps.bet.newDontCome = 0;
          }
        } else {
          // what happens here?
        }
      }

      // CALCULATE DON'T COME BETS
      if(Craps.bet.dontCome.four) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.four);
          }
          if(call === 4) {
            Craps.lostBet(Craps.bet.dontCome.four);
            Craps.bet.dontCome.four = 0;
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.five) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.five);
          }
          if(call === 5) {
            Craps.lostBet(Craps.bet.dontCome.five);
            Craps.bet.dontCome.five = 0;
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.six) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.six);
          }
          if(call === 6) {
            Craps.lostBet(Craps.bet.dontCome.six);
            Craps.bet.dontCome.six = 0;
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.eight) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.eight);
          }
          if(call === 8) {
            Craps.lostBet(Craps.bet.dontCome.eight);
            Craps.bet.dontCome.eight = 0;
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.nine) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.nine);
          }
          if(call === 9) {
            Craps.lostBet(Craps.bet.dontCome.nine);
            Craps.bet.dontCome.nine = 0;
          }
        } else {
          // what happens here?
        }
      }
      if(Craps.bet.dontCome.ten) {
        if(point) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.ten);
          }
          if(call === 10) {
            Craps.lostBet(Craps.bet.dontCome.ten);
            Craps.bet.dontCome.ten = 0;
          }
        } else {
          // what happens here?
        }
      }

      // CALCULATE YO 11
      if(Craps.bet.yo) {
        if(call === 11) {
          Craps.wonBet(Math.floor(Craps.bet.yo * (15/1)));
        } else {
          Craps.lostBet(Craps.bet.yo);
          Craps.bet.yo = 0;
        }
      }

      // CALCULATE CRAPS
      if(Craps.bet.craps) {
        if(call === 2 || call === 3 || call === 12) {
          Craps.wonBet(Math.floor(Craps.bet.craps *(7/1)));
        } else {
          Craps.lostBet(Craps.bet.craps);
          Craps.bet.craps = 0;
        }
      }

      // CALCULATE HARD BETS
      if(Craps.bet.hard.four) {
        if(call === 4) {
          if(Craps.dice[0] === 2 && Craps.dice[1] === 2) {
            Craps.wonBet(Math.floor(Craps.bet.hard.four * (7/1)));
          } else {
            Craps.lostBet(Craps.bet.hard.four);
            Craps.bet.hard.four = 0;
          }
        }
        if(call === 7) {
          Craps.lostBet(Craps.bet.hard.four);
          Craps.bet.hard.four = 0;
        }
      }
      if(Craps.bet.hard.six) {
        if(call === 6) {
          if(Craps.dice[0] === 3 && Craps.dice[1] === 3) {
            Craps.wonBet(Math.floor(Craps.bet.hard.six * (9/1)));
          } else {
            Craps.lostBet(Craps.bet.hard.six);
            Craps.bet.hard.six = 0;
          }
        }
        if(call === 7) {
          Craps.lostBet(Craps.bet.hard.six);
          Craps.bet.hard.six = 0;
        }
      }
      if(Craps.bet.hard.eight) {
        if(call === 8) {
          if(Craps.dice[0] === 4 && Craps.dice[1] === 4) {
            Craps.wonBet(Math.floor(Craps.bet.hard.eight * (9/1)));
          } else {
            Craps.lostBet(Craps.bet.hard.eight);
            Craps.bet.hard.eight = 0;
          }
        }
        if(call === 7) {
          Craps.lostBet(Craps.bet.hard.eight);
          Craps.bet.hard.eight = 0;
        }
      }
      if(Craps.bet.hard.ten) {
        if(call === 10) {
          if(Craps.dice[0] === 5 && Craps.dice[1] === 5) {
            Craps.wonBet(Math.floor(Craps.bet.hard.ten * (7/1)));
          } else {
            Craps.lostBet(Craps.bet.hard.ten);
            Craps.bet.hard.ten = 0;
          }
        }
        if(call === 7) {
          Craps.lostBet(Craps.bet.hard.ten);
          Craps.bet.hard.ten = 0;
        }
      }

      // CALCULATE BIG BETS
      if(Craps.bet.big.six) {
        if(call === 6) {
          Craps.wonBet(Craps.bet.big.six);
        }
        if(call === 7) {
          Craps.lostBet(Craps.bet.big.six);
          Craps.bet.big.six = 0;
        }
      }
      if(Craps.bet.big.eight) {
        if(call === 8) {
          Craps.wonBet(Craps.bet.big.eight);
        }
        if(call === 7) {
          Craps.lostBet(Craps.bet.big.eight);
          Craps.bet.big.eight = 0;
        }
      }


    },

    // withdrawl: function(bet) {
    //
    //   Craps.purse.amount -= bet;
    //   bet = amount;
    //
    // },
    //
    // deposit: function(bet) {
    //
    //   Craps.purse.amount += bet;
    //   bet = 0;
    //
    // },

    placeBets: function() {

      console.log("Placing bets");

    }

  };

})(jQuery);

Craps.init();
