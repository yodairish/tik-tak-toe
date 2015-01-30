'use strict';

import Cell from './cell.js';
import canvas from './canvas.js';

var board = [];

export default {
  /**
   * Create new board with choosen size of the side
   * @param {Number} size
   */
  create(size) {
    if (size === this.getCellsInRow()) {
      this.cleanAll();
      
    } else {
      for (let i = 0; i < size; i++) {
        let newArr = [];
        
        for (let j = 0; j < size; j++) {
          newArr.push(new Cell(i, j));
        }
        
        board.push(newArr);
      }
      
      canvas.updateCellSize(this.getCellsInRow());
      this.draw();
    }
  },
  
  /**
   * Set all cell on the board at empty state
   */
  cleanAll() {
    board.forEach(line => {
      line.forEach(cell => cell.setEmpty());
    });
  },
  
  /**
   * Get Count of cell on the board
   * @return {Number}
   */
  getCellsInRow() {
    return board.length;
  },
  
  /**
   * Get cell by position
   * @param {number} x
   * @param {number} y
   * @return {?Object}
   */
  getCell(x, y) {
    return (board[x] && board[x][y] ? board[x][y] :
            null);
  },
  
  /**
   * Draw all cells on the board
   */
  draw() {
    board.forEach(function(line) {
      line.forEach(function(cell) {
        cell.draw();
      });
    });
  }
};
