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
    won: 0, // the total amount of money won on a roll
    lost: 0, // the total amount of money lost on a roll

    init: function() {

      Calc.init();
      Table.init();

      $('#run-button').click(this.run);

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
      //Craps.placeBets();

      // Throwing and calling the dice
      Craps.throwDice();

      // Run the calculation
      Craps.calculate(i);

      // Log the results
      Craps.log(i);

      // Move the puck
      //Table.movePuck();

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
      logEntry += Craps.tableCell(Craps.won); // Winnings
      logEntry += Craps.tableCell(Craps.lost); // Losses
      logEntry += Craps.tableCell(Craps.purse.amount); // Purse
      logEntry += '</tr>';

      $('#log-table').append(logEntry);

    },

    wonBet: function(amount) {

      Craps.won += amount;
      Craps.purse.amount += amount;

    },

    lostBet: function(amount) {

      Craps.losses += amount;

    },

    calculate: function(i) {

      var point = Craps.point;
      var call = Craps.call;

      Craps.won = 0;
      Craps.lost = 0;

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
