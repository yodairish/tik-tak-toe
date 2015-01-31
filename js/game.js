'use strict';

import CONSTANTS from './constants.js';
import board from './board.js';
import canvas from './canvas.js';
import sideBar from './sideBar.js';

var currentPlayer = CONSTANTS.CROSS,
    winScore = 5,
    gameFinished = false,
    score = {
      [CONSTANTS.CROSS]: 0,
      [CONSTANTS.CIRCLE]: 0
    };

export default {
  /**
   * Initialize game
   */
  init() {
    canvas.init();
    sideBar.init();
    sideBar.bindNewGame(this.newGame);
    this.newGame();
  },
  
  /**
   * Create new game
   */
  newGame() {
    board.create();
    currentPlayer = CONSTANTS.CROSS;
    gameFinished = false;
  },

  /**
   * Processing player move
   * @param {Number} x
   * @param {Number} y
   */
  move(x, y) {
    if (gameFinished) {
      return;
    }
    
    var cell = board.getCell(x, y);
    
    if (cell && cell.isEmpty()) {
      cell.setState(currentPlayer);
      
      if (this.checkWin(x, y)) {
        gameFinished = true;
        
      } else {
        this.switchSide();
      }
    }
  },
  
  /**
   * Switch move between players
   */
  switchSide() {
    currentPlayer = (currentPlayer === CONSTANTS.CROSS ?
                     CONSTANTS.CIRCLE :
                     CONSTANTS.CROSS);
  },
  
  /**
  * Check the options to win
  * @param {Number} x
  * @param {Number} y
  * @return {boolean}
  */
  checkWin(x, y) {
    var winCells = this.getHorizontalWin(x, y),
        isWin = false;

    if (winCells.length < winScore) {
      winCells = this.getVerticalWin(x, y);
    }
    
    if (winCells.length < winScore) {
      winCells = this.getFirstDiagonalWin(x, y);
    }
    
    if (winCells.length < winScore) {
      winCells = this.getSecondDiagonalWin(x, y);
    }
    
    if (winCells.length >= winScore) {
      isWin = true;
      this.setWin(winCells);
    }
    
    return isWin;
  },
  
  /**
   * Set current player win and highligts cells
   * @param {Array} winCells
   */
  setWin(winCells) {
    winCells.forEach(cell => cell.setWin());
    score[currentPlayer]++;
    sideBar.updateScore(score);
  },
  
  /**
   * Check horizontal line for win
   */
  getHorizontalWin(x, y) {
    var winCells = [board.getCell(x, y)],
        last = board.getCellsInRow() - 1;
    
    // check right
    if (x < last) {
      let nextX = x + 1,
          cell = board.getCell(nextX, y),
          samePlayer = cell.getState() === currentPlayer;
      
      while(nextX <= last && samePlayer) {
        winCells.push(cell);
        
        nextX++;
        cell = board.getCell(nextX, y);
        samePlayer = (cell && (cell.getState() === currentPlayer));
      }
    }
    
    // check left
    if (x > 0) {
      let nextX = x - 1,
          cell = board.getCell(nextX, y),
          samePlayer = cell.getState() === currentPlayer;
      
      while(nextX >= 0 && samePlayer) {
        winCells.push(cell);
        
        nextX--;
        cell = board.getCell(nextX, y);
        samePlayer = (cell && (cell.getState() === currentPlayer));
      }
    }
    
    return winCells;
  },
  
  /**
   * Check vertical line for win
   */
  getVerticalWin(x, y) {
    var winCells = [board.getCell(x, y)],
        last = board.getCellsInRow() - 1;
    
    // check down
    if (y < last) {
      let nextY = y + 1,
          cell = board.getCell(x, nextY),
          samePlayer = cell.getState() === currentPlayer;
      
      while(nextY <= last && samePlayer) {
        winCells.push(cell);
        
        nextY++;
        cell = board.getCell(x, nextY);
        samePlayer = (cell && (cell.getState() === currentPlayer));
      }
    }
    
    // check up
    if (y > 0) {
      let nextY = y - 1,
          cell = board.getCell(x, nextY),
          samePlayer = cell.getState() === currentPlayer;
      
      while(nextY >= 0 && samePlayer) {
        winCells.push(cell);
        
        nextY--;
        cell = board.getCell(x, nextY);
        samePlayer = (cell && (cell.getState() === currentPlayer));
      }
    }
    
    return winCells;
  },

  /**
   * Check first diagonal line for win
   */
  getFirstDiagonalWin(x, y) {
    var winCells = [board.getCell(x, y)],
        last = board.getCellsInRow() - 1;
    
    // check down right
    if (x < last && y < last) {
      let nextX = x + 1,
          nextY = y + 1,
          cell = board.getCell(nextX, nextY),
          samePlayer = cell.getState() === currentPlayer;
      
      while(nextX <= last && nextY <= last && samePlayer) {
        winCells.push(cell);
        
        nextX++;
        nextY++;
        cell = board.getCell(nextX, nextY);
        samePlayer = (cell && (cell.getState() === currentPlayer));
      }
    }
    
    // check up left
    if (x > 0 && y > 0) {
      let nextX = x - 1,
          nextY = y - 1,
          cell = board.getCell(nextX, nextY),
          samePlayer = cell.getState() === currentPlayer;
      
      while(nextX >= 0 && nextY >= 0 && samePlayer) {
        winCells.push(cell);
        
        nextX--;
        nextY--;
        cell = board.getCell(nextX, nextY);
        samePlayer = (cell && (cell.getState() === currentPlayer));
      }
    }
    
    return winCells;
  },
  
  /**
   * Check second diagonal line for win
   */
  getSecondDiagonalWin(x, y) {
    var winCells = [board.getCell(x, y)],
        last = board.getCellsInRow() - 1;
    
    // check up right
    if (x < last && y > 0) {
      let nextX = x + 1,
          nextY = y - 1,
          cell = board.getCell(nextX, nextY),
          samePlayer = cell.getState() === currentPlayer;
      
      while(nextX <= last && nextY >= 0 && samePlayer) {
        winCells.push(cell);
        
        nextX++;
        nextY--;
        cell = board.getCell(nextX, nextY);
        samePlayer = (cell && (cell.getState() === currentPlayer));
      }
    }
    
    // check down left
    if (x > 0 && y < last) {
      let nextX = x - 1,
          nextY = y + 1,
          cell = board.getCell(nextX, nextY),
          samePlayer = cell.getState() === currentPlayer;
      
      while(nextX >= 0 && nextY <= last && samePlayer) {
        winCells.push(cell);
        
        nextX--;
        nextY++;
        cell = board.getCell(nextX, nextY);
        samePlayer = (cell && (cell.getState() === currentPlayer));
      }
    }
    
    return winCells;
  }
};
