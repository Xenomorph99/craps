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
    table: 0, // the total amount of money on the table
    winnings: 0, // the total amount of money won on a roll
    losses: 0, // the total amount of money lost on a roll
    bet: {
      place: {
        four: {amt: 0, working: 0}, // Amount and working status
        five: {amt: 0, working: 0},
        six: {amt: 0, working: 0},
        eight: {amt: 0, working: 0},
        nine: {amt: 0, working: 0},
        ten: {amt: 0, working: 0}
      },
      buy: {
        four: {amt: 0, working: 0},
        five: {amt: 0, working: 0},
        six: {amt: 0, working: 0},
        eight: {amt: 0, working: 0},
        nine: {amt: 0, working: 0},
        ten: {amt: 0, working: 0}
      },
      lay: {
        four: {amt: 0, working: 0},
        five: {amt: 0, working: 0},
        six: {amt: 0, working: 0},
        eight: {amt: 0, working: 0},
        nine: {amt: 0, working: 0},
        ten: {amt: 0, working: 0}
      },
      newCome: {amt: 0, working: 0},
      come: {
        four: {amt: 0, working: 1},
        five: {amt: 0, working: 1},
        six: {amt: 0, working: 1},
        eight: {amt: 0, working: 1},
        nine: {amt: 0, working: 1},
        ten: {amt: 0, working: 1}
      },
      odds: {
        four: {amt: 0, working: 0},
        five: {amt: 0, working: 0},
        six: {amt: 0, working: 0},
        eight: {amt: 0, working: 0},
        nine: {amt: 0, working: 0},
        ten: {amt: 0, working: 0}
      },
      passLine: {amt: 0, working: 1},
      passLineOdds: {amt: 0, working: 0},
      dontPass: {amt: 0, working: 1},
      dontPassOdds: {amt: 0, working: 0},
      field: {amt: 0, working: 1},
      newDontCome: {amt: 0, working: 0},
      dontCome: {
        four: {amt: 0, working: 0},
        five: {amt: 0, working: 0},
        six: {amt: 0, working: 0},
        eight: {amt: 0, working: 0},
        nine: {amt: 0, working: 0},
        ten: {amt: 0, working: 0}
      },
      yo: {amt: 0, working: 1},
      craps: {amt: 0, working: 1},
      hard: {
        four: {amt: 0, working: 0},
        six: {amt: 0, working: 0},
        eight: {amt: 0, working: 0},
        ten: {amt: 0, working: 0}
      },
      big: {
        six: {amt: 0, working: 1},
        eight: {amt: 0, working: 1}
      }
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
      Craps.table = 0;
      Craps.purse.start = purse > 0 ? purse : 0;
      Craps.purse.amount = purse > 0 ? purse : 0;
      Craps.point = 0;
      Craps.count = 0;

      // Setup the log table columns
      var string = '<tr>';
      string += '<th>#</th>';
      string += '<th>Run</th>';
      string += '<th>Point</th>';
      string += '<th>Dice</th>';
      string += '<th>Win</th>';
      string += '<th>Loss</th>';
      string += '<th>Purse</th>';
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

      // Move the puck
      Craps.movePuck();

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

    },

    tableCell: function(val) {

      return '<td>' + val + '</td>';

    },

    log: function(i) {

      var dice = Craps.dice[0] + '+' + Craps.dice[1] + '=(' + Craps.call + ')';
      var point = (Craps.point) ? 'ON(' + Craps.point + ')' : "OFF";

      var logEntry = '<tr>';
      logEntry += Craps.tableCell(i); // #
      logEntry += Craps.tableCell(Craps.count); // Run
      logEntry += Craps.tableCell(point); // Point
      logEntry += Craps.tableCell(dice); // Dice
      logEntry += Craps.tableCell(Craps.winnings); // Winnings
      logEntry += Craps.tableCell(Craps.losses); // Losses
      logEntry += Craps.tableCell(Craps.purse.amount); // Purse
      logEntry += '</tr>';

      $('#log-table').append(logEntry);

    },

    wonBet: function(amount) {

      Craps.winnings += amount;
      Craps.purse.amount += amount;

    },

    lostBet: function(amount) {

      Craps.losses += amount;

    },

    calculate: function(i) {

      var point = Craps.point;
      var call = Craps.call;

      Craps.winnings = 0;
      Craps.losses = 0;

      // CALCULATE PLACE BETS
      if(Craps.bet.place.four.amt) {
        if(Craps.bet.place.four.working) {
          if(call === 4) {
            Craps.wonBet(Math.floor(Craps.bet.place.four.amt * (9/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.four.amt);
            Craps.bet.place.four.amt = 0;
          }
        } else {
          if(call === 4) { // take down
            Craps.purse.amount += Craps.bet.place.four.amt;
            Craps.bet.place.four.amt = 0;
          }
        }
      }
      if(Craps.bet.place.five.amt) {
        if(Craps.bet.place.five.working) {
          if(call === 5) {
            Craps.wonBet(Math.floor(Craps.bet.place.five.amt * (7/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.five.amt);
            Craps.bet.place.five.amt = 0;
          }
        } else {
          if(call === 5) { // take down
            Craps.purse.amount += Craps.bet.place.five.amt;
            Craps.bet.place.five.amt = 0;
          }
        }
      }
      if(Craps.bet.place.six.amt) {
        if(Craps.bet.place.six.working) {
          if(call === 6) {
            Craps.wonBet(Math.floor(Craps.bet.place.six.amt * (7/6)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.six.amt);
            Craps.bet.place.six.amt = 0;
          }
        } else {
          if(call === 6) { // take down
            Craps.purse.amount += Craps.bet.place.six.amt;
            Craps.bet.place.six.amt = 0;
          }
        }
      }
      if(Craps.bet.place.eight.amt) {
        if(Craps.bet.place.eight.working) {
          if(call === 8) {
            Craps.wonBet(Math.floor(Craps.bet.place.eight.amt * (7/6)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.eight.amt);
            Craps.bet.place.eight.amt = 0;
          }
        } else {
          if(call === 8) { // take down
            Craps.purse.amount += Craps.bet.place.eight.amt;
            Craps.bet.place.eight.amt = 0;
          }
        }
      }
      if(Craps.bet.place.nine.amt) {
        if(Craps.bet.place.nine.working) {
          if(call === 9) {
            Craps.wonBet(Math.floor(Craps.bet.place.nine.amt * (7/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.nine.amt);
            Craps.bet.place.nine.amt = 0;
          }
        } else {
          if(call === 9) { // take down
            Craps.purse.amount += Craps.bet.place.nine.amt;
            Craps.bet.place.nine.amt = 0;
          }
        }
      }
      if(Craps.bet.place.ten.amt) {
        if(Craps.bet.place.ten.working) {
          if(call === 10) {
            Craps.wonBet(Math.floor(Craps.bet.place.ten.amt * (9/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.place.ten.amt);
            Craps.bet.place.ten.amt = 0;
          }
        } else {
          if(call === 10) { // take down
            Craps.purse.amount += Craps.bet.place.ten.amt;
            Craps.bet.place.ten.amt = 0;
          }
        }
      }

      // CALCULATE BUY BETS
      if(Craps.bet.buy.four.amt) {
        if(Craps.bet.buy.four.working) {
          if(call === 4) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.four.amt * (2/1)) - (Craps.bet.buy.four.amt * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.four.amt);
            Craps.bet.buy.four.amt = 0;
          }
        } else {
          if(call === 4) { // take down
            Craps.purse.amount += Craps.bet.buy.four.amt;
            Craps.bet.buy.four.amt = 0;
          }
        }
      }
      if(Craps.bet.buy.five.amt) {
        if(Craps.bet.buy.five.working) {
          if(call === 5) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.five.amt * (3/2)) - (Craps.bet.buy.five.amt * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.five.amt);
            Craps.bet.buy.five.amt = 0;
          }
        } else {
          if(call === 5) { // take down
            Craps.purse.amount += Craps.bet.buy.five.amt;
            Craps.bet.buy.five.amt = 0;
          }
        }
      }
      if(Craps.bet.buy.six.amt) {
        if(Craps.bet.buy.six.working) {
          if(call === 6) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.six.amt * (6/5)) - (Craps.bet.buy.six.amt * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.six.amt);
            Craps.bet.buy.six.amt = 0;
          }
        } else {
          if(call === 6) { // take down
            Craps.purse.amount += Craps.bet.buy.six.amt;
            Craps.bet.buy.six.amt = 0;
          }
        }
      }
      if(Craps.bet.buy.eight.amt) {
        if(Craps.bet.buy.eight.working) {
          if(call === 8) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.eight.amt * (6/5)) - (Craps.bet.buy.eight.amt * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.eight.amt);
            Craps.bet.buy.eight.amt = 0;
          }
        } else {
          if(call === 8) { // take down
            Craps.purse.amount += Craps.bet.buy.eight.amt;
            Craps.bet.buy.eight.amt = 0;
          }
        }
      }
      if(Craps.bet.buy.nine.amt) {
        if(Craps.bet.buy.nine.working) {
          if(call === 9) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.nine.amt * (3/2)) - (Craps.bet.buy.nine.amt * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.nine.amt);
            Craps.bet.buy.nine.amt = 0;
          }
        } else {
          if(call === 9) { // take down
            Craps.purse.amount += Craps.bet.buy.nine.amt;
            Craps.bet.buy.nine.amt = 0;
          }
        }
      }
      if(Craps.bet.buy.ten.amt) {
        if(Craps.bet.buy.ten.working) {
          if(call === 10) {
            Craps.wonBet(Math.ceil((Craps.bet.buy.ten.amt * (2/1)) - (Craps.bet.buy.ten.amt * 0.05)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.buy.ten.amt);
            Craps.bet.buy.ten.amt = 0;
          }
        } else {
          if(call === 10) { // take down
            Craps.purse.amount += Craps.bet.buy.ten.amt;
            Craps.bet.buy.ten.amt = 0;
          }
        }
      }

      // Calculate lay bets
      if(Craps.bet.lay.four.amt) {
        if(Craps.bet.lay.four.working) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.four.amt * (1/2)) - (Craps.bet.lay.four.amt * 0.05)));
          }
          if(call === 4) {
            Craps.lostBet(Craps.bet.lay.four.amt);
            Craps.bet.lay.four.amt = 0;
          }
        }
      }
      if(Craps.bet.lay.five.amt) {
        if(Craps.bet.lay.five.working) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.five.amt * (2/3)) - (Craps.bet.lay.five.amt * 0.05)));
          }
          if(call === 5) {
            Craps.lostBet(Craps.bet.lay.five.amt);
            Craps.bet.lay.five.amt = 0;
          }
        }
      }
      if(Craps.bet.lay.six.amt) {
        if(Craps.bet.lay.six.working) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.six.amt * (5/6)) - (Craps.bet.lay.six.amt * 0.05)));
          }
          if(call === 6) {
            Craps.lostBet(Craps.bet.lay.six.amt);
            Craps.bet.lay.six.amt = 0;
          }
        }

      }
      if(Craps.bet.lay.eight.amt) {
        if(Craps.bet.lay.eight.working) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.eight.amt * (5/6)) - (Craps.bet.lay.eight.amt * 0.05)));
          }
          if(call === 8) {
            Craps.lostBet(Craps.bet.lay.eight.amt);
            Craps.bet.lay.eight.amt = 0;
          }
        }
      }
      if(Craps.bet.lay.nine.amt) {
        if(Craps.bet.lay.nine.working) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.nine.amt * (2/3)) - (Craps.bet.lay.nine.amt * 0.05)));
          }
          if(call === 9) {
            Craps.lostBet(Craps.bet.lay.nine.amt);
            Craps.bet.lay.nine.amt = 0;
          }
        }
      }
      if(Craps.bet.lay.ten.amt) {
        if(Craps.bet.lay.ten.working) {
          if(call === 7) {
            Craps.wonBet(Math.ceil((Craps.bet.lay.ten.amt * (1/2)) - (Craps.bet.lay.ten.amt * 0.05)));
          }
          if(call === 10) {
            Craps.lostBet(Craps.bet.lay.ten.amt);
            Craps.bet.lay.ten.amt = 0;
          }
        }
      }

      // CALCULATE NEW COME BETS
      if(Craps.bet.newCome.amt) {
        if(Craps.bet.newCome.working) {
          if(call === 7 || call === 11) {
            Craps.wonBet(Craps.bet.newCome.amt);
          }
          if(call === 2 || call === 3 || call === 12) {
            Craps.lostBet(Craps.bet.newCome.amt);
            Craps.bet.newCome.amt = 0;
          }
          if(call === 4) { // moves
            Craps.bet.come.four.amt = Craps.bet.newCome.amt;
            Craps.bet.newCome.amt = 0;
          }
          if(call === 5) { // moves
            Craps.bet.come.five.amt = Craps.bet.newCome.amt;
            Craps.bet.newCome.amt = 0;
          }
          if(call === 6) { // moves
            Craps.bet.come.six.amt = Craps.bet.newCome.amt;
            Craps.bet.newCome.amt = 0;
          }
          if(call === 8) { // moves
            Craps.bet.come.eight.amt = Craps.bet.newCome.amt;
            Craps.bet.newCome.amt = 0;
          }
          if(call === 9) { // moves
            Craps.bet.come.nine.amt = Craps.bet.newCome.amt;
            Craps.bet.newCome.amt = 0;
          }
          if(call === 10) { // moves
            Craps.bet.come.ten.amt = Craps.bet.newCome.amt;
            Craps.bet.newCome.amt = 0;
          }
        }
      }

      // CALCULATE COME BETS
      if(Craps.bet.come.four.amt) {
        if(Craps.bet.come.four.working) {
          if(call === 4) {
            Craps.wonBet(Craps.bet.come.four.amt);
            Craps.purse.amount += Craps.bet.come.four.amt; // take down
            Craps.bet.come.four.amt = 0;
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.four.amt);
            Craps.bet.come.four.amt = 0;
          }
        }
      }
      if(Craps.bet.come.five.amt) {
        if(Craps.bet.come.five.working) {
          if(call === 5) {
            Craps.wonBet(Craps.bet.come.five.amt);
            Craps.purse.amount += Craps.bet.come.five.amt; // take down
            Craps.bet.come.five.amt = 0;
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.five.amt);
            Craps.bet.come.five.amt = 0;
          }
        }
      }
      if(Craps.bet.come.six.amt) {
        if(Craps.bet.come.six.working) {
          if(call === 6) {
            Craps.wonBet(Craps.bet.come.six.amt);
            Craps.purse.amount += Craps.bet.come.six.amt; // take down
            Craps.bet.come.six.amt = 0;
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.six.amt);
            Craps.bet.come.six.amt = 0;
          }
        }
      }
      if(Craps.bet.come.eight.amt) {
        if(Craps.bet.come.eight.working) {
          if(call === 8) {
            Craps.wonBet(Craps.bet.come.eight.amt);
            Craps.purse.amount += Craps.bet.come.eight.amt; // take down
            Craps.bet.come.eight.amt = 0;
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.eight.amt);
            Craps.bet.come.eigh.amt = 0;
          }
        }
      }
      if(Craps.bet.come.nine.amt) {
        if(Craps.bet.come.nine.working) {
          if(call === 9) {
            Craps.wonBet(Craps.bet.come.nine.amt);
            Craps.purse.amount += Craps.bet.come.nine.amt; // take down
            Craps.bet.come.nine.amt = 0;
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.nine.amt);
            Craps.bet.come.nine.amt = 0;
          }
        }
      }
      if(Craps.bet.come.ten.amt) {
        if(Craps.bet.come.ten.working) {
          if(call === 10) {
            Craps.wonBet(Craps.bet.come.ten.amt);
            Craps.purse.amount += Craps.bet.come.ten.amt; // take down
            Craps.bet.come.ten.amt = 0;
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.come.ten.amt);
            Craps.bet.come.ten.amt = 0;
          }
        }
      }

      // CALCULATE ODDS BETS
      if(Craps.bet.odds.four.amt) {
        if(Craps.bet.odds.four.working) {
          if(call === 4) {
            Craps.wonBet(Math.floor(Craps.bet.odds.four.amt * (2/1)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.four.amt);
            Craps.bet.odds.four.amt = 0;
          }
        } else {
          if(call === 7) { // take down
            Craps.purse.amount += Craps.bet.odds.four.amt;
            Craps.bet.odds.four.amt = 0;
          }
        }
      }
      if(Craps.bet.odds.five.amt) {
        if(Craps.bet.odds.five.working) {
          if(call === 5) {
            Craps.wonBet(Math.floor(Craps.bet.odds.five.amt * (3/2)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.five.amt);
            Craps.bet.odds.five.amt = 0;
          }
        } else {
          if(call === 7) { // take down
            Craps.purse.amount += Craps.bet.odds.five.amt;
            Craps.bet.odds.five.amt = 0;
          }
        }
      }
      if(Craps.bet.odds.six.amt) {
        if(Craps.bet.odds.six.working) {
          if(call === 6) {
            Craps.wonBet(Math.floor(Craps.bet.odds.six.amt * (6/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.six.amt);
            Craps.bet.odds.six.amt = 0;
          }
        } else {
          if(call === 7) { // take down
            Craps.purse.amount += Craps.bet.odds.six.amt;
            Craps.bet.odds.six.amt = 0;
          }
        }
      }
      if(Craps.bet.odds.eight.amt) {
        if(Craps.bet.odds.eight.working) {
          if(call === 8) {
            Craps.wonBet(Math.floor(Craps.bet.odds.eight.amt * (6/5)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.eight.amt);
            Craps.bet.odds.eight.amt = 0;
          }
        } else {
          if(call === 7) { // take down
            Craps.purse.amount += Craps.bet.odds.eight.amt;
            Craps.bet.odds.eight.amt = 0;
          }
        }
      }
      if(Craps.bet.odds.nine.amt) {
        if(Craps.bet.odds.nine.working) {
          if(call === 9) {
            Craps.wonBet(Math.floor(Craps.bet.odds.nine.amt * (3/2)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.nine.amt);
            Craps.bet.odds.nine.amt = 0;
          }
        } else {
          if(call === 7) { // take down
            Craps.purse.amount += Craps.bet.odds.nine.amt;
            Craps.bet.odds.nine.amt = 0;
          }
        }
      }
      if(Craps.bet.odds.ten.amt) {
        if(Craps.bet.odds.ten.working) {
          if(call === 10) {
            Craps.wonBet(Math.floor(Craps.bet.odds.ten.amt * (2/1)));
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.odds.ten.amt);
            Craps.bet.odds.ten.amt = 0;
          }
        } else {
          if(call === 7) { // take down
            Craps.purse.amount += Craps.bet.odds.ten.amt;
            Craps.bet.odds.ten.amt = 0;
          }
        }
      }

      // CALCULATE PASS LINE BETS
      if(Craps.bet.passLine.amt) {
        if(Craps.bet.passLine.working) {
          if(point) {
            if(call === point) {
              Craps.wonBet(Craps.bet.passLine.amt);
            }
            if(call === 7) {
              Craps.lostBet(Craps.bet.passLine.amt);
              Craps.bet.passLine.amt = 0;
            }
          } else {
            if(call === 7 || call === 11) {
              Craps.wonBet(Craps.bet.passLine.amt);
            }
            if(call === 2 || call === 3 || call === 12) {
              Craps.lostBet(Craps.bet.passLine.amt);
              Craps.bet.passLine.amt = 0;
            }
          }
        }
      }

      // CALCULATE PASS LINE ODDS BETS
      if(Craps.bet.passLineOdds.amt) {
        if(Craps.bet.passLineOdds.working) {
          if(point) {
            if(call === point) {
              if(call === 4) {
                Craps.wonBet(Math.floor(Craps.bet.passLineOdds.amt * (9/5)));
              }
              if(call === 5) {
                Craps.wonBet(Math.floor(Craps.bet.passLineOdds.amt * (7/5)));
              }
              if(call === 6) {
                Craps.wonBet(Math.floor(Craps.bet.passLineOdds.amt * (7/6)));
              }
              if(call === 8) {
                Craps.wonBet(Math.floor(Craps.bet.passLineOdds.amt * (7/6)));
              }
              if(call === 9) {
                Craps.wonBet(Math.floor(Craps.bet.passLineOdds.amt * (7/5)));
              }
              if(call === 10) {
                Craps.wonBet(Math.floor(Craps.bet.passLineOdds.amt * (9/5)));
              }
            }
            if(call === 7) {
              Craps.lostBet(Craps.bet.passLineOdds.amt);
              Craps.bet.passLineOdds.amt = 0;
            }
          } else {
            // No payout if point is off?
          }
        }
      }

      // CALCULATE DON'T PASS BETS
      if(Craps.bet.dontPass.amt) {
        if(Craps.bet.dontPass.working) {
          if(point) {
            if(call === 7) {
              Craps.wonBet(Craps.bet.dontPass.amt);
            }
            if(call === point) {
              Craps.lostBet(Craps.bet.dontPass.amt);
              Craps.bet.dontPass.amt = 0;
            }
          } else {
            if(call === 2 || call === 3) { // 12 pushes
              Craps.wonBet(Craps.bet.dontPass.amt);
            }
            if(call === 7 || call === 11) {
              Craps.lostBet(Craps.bet.dontPass.amt);
              Craps.bet.dontPass.amt = 0;
            }
          }
        }
      }

      // CALCULATE DON'T PASS ODDS BETS
      if(Craps.bet.dontPassOdds.amt) {
        if(Craps.bet.dontPassOdds.working) {
          if(point) {
            if(call === 7) {
              if(point === 4) {
                Craps.wonBet(Math.floor(Craps.bet.dontPassOdds.amt * (1/2)));
              }
              if(point === 5) {
                Craps.wonBet(Math.floor(Craps.bet.dontPassOdds.amt * (2/3)));
              }
              if(point === 6) {
                Craps.wonBet(Math.floor(Craps.bet.dontPassOdds.amt * (5/6)));
              }
              if(point === 8) {
                Craps.wonBet(Math.floor(Craps.bet.dontPassOdds.amt * (5/6)));
              }
              if(point === 9) {
                Craps.wonBet(Math.floor(Craps.bet.dontPassOdds.amt * (2/3)));
              }
              if(point === 10) {
                Craps.wonBet(Math.floor(Craps.bet.dontPassOdds.amt * (1/2)));
              }
            }
            if(call === point) {
              Craps.lostBet(Craps.bet.dontPassOdds.amt);
              Craps.bet.dontPassOdds.amt = 0;
            }
          } else {
            // What happens when there is no point?
          }
        }
      }

      // CALCULATE FIELD BETS
      if(Craps.bet.field.amt) {
        if(Craps.bet.field.working) {
          if(call === 2) {
            Craps.wonBet(Craps.bet.field.amt * 2);
          } else if(call === 3) {
            Craps.wonBet(Craps.bet.field.amt);
          } else if(call === 4) {
            Craps.wonBet(Craps.bet.field.amt);
          } else if(call === 9) {
            Craps.wonBet(Craps.bet.field.amt);
          } else if(call === 10) {
            Craps.wonBet(Craps.bet.field.amt);
          } else if(call === 11) {
            Craps.wonBet(Craps.bet.field.amt);
          } else if(call === 12) {
            Craps.wonBet(Craps.bet.field.amt * 2);
          } else {
            Craps.lostBet(Craps.bet.field.amt);
            Craps.bet.field.amt = 0;
          }
        }
      }

      // CALCULATE NEW DON'T COME BETS
      if(Craps.bet.newDontCome.amt) {
        if(Craps.bet.newDontCome.working) {
          if(call === 2 || call === 3) { // 12 pushes
            Craps.wonBet(Craps.bet.newDontCome.amt);
          }
          if(call === 7 || call === 11) {
            Craps.lostBet(Craps.bet.newDontCome.amt);
            Craps.bet.newDontCome.amt = 0;
          }
          if(call === 4) { // moves
            Craps.bet.dontCome.four = Craps.bet.newDontCome.amt;
            Craps.bet.newDontCome.amt = 0;
          }
          if(call === 5) { // moves
            Craps.bet.dontCome.five = Craps.bet.newDontCome.amt;
            Craps.bet.newDontCome.amt = 0;
          }
          if(call === 6) { // moves
            Craps.bet.dontCome.six = Craps.bet.newDontCome.amt;
            Craps.bet.newDontCome.amt = 0;
          }
          if(call === 8) { // moves
            Craps.bet.dontCome.eight = Craps.bet.newDontCome.amt;
            Craps.bet.newDontCome.amt = 0;
          }
          if(call === 9) { // moves
            Craps.bet.dontCome.nine = Craps.bet.newDontCome.amt;
            Craps.bet.newDontCome.amt = 0;
          }
          if(call === 10) { // moves
            Craps.bet.dontCome.ten = Craps.bet.newDontCome.amt;
            Craps.bet.newDontCome.amt = 0;
          }
        }
      }

      // CALCULATE DON'T COME BETS
      if(Craps.bet.dontCome.four.amt) {
        if(Craps.bet.dontCome.four.working) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.four.amt);
            Craps.purse.amount += Craps.bet.dontCome.four.amt; // take down
            Craps.bet.dontCome.four.amt = 0;
          }
          if(call === 4) {
            Craps.lostBet(Craps.bet.dontCome.four.amt);
            Craps.bet.dontCome.four.amt = 0;
          }
        }
      }
      if(Craps.bet.dontCome.five.amt) {
        if(Craps.bet.dontCome.five.working) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.five.amt);
            Craps.purse.amount += Craps.bet.dontCome.five.amt; // take down
            Craps.bet.dontCome.five.amt = 0;
          }
          if(call === 5) {
            Craps.lostBet(Craps.bet.dontCome.five.amt);
            Craps.bet.dontCome.five.amt = 0;
          }
        }
      }
      if(Craps.bet.dontCome.six.amt) {
        if(Craps.bet.dontCome.six.working) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.six.amt);
            Craps.purse.amount += Craps.bet.dontCome.six.amt; // take down
            Craps.bet.dontCome.six.amt = 0;
          }
          if(call === 6) {
            Craps.lostBet(Craps.bet.dontCome.six.amt);
            Craps.bet.dontCome.six.amt = 0;
          }
        }
      }
      if(Craps.bet.dontCome.eight.amt) {
        if(Craps.bet.dontCome.eight.working) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.eight.amt);
            Craps.purse.amount += Craps.bet.dontCome.eight.amt; // take down
            Craps.bet.dontCome.eight.amt = 0;
          }
          if(call === 8) {
            Craps.lostBet(Craps.bet.dontCome.eight.amt);
            Craps.bet.dontCome.eight.amt = 0;
          }
        }
      }
      if(Craps.bet.dontCome.nine.amt) {
        if(Craps.bet.dontCome.nine.working) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.nine.amt);
            Craps.purse.amount += Craps.bet.dontCome.nine.amt; // take down
            Craps.bet.dontCome.nine.amt = 0;
          }
          if(call === 9) {
            Craps.lostBet(Craps.bet.dontCome.nine.amt);
            Craps.bet.dontCome.nine.amt = 0;
          }
        }
      }
      if(Craps.bet.dontCome.ten.amt) {
        if(Craps.bet.dontCome.ten.working) {
          if(call === 7) {
            Craps.wonBet(Craps.bet.dontCome.ten.amt);
            Craps.purse.amount += Craps.bet.dontCome.ten.amt; // take down
            Craps.bet.dontCome.ten.amt = 0;
          }
          if(call === 10) {
            Craps.lostBet(Craps.bet.dontCome.ten.amt);
            Craps.bet.dontCome.ten.amt = 0;
          }
        }
      }

      // CALCULATE YO 11
      if(Craps.bet.yo.amt) {
        if(Craps.bet.yo.working) {
          if(call === 11) {
            Craps.wonBet(Math.floor(Craps.bet.yo.amt * (15/1)));
          } else {
            Craps.lostBet(Craps.bet.yo.amt);
            Craps.bet.yo.amt = 0;
          }
        }
      }

      // CALCULATE CRAPS
      if(Craps.bet.craps.amt) {
        if(Craps.bet.craps.working) {
          if(call === 2 || call === 3 || call === 12) {
            Craps.wonBet(Math.floor(Craps.bet.craps.amt *(7/1)));
          } else {
            Craps.lostBet(Craps.bet.craps.amt);
            Craps.bet.craps.amt = 0;
          }
        }
      }

      // CALCULATE HARD BETS
      if(Craps.bet.hard.four.amt) {
        if(Craps.bet.hard.four.working) {
          if(call === 4) {
            if(Craps.dice[0] === 2 && Craps.dice[1] === 2) {
              Craps.wonBet(Math.floor(Craps.bet.hard.four.amt * (7/1)));
            } else {
              Craps.lostBet(Craps.bet.hard.four.amt);
              Craps.bet.hard.four.amt = 0;
            }
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.hard.four.amt);
            Craps.bet.hard.four.amt = 0;
          }
        }
      }
      if(Craps.bet.hard.six.amt) {
        if(Craps.bet.hard.six.working) {
          if(call === 6) {
            if(Craps.dice[0] === 3 && Craps.dice[1] === 3) {
              Craps.wonBet(Math.floor(Craps.bet.hard.six.amt * (9/1)));
            } else {
              Craps.lostBet(Craps.bet.hard.six.amt);
              Craps.bet.hard.six.amt = 0;
            }
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.hard.six.amt);
            Craps.bet.hard.six.amt = 0;
          }
        }
      }
      if(Craps.bet.hard.eight.amt) {
        if(Craps.bet.hard.eight.working) {
          if(call === 8) {
            if(Craps.dice[0] === 4 && Craps.dice[1] === 4) {
              Craps.wonBet(Math.floor(Craps.bet.hard.eight.amt * (9/1)));
            } else {
              Craps.lostBet(Craps.bet.hard.eight.amt);
              Craps.bet.hard.eight.amt = 0;
            }
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.hard.eight.amt);
            Craps.bet.hard.eight.amt = 0;
          }
        }
      }
      if(Craps.bet.hard.ten.amt) {
        if(Craps.bet.hard.ten.working) {
          if(call === 10) {
            if(Craps.dice[0] === 5 && Craps.dice[1] === 5) {
              Craps.wonBet(Math.floor(Craps.bet.hard.ten.amt * (7/1)));
            } else {
              Craps.lostBet(Craps.bet.hard.ten.amt);
              Craps.bet.hard.ten.amt = 0;
            }
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.hard.ten.amt);
            Craps.bet.hard.ten.amt = 0;
          }
        }
      }

      // CALCULATE BIG BETS
      if(Craps.bet.big.six.amt) {
        if(Craps.bet.big.six.working) {
          if(call === 6) {
            Craps.wonBet(Craps.bet.big.six.amt);
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.big.six.amt);
            Craps.bet.big.six.amt = 0;
          }
        }
      }
      if(Craps.bet.big.eight.amt) {
        if(Craps.bet.big.eight.working) {
          if(call === 8) {
            Craps.wonBet(Craps.bet.big.eight.amt);
          }
          if(call === 7) {
            Craps.lostBet(Craps.bet.big.eight.amt);
            Craps.bet.big.eight.amt = 0;
          }
        }
      }


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

    },

    placeBets: function() {

      if(!Craps.count) { // come out roll

        // if there isn't one, add a passline bet
        if(!Craps.bet.passLine.amt) {
          Craps.purse.amount -= 10;
          Craps.bet.passLine.amt = 10;
        }

        // if there isn't one, add a don't pass bet
        if(!Craps.bet.dontPass.amt) {
          Craps.purse.amount -= 10;
          Craps.bet.dontPass.amt = 10;
        }

      }

      if(Craps.count === 1) {

        // if there aren't any, place odds on passline bet
        if(!Craps.bet.passLineOdds.amt) {
          Craps.purse.amount -= 30;
          Craps.bet.passLineOdds.amt = 30;
        }

        // if there's no DC on the table
        if(!Craps.bet.newDontCome.amt && !Craps.bet.dontCome.four.amt && !Craps.bet.dontCome.five.amt && !Craps.bet.dontCome.six.amt && !Craps.bet.dontCome.eight.amt && !Craps.bet.dontCome.nine.amt && !Craps.bet.dontCome.ten.amt) {
          Craps.purse.amount -= 75;
          Craps.bet.newDontCome.amt = 75;
        }

        // if there's no DC on the table, add a yo 11 bet to hedge the new DC
        if(!Craps.bet.yo.amt && !Craps.bet.dontCome.four.amt && !Craps.bet.dontCome.five.amt && !Craps.bet.dontCome.six.amt && !Craps.bet.dontCome.eight.amt && !Craps.bet.dontCome.nine.amt && !Craps.bet.dontCome.ten.amt) {
          Craps.purse.amount -= 5;
          Craps.bet.yo.amt = 5;
        }

      }

    }

  };

})(jQuery);

Craps.init();
