let Strategy = {

  action: {
    add: {},
    move: [],
    remove: [],
    on: [],
    off: [],
  },

  init: function() {

    Craps.shotCountExclude.on = [2, 3, 11];

  },

  resetActions: function() {

    Strategy.action.add = {};
    Strategy.action.move = [];
    Strategy.action.remove = [];
    Strategy.action.on = [];
    Strategy.action.off = [];

  },

  runActions: function() {

    Table.removeBets(Strategy.action.remove);
    Table.moveBets(Strategy.action.move);
    Table.addBets(Strategy.action.add);
    Table.betsOn(Strategy.action.on);
    Table.betsOff(Strategy.action.off);

  },

  play: function() {

    let shot = Craps.shotCount;
    let call = Craps.call;
    let point = Craps.point;
    Strategy.resetActions();

    if(!shot) { // come out roll

      console.log('Strategy: no shot');

      // INSTRUCTIONS
      // make $10 passline bet
      // make $10 dontpass bet
      // turn on hard bet(s) if not working

      if(!Table.hasBet('passline')) Strategy.action.add['passline'] = 10;
      if(!Table.hasBet('dontpass')) Strategy.action.add['dontpass'] = 10;
      if(Table.hasBet('hard4')) Strategy.action.on.push('hard4');
      if(Table.hasBet('hard6')) Strategy.action.on.push('hard6');
      if(Table.hasBet('hard8')) Strategy.action.on.push('hard8');
      if(Table.hasBet('hard10')) Strategy.action.on.push('hard10');

    } else {
      switch(shot) {

        case 1:

          console.log('Strategy: setup DC');

          // INSTRUCTIONS
          // make $90 dontpassodds bet
          // make $75 newdontcome bet
          // make $5 yo 11 bet
          // make $10 hard bet on point if not 5 or 9
          // ** move any existing hard bets insteading adding

          if(!Table.hasBet('dontpassodds')) Strategy.action.add['dontpassodds'] = 90;
          if(!Table.hasBet('newdontcome')) Strategy.action.add['newdontcome'] = 75;
          if(!Table.hasBet('yo11')) Strategy.action.add['yo11'] = 5;
          switch(point) {
            case 4:
              if(!Table.hasBet('hard4')) Strategy.action.add['hard4'] = 10;
              break;
            case 6:
              if(!Table.hasBet('hard6')) Strategy.action.add['hard6'] = 10;
              break;
            case 8:
              if(!Table.hasBet('hard8')) Strategy.action.add['hard8'] = 10;
              break;
            case 10:
              if(!Table.hasBet('hard10')) Strategy.action.add['hard10'] = 10;
              break;
          }

          break;

        case 2:
          console.log('Strategy: setup place/buy bets');

          // INSTRUCTIONS
          // remove dontpassodds
          // move or add hard bet to hedge dontcome
          // make $30 passlineodds bet
          // make $10 newcome bet
          // make $25 buy on 4 & 10 if not point
          // make $30 buy on 5 & 9 if not point
          // make $30 place on 6 & 8 if not point

          if(Table.hasBet('dontpassodds')) Strategy.action.remove.push('dontpassodds');
          // hard bet move or add
          if(!Table.hasBet('passlineodds')) Strategy.action.add['passlineodds'] = 30;
          if(!Table.hasBet('newcome')) Strategy.action.add['newcome'] = 10;
          if(!Table.hasBet('buy4') && !Table.hasBet('dontcome4') && point !== 4) Strategy.action.add['buy4'] = 25;
          if(!Table.hasBet('buy5') && !Table.hasBet('dontcome5') && point !== 5) Strategy.action.add['buy5'] = 30;
          if(!Table.hasBet('place6') && !Table.hasBet('dontcome6') && point !== 6) Strategy.action.add['place6'] = 30;
          if(!Table.hasBet('place8') && !Table.hasBet('dontcome8') && point !== 8) Strategy.action.add['place8'] = 30;
          if(!Table.hasBet('buy9') && !Table.hasBet('dontcome9') && point !== 9) Strategy.action.add['buy9'] = 30;
          if(!Table.hasBet('buy10') && !Table.hasBet('dontcome10') && point !== 10) Strategy.action.add['buy10'] = 25;

          break;

        default:
          console.log('Strategy: win money $$$');

          // INSTRUCTIONS
          // make $10 newcome bet
          // if 4, 5, 6, 8, 9, 10 move place/buy bet to comeodds bet

          if(!Table.hasBet('newcome')) Strategy.action.add['newcome'] = 10;
          switch(call) {
            case 4:
              if(Table.hasBet('buy4')) Strategy.action.move.push(['buy4', 'comeodds4']);
              break;
            case 5:
              if(Table.hasBet('buy5')) Strategy.action.move.push(['buy5', 'comeodds5']);
              break;
            case 6:
              if(Table.hasBet('place6')) Strategy.action.move.push(['place6', 'comeodds6']);
              break;
            case 8:
              if(Table.hasBet('place8')) Strategy.action.move.push(['place8', 'comeodds8']);
              break;
            case 9:
              if(Table.hasBet('buy9')) Strategy.action.move.push(['buy9', 'comeodds9']);
              break;
            case 10:
              if(Table.hasBet('buy10')) Strategy.action.move.push(['buy10', 'comeodds10']);
              break;
          }

      }
    }

    Strategy.runActions();

  }

};
