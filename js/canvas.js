'use strict';

var //cellSize = 0,
    canvas = null,
    ctx = null;

export default {
  /**
   * Get canvas element and him context
   */
  init() {
    canvas = document.querySelector('#game');
    ctx = canvas.getContext('2d');
    
    this.setFullCanvasSize();
  },
  
  /**
   * Get canvas element
   * @return {HTMLElement}
   */
  getCanvas() {
    return canvas;
  },
  
  /**
   * Set canvas size by screen size
   */
  setFullCanvasSize() {
    // get screen size
    // this.setCanvasSize(width, height);
  },
  
  /**
   * Set new canvas size
   * @param {Number} width
   * @param {Number} height
   */
  setCanvasSize(width, height) {
    if (!canvas) {
      console.warn('Can\'t change size, cause canvas not defined');
      return;
    }
    
    canvas.width = width;
    canvas.height = height;
  },
  
  /**
  * Draw empty cell
  * @param {Number} x
  * @param {Number} y
  * @param {boolean} isWin
  */
  // cell(x, y, isWin) {
  //   var coords = this.getCoordsByPosition(x, y);
    
  //   if (coords) {
  //     ctx.moveTo(coords.x, coords.y);
  //   }
  // },
  
  // /**
  // * Draw cell for cross
  // * @param {Number} x
  // * @param {Number} y
  // * @param {boolean} isWin
  // */
  // cross(x, y, isWin) {
  //   this.cell(x, y, isWin);
  // },
  
  // /**
  // * Draw cell for circle
  // * @param {Number} x
  // * @param {Number} y
  // * @param {boolean} isWin
  // */
  // circle(x, y, isWin) {
  //   this.cell(x, y, isWin);
  // },
  
  // /**
  // * Update cell size value
  // * @param {Number} cellsCount
  // */
  // setCellSize(cellsCount) {
    
  // },
  
  // /**
  // * Get current cell size
  // * @return {Number}
  // */
  // getCellSize() {
  //   return cellSize;
  // },
  
  /**
  * Get position on screen coordinates by cell position
  * @return {Object}
  */
  // getCoordsByPosition(x, y) {
    
  // }
  
  // /**
  // * Get cell position by screen coordinates
  // * @param {number} px
  // * @param {number} py
  // * @return {?Object}
  // */
  // getCellPos(px, py) {
    
  // }
};
