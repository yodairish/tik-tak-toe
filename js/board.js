'use strict';

import Cell from './cell.js';
import canvas from './canvas.js';

export default {
  board: [],
  boardSize: 3,
  
  /**
   * Create new board with choosen size of the side
   */
  create() {
    this.board = [];
    
    for (let i = 0; i < this.boardSize; i++) {
      let newArr = [];
      
      for (let j = 0; j < this.boardSize; j++) {
        newArr.push(new Cell(i, j));
      }
      
      this.board.push(newArr);
    }
    
    canvas.updateCellSize(this.getCellsInRow());
    this.draw();
  },
  
  /**
   * Update size of the board and recreate it
   * @param {Number} size
   */
  setBoardSize(size) {
    this.boardSize = size;
    this.create();
  },
  
  /**
   * Set all cell on the board at empty state
   */
  reset() {
    this.board.forEach(line => {
      line.forEach(cell => cell.setEmpty());
    });
  },
  
  /**
   * Get Count of cell on the board
   * @return {Number}
   */
  getCellsInRow() {
    return this.boardSize;
  },
  
  /**
   * Get cell by position
   * @param {number} x
   * @param {number} y
   * @return {?Object}
   */
  getCell(x, y) {
    return (this.board[x] && this.board[x][y] ? this.board[x][y] :
            null);
  },
  
  /**
   * Draw all cells on the board
   */
  draw() {
    this.board.forEach(line => {
      line.forEach(cell => {
        cell.draw();
      });
    });
  }
};
