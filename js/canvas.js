'use strict';

import CONSTANTS from './constants.js';

var cellSize = 0,
    lineWidth = 0,
    canvas = null,
    ctx = null,
    virtualBox = {
      x: 0,
      y: 0,
      sideX: 0,
      sideY: 0,
      side: 0
    };

export default {
  /**
   * Get canvas element and him context
   */
  init() {
    var isPortrait = (window.innerWidth < window.innerHeight),
        width = window.innerWidth - (isPortrait ? 0 : CONSTANTS.SIDE_BLOCK),
        height = window.innerHeight - (isPortrait ? CONSTANTS.SIDE_BLOCK : 0);
        
    virtualBox.sideX = (isPortrait ? 0 : CONSTANTS.SIDE_BLOCK);
    virtualBox.sideY = (isPortrait ? CONSTANTS.SIDE_BLOCK : 0);
    
    canvas = document.querySelector('.js-game');
    ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    
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
    var side = (canvas.height < canvas.width ? canvas.height :
                canvas.width),
        x = (side < canvas.width ? ((canvas.width - side) / 2) : 
             0),
        y = (side < canvas.height ? ((canvas.height - side) / 2) : 
             0);
    
    this.setCanvasSize(x, y, side);
  },
  
  /**
   * Set new side and position for working place
   * @param {Number} x
   * @param {Number} y
   * @param {Number} side
   */
  setCanvasSize(x, y, side) {
    if (!canvas) {
      console.warn('Can\'t change size, cause canvas not defined');
      
      return;
    }
    
    virtualBox.x = x;
    virtualBox.y = y;
    virtualBox.side = side;
  },
  
  /**
  * Draw empty cell
  * @param {Number} x
  * @param {Number} y
  * @param {boolean} isWin
  */
  cell(x, y, isWin) {
    var coords = this.getCoordsByPosition(x, y);
    
    ctx.fillStyle = (isWin ? CONSTANTS.COLOR_WIN : CONSTANTS.COLOR_EMPTY);
    ctx.strokeStyle = CONSTANTS.COLOR_BORDER;
    ctx.lineWidth = 1;
    
    ctx.fillRect(coords.x, coords.y, cellSize, cellSize);
    ctx.strokeRect(coords.x, coords.y, cellSize, cellSize);
  },
  
  /**
  * Draw cell for cross
  * @param {Number} x
  * @param {Number} y
  * @param {boolean} isWin
  */
  cross(x, y, isWin) {
    var coords = this.getCoordsByPosition(x, y),
        padding = cellSize * 0.2,
        left = coords.x + padding,
        right = coords.x + cellSize - padding,
        top = coords.y + padding,
        bottom = coords.y + cellSize - padding;
    
    this.cell(x, y, isWin);
    
    ctx.strokeStyle = CONSTANTS.COLOR_CROSS;
    ctx.lineWidth = lineWidth;
    
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(right, bottom);
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(right, top);
    ctx.lineTo(left, bottom);
    ctx.closePath();
    ctx.stroke();
  },
  
  /**
  * Draw cell for circle
  * @param {Number} x
  * @param {Number} y
  * @param {boolean} isWin
  */
  circle(x, y, isWin) {
    var coords = this.getCoordsByPosition(x, y),
        halfCellSize = (cellSize / 2),
        centerX = coords.x + halfCellSize,
        centerY = coords.y + halfCellSize,
        radius = (cellSize - (cellSize * 0.4)) / 2;
    
    this.cell(x, y, isWin);
    
    ctx.strokeStyle = CONSTANTS.COLOR_CIRCLE;
    ctx.lineWidth = lineWidth;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  },
  
  /**
  * Update cell size by count
  * @param {Number} cellsInRow
  */
  updateCellSize(cellsInRow) {
    cellSize = virtualBox.side / cellsInRow;
    lineWidth = cellSize * 0.1;
  },
  
  /**
  * Get current cell size
  * @return {Number}
  */
  getCellSize() {
    return cellSize;
  },
  
  /**
  * Get position on screen coordinates by cell position
  * @param {Number} x
  * @param {Number} y
  * @return {Object}
  */
  getCoordsByPosition(x, y) {
    return {
      x: (x * cellSize) + virtualBox.x,
      y: (y * cellSize) + virtualBox.y
    };
  },
  
  /**
  * Get cell position by screen coordinates
  * @param {number} px
  * @param {number} py
  * @return {?Object}
  */
  getCellPos(px, py) {
    var dx = px - virtualBox.x - virtualBox.sideX,
        dy = py - virtualBox.y - virtualBox.sideY,
        x,
        y;
    
    if (dx < 0 || dx - virtualBox.side > 0 ||
        dy < 0 || dy - virtualBox.side > 0) {
      return null;
    }
    
    x = Math.floor(dx / cellSize);
    y = Math.floor(dy / cellSize);

    return {
      x: x,
      y: y
    };
  }
};
