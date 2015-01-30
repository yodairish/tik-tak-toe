'use strict';

import CONSTANTS from './constants.js';
import canvas from './canvas.js';

export default class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isWin = false;
    this.state = CONSTANTS.EMPTY; //Math.floor(Math.random() * 3);
  }
  
  /**
   * Get current stat of the cell
   * @return {Number}
   */
  getState() {
    return this.state;
  }
  
  /**
   * Set new sate to the cell
   * @param {Number}
   */
  setState(state) {
    if (this.state !== state) {
      this.state = state;
      this.draw();
    }
  }
  
  /**
   * Checking this cell is empty
   * @return {boolean}
   */
  isEmpty() {
    return (this.state === CONSTANTS.EMPTY);
  }
  
  /**
   * Set current cell to empty state
   */
  setEmpty() {
    this.isWin = false;
    this.setState(CONSTANTS.EMPTY);
  }
  
  /**
   * Set current cell to winning state
   */
  setWin() {
    this.isWin = true;
    this.draw();
  }
  
  /**
   * Draw current cell to the canvas
   */
  draw() {
    if (this.state === CONSTANTS.EMPTY) {
      canvas.cell(this.x, this.y, this.isWin);
      
    } else if (this.state === CONSTANTS.CROSS) {
      canvas.cross(this.x, this.y, this.isWin);
      
    } else if (this.state === CONSTANTS.CIRCLE) {
      canvas.circle(this.x, this.y, this.isWin);
    }
  }
}
