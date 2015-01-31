'use strict';

import CONSTANTS from './constants.js';

var buttonNewGame = null,
    scoreOne = null,
    scoreTwo = null;

export default {
  /**
   * Initialize elements on the sidebar
   */
  init() {
    buttonNewGame = document.querySelector('.js-newGame');
    scoreOne = document.querySelector('.js-scoreOne');
    scoreTwo = document.querySelector('.js-scoreTwo');
  },
  
  /**
   * Output current score
   * @param {Object} score
   */
  updateScore(score) {
    scoreOne.textContent = score[CONSTANTS.CROSS];
    scoreTwo.textContent = score[CONSTANTS.CIRCLE];
  },
  
  bindNewGame(handler) {
    buttonNewGame.addEventListener('click', handler);
  }
};
