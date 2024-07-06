const Craps = {
  rolls: 0,
  dice: [0, 0],
  call: 0,
  point: 0,
  shotCount: 0,
  shotCountExclude: {
    on: [2, 3, 11],
    off: [2, 3, 11, 12]
  },
  purse: {
    start: 0,
    amount: 0
  },
  table: 0,
  won: 0,
  lost: 0,

  init: function() {
    Table.init();
    Dealer.init();
    Strategy.init();

    document.getElementById('run-button').addEventListener('click', this.run);
    document.getElementById('increment-button').addEventListener('click', this.increment);
  },

  run: function() {
    Craps.reset();
    for (let i = 1; i <= Craps.rolls; i++) Craps.roll(i);
    Craps.results();
  },

  increment: function() {
    if (Craps.rolls === 0) Craps.reset();
    Craps.roll(0);
    Craps.results();
  },

  reset: function() {
    let rolls = parseInt(document.getElementById('rolls').value);
    let purse = parseFloat(document.getElementById('purse').value);

    Craps.rolls = rolls > 0 ? rolls : 0;
    Craps.purse.start = purse > 0 ? purse : 0;
    Craps.purse.amount = purse > 0 ? purse : 0;
    Craps.table = 0;
    Craps.point = 0;
    Craps.shotCount = 0;

    Craps.clearLogTable();
    Craps.addLogTableHeaders();

    Table.movePuck();
  },

  roll: function(i) {
    Strategy.play();
    Craps.throwDice();
    Dealer.run();
    Craps.log(i);
    Table.movePuck();
  },

  throwDice: function() {
    Craps.won = 0;
    Craps.lost = 0;

    for (let i = 0; i < 2; i++) {
      Craps.dice[i] = Craps.rollDie();
    }

    Craps.call = Craps.dice[0] + Craps.dice[1];
  },

  rollDie: function() {
    return Math.floor(Math.random() * 6) + 1;
  },

  log: function(i) {
    let dice = `${Craps.dice[0]}+${Craps.dice[1]}=(${Craps.call})`;
    let point = Craps.point ? `ON(${Craps.point})` : "OFF";

    let logEntry = `
      <tr>
        <td>${i}</td>
        <td>${Craps.shotCount}</td>
        <td>${point}</td>
        <td>${dice}</td>
        <td>${Craps.won}</td>
        <td>${Craps.lost}</td>
        <td>${Craps.purse.amount}</td>
      </tr>`;

    document.getElementById('log-table').innerHTML += logEntry;
  },

  results: function() {
    document.getElementById('purse-start').innerHTML = Craps.purse.start;
    document.getElementById('purse-end').innerHTML = Craps.purse.amount;
    document.getElementById('purse-diff').innerHTML = Craps.purse.amount - Craps.purse.start;
  },

  clearLogTable: function() {
    document.getElementById('log-table').innerHTML = '';
  },

  addLogTableHeaders: function() {
    let headers = `
      <tr>
        <th>#</th>
        <th>Shot</th>
        <th>Point</th>
        <th>Dice</th>
        <th>Win</th>
        <th>Loss</th>
        <th>Purse</th>
      </tr>`;

    document.getElementById('log-table').innerHTML += headers;
  }
};

Craps.init();
