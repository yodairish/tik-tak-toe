'use strict';

import game from './game';
import canvas from './canvas';

export default {
  /**
   * Bind click event on canvas
   */
  init() {
    var canvasElem = canvas.getCanvas();
    
    if (canvasElem) {
      canvasElem.addEventListener('click', this.onClick);
      
    } else {
      console.warn('Canvas is not defined');
    }
  },
  
  /**
   * 
   */
  onClick(e) {
    var coords = canvas.getCellPos(e.clientX, e.clientY);
    
    if (coords) {
      game.move(coords.x, coords.y);
    }
  }
};
