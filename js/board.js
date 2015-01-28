'use strict';

import Cell from './cell.js';

var board = [];

export default {
  /**
   * Create new board with choosen size of the side
   * @param {Number} size
   */
  create(size) {
    for (let i = 0; i < size; i++) {
      let newArr = [];
      
      for (let j = 0; j < size; j++) {
        newArr.push(new Cell(i, j));
      }
      
      board.push(newArr);
    }
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
