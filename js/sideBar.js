'use strict';

import CONSTANTS from './constants.js';

export default {
  buttonNewGame: null,
  scoreOne: null,
  scoreTwo: null,
  lineSize: null,
  lineSizeValue: null,
  lineChangeCallbacks: [],
  
  /**
   * Initialize elements on the sidebar
   */
  init() {
    this.buttonNewGame = document.querySelector('.js-newGame');
    this.scoreOne = document.querySelector('.js-scoreOne');
    this.scoreTwo = document.querySelector('.js-scoreTwo');
    this.lineSize = document.querySelector('.js-lineSize');
    this.lineSizeValue = document.querySelector('.js-lineSizeValue');
    
    this.lineSize.addEventListener('input', this.lineSizeChanged.bind(this));
  },
  
  /**
   * Output current score
   * @param {Object} score
   */
  updateScore(score) {
    this.scoreOne.textContent = score[CONSTANTS.CROSS];
    this.scoreTwo.textContent = score[CONSTANTS.CIRCLE];
  },
  
  /**
   * Get current line size
   * @return {Number}
   */
  getLineSize() {
    return parseInt(this.lineSize.value, 10);
  },
  
  /**
   * Bind callback on the new game button
   * @param {Function} cb
   */
  bindNewGame(cb) {
    this.buttonNewGame.addEventListener('click', cb);
  },
  
  /**
   * Add callback on change line size event
   * @param {Function} cb
   */
  addLineChangedCallback(cb) {
    this.lineChangeCallbacks.push(cb);
  },
  
  /**
   * Processing change the line size
   */
  lineSizeChanged() {
    this.lineSizeValue.textContent = this.lineSize.value;
    
    this.lineChangeCallbacks.forEach(cb => cb());
  }
};
