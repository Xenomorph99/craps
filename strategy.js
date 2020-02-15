let Strategy = {

  init: function() {

    Craps.shotCountExclude.on = [2, 3, 11];

  },

  run: function() {

    let shot = Craps.shotCount;
    let bets = {};

    if(!shot) { // come out roll

      console.log('Strategy: no shot');
      // make $10 passline bet
      // make $10 dontpass bet

      if(!Table.hasBet('passline')) bets.passline = 10;
      if(!Table.hasBet('dontpass')) bets.dontpass = 10;

      Table.addBets(bets);

    } else {
      switch(shot) {

        case 1:
          console.log('Strategy: setup DC');
          // make $90 dontpassodds bet
          // make $75 newdontcome bet
          // make $10 hard bet on point if not 5 or 9
          // make $5 yo11 bet
          break;

        case 2:
          console.log('Strategy: setup place/buy bets');
          // remove dontpassodds
          // move or add hard bet to hedge dontcome
          // make $30 passlineodds bet
          // make $10 newcome bet
          // make $25 buy on 4 & 10 if not point
          // make $30 buy on 5 & 9 if not point
          // make $30 place on 6 & 8 if not point
          break;

        default:
          console.log('Strategy: win money $$$');
          // if 4, 5, 6, 8, 9, 10 move place/buy bet to comeodds bet
          // make $10 newcome bet

      }
    }

  }

};
