'use strict';

import game from './game.js';
import canvas from './canvas.js';

export default {
  /**
   * Bind click event on canvas
   */
  init() {
    var canvasElem = canvas.getCanvas();
    
    if (canvasElem) {
      canvasElem.addEventListener('click', this.onClick);
      canvasElem.addEventListener('mousemove', this.onMove);
      canvasElem.addEventListener('mouseout', this.onOut);
      
    } else {
      console.warn('Canvas is not defined');
    }
  },
  
  /**
   * Processing mouse click
   * @param {Object} e
   */
  onClick(e) {
    var coords = canvas.getCellPos(e.clientX, e.clientY);

    if (coords) {
      game.move(coords.x, coords.y);
    }
  },
  
  /**
   * Processing mouse move
   * @param {Object} e
   */
  onMove(e) {
    var coords = canvas.getCellPos(e.clientX, e.clientY);

    if (coords) {
      game.hover(coords.x, coords.y);
    } else {
      game.hover(-1, -1);
    }
  },
  
  /**
   * Processing mouse move
   */
  onOut() {
    game.hover(-1, -1);
  }
};
