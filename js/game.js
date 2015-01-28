'use strict';

import CONSTANTS from './constants.js';
import board from './board.js';
import canvas from './canvas.js';
import controls from './controls.js';

var currentPlayer = CONSTANTS.PLAYER_CROSS;

export default {
  /**
   * Initialize game
   */
  init() {
    canvas.init();
    controls.init();
    board.create(9);
  },
  
  /**
   * Create new game
   * 
   */
  newGame(size) {
    board.createBoard(size);
    currentPlayer = CONSTANTS.PLAYER_CROSS;
  },

  /**
   * Processing player move
   * @param {Number} x
   * @param {Number} y
   */
  move(x, y) {
    var cell = board.getCell(x, y);
    
    if (cell && cell.isEmpty()) {
      cell.setState(currentPlayer);
      this.switchSide();
    }
  },
  
  /**
   * Switch move between players
   */
  switchSide() {
    currentPlayer = (currentPlayer === CONSTANTS.PLAYER_CROSS ?
                     CONSTANTS.PLAYER_ZERO :
                     CONSTANTS.PLAYER_CROSS);
  },
  
  // /**
  // * Check the options to win
  // */
  // checkWin(x, y) {
    
  // }
};
