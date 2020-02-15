const Craps = {

  rolls: 0, // number of rolls to execute in the simulator
  dice: [0,0], // values of the two dice
  call: 0, // the two dice added together
  point: 0, // the point where the ON puck sits, 0 indicates OFF
  shotCount: 0, // the number of rolls between the puck turning ON and a 7 being rolled
  shotCountExclude: {
    on: [], // array of calls to not count when point is OFF e.g. [2,3,11]
    off: [] // array of calls to not count when point is ON e.g. [2,3,11,12]
  },
  purse: {
    start: 0, // the dollar amount entered at the beginning on the simulation
    amount: 0 // the running total of money not on the table
  },
  table: 0, // the total amount of money on the table
  won: 0, // the total amount of money won on a roll
  lost: 0, // the total amount of money lost on a roll

  init: function() {

    Table.init();
    Dealer.init();
    Strategy.init();

    document.getElementById('run-button').addEventListener('click', this.run);
    document.getElementById('increment-button').addEventListener('click', this.increment);

  },

  run: function() {

    // Get everything reset and ready
    Craps.reset();

    // Run the simulation the specified number of times
    for(var i = 1; i <= Craps.rolls; i++) Craps.roll(i);

    // Display the results of the simulation
    Craps.results();

  },

  increment: function() {

    if(Craps.rolls === 0) Craps.reset();

    Craps.roll(0);
    Craps.results();

  },

  reset: function() {

    // Get the form values
    let rolls = parseInt(document.getElementById('rolls').value);
    let purse = parseFloat(document.getElementById('purse').value);

    // Reset the JavaScript object variables
    Craps.rolls = rolls > 0 ? rolls : 0;
    Craps.dice[0] = 0;
    Craps.dice[1] = 0;
    Craps.table = 0;
    Craps.purse.start = purse > 0 ? purse : 0;
    Craps.purse.amount = purse > 0 ? purse : 0;
    Craps.point = 0;
    Craps.shotCount = 0;

    // Setup the log table columns
    let string = '<tr>';
    string += '<th>#</th>';
    string += '<th>Shot</th>';
    string += '<th>Point</th>';
    string += '<th>Dice</th>';
    string += '<th>Win</th>';
    string += '<th>Loss</th>';
    string += '<th>Purse</th>';
    string += '</tr>';

    // Clear the log table
    document.getElementById('log-table').innerHTML = string;

  },

  roll: function(i) {

    // Place the bets on the table
    Strategy.play();

    // Shooter throws the dice, stickman makes the call
    Craps.throwDice();

    // Dealer pays winnings & takes losses
    Dealer.run();

    // Tabulate the results of the shot
    Craps.log(i);

    // Set the table up for the next shot
    Table.movePuck();

  },

  throwDice: function() {

    // Clear the winnings and losses tally
    Craps.won = 0;
    Craps.lost = 0;

    // Read the numbers on the dice
    for(var i = 0; i < 2; i++) {
      Craps.dice[i] = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
    }

    // Add dice together and make the call
    Craps.call = Craps.dice[0] + Craps.dice[1];

  },

  log: function(i) {

    let dice = Craps.dice[0] + '+' + Craps.dice[1] + '=(' + Craps.call + ')';
    let point = (Craps.point) ? 'ON(' + Craps.point + ')' : "OFF";

    let logEntry = '<tr>';
    logEntry += '<td>' + i + '</td>'; // #
    logEntry += '<td>' + Craps.shotCount + '</td>'; // Run
    logEntry += '<td>' + point + '</td>'; // Point
    logEntry += '<td>' + dice + '</td>'; // Dice
    logEntry += '<td>' + Craps.won + '</td>'; // Winnings
    logEntry += '<td>' + Craps.lost + '</td>'; // Losses
    logEntry += '<td>' + Craps.purse.amount + '</td>'; // Purse
    logEntry += '</tr>';

    document.getElementById('log-table').innerHTML += logEntry;

  },

  results: function() {

    document.getElementById('purse-start').innerHTML = Craps.purse.start;
    document.getElementById('purse-end').innerHTML = Craps.purse.amount;
    document.getElementById('purse-diff').innerHTML = Craps.purse.amount - Craps.purse.start;

  }

};

Craps.init();
