var Craps = {};

(function($) {

  Craps = {

    // Controls
    rolls: 0,
    dice: [0,0],
    purse: {
      start: 0,
      amount: 0
    },
    winnings: 0,

    // Bets


    init: function() {

      $('#roll-button').click(Craps.roll);

    },

    roll: function() {

      // Get everything reset and ready for the roll
      Craps.reset();

      // Throw the dice and run the calculations for each roll
      for (var i = 1; i <= Craps.rolls; i++) Craps.throwDice(i);

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
      Craps.winnings = 0;

      // Clear the log table
      $('#log-table').empty().append('<tr><th>#</th><th>Dice</th><th>Purse</th><th>Winnings</th></tr>');

    },

    results: function() {

      $('#purse-start').text(Craps.purse.start);
      $('#purse-end').text(Craps.purse.amount);
      $('#purse-diff').text(Craps.purse.amount - Craps.purse.start);

    },

    randNum: function() {

      return Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);

    },

    throwDice: function(i) {

      Craps.dice[0] = Craps.randNum();
      Craps.dice[1] = Craps.randNum();

      // Run the calculation
      Craps.calculate();

      // Log the results
      Craps.log(i);

    },

    log: function(i) {

      var call = Craps.dice[0] + Craps.dice[1];
      var logEntry = '<tr><td>' + i + '</td><td>(' + Craps.dice[0] + '+' + Craps.dice[1] + ') = ' + call + '</td><td>' + Craps.purse.amount + '</td><td>' + Craps.winnings + '</td></tr>';

      $('#log-table').append(logEntry);

    },

    calculate: function() {

      Craps.winnings = 0;

    }

  };

})(jQuery);

Craps.init();
