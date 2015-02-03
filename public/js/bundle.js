/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var game = _interopRequire(__webpack_require__(1));

	var controls = _interopRequire(__webpack_require__(2));

	document.addEventListener("DOMContentLoaded", function () {
	  game.init();
	  controls.init();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _defineProperty = function (obj, key, value) {
	  return Object.defineProperty(obj, key, {
	    value: value,
	    enumerable: true,
	    configurable: true,
	    writable: true
	  });
	};

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var CONSTANTS = _interopRequire(__webpack_require__(4));

	var board = _interopRequire(__webpack_require__(5));

	var canvas = _interopRequire(__webpack_require__(6));

	var sideBar = _interopRequire(__webpack_require__(7));

	var currentPlayer = CONSTANTS.CROSS,
	    winScore = 3,
	    gameFinished = false,
	    hoveredCell = null,
	    score = (function () {
	  var _score = {};

	  _defineProperty(_score, CONSTANTS.CROSS, 0);

	  _defineProperty(_score, CONSTANTS.CIRCLE, 0);

	  return _score;
	})();

	module.exports = {
	  /**
	   * Initialize game
	   */
	  init: function init() {
	    canvas.init();
	    sideBar.init();
	    sideBar.bindNewGame(this.newGame);
	    sideBar.addLineChangedCallback(this.updateBoardSize.bind(this));
	    board.create();
	    this.newGame();
	  },

	  /**
	   * Create new game
	   */
	  newGame: function newGame() {
	    board.reset();
	    currentPlayer = CONSTANTS.CROSS;
	    gameFinished = false;
	  },

	  /**
	   * Update board with new line size
	   */
	  updateBoardSize: function updateBoardSize() {
	    var lineSize = sideBar.getLineSize();

	    winScore = lineSize < 6 ? lineSize : 5;

	    board.setBoardSize(lineSize);
	    this.newGame();
	  },

	  /**
	   * Processing player move
	   * @param {Number} x
	   * @param {Number} y
	   */
	  move: function move(x, y) {
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
	   * Processing player hover cell
	   * @param {Number} x
	   * @param {Number} y
	   */
	  hover: function hover(x, y) {
	    if (gameFinished) {
	      return;
	    }

	    var cell = board.getCell(x, y);

	    if (hoveredCell !== cell) {
	      if (hoveredCell) {
	        hoveredCell.setHover(false);
	      }

	      if (cell) {
	        cell.setHover(true);
	        hoveredCell = cell;
	      } else {
	        hoveredCell = null;
	      }
	    }
	  },

	  /**
	   * Switch move between players
	   */
	  switchSide: function switchSide() {
	    currentPlayer = currentPlayer === CONSTANTS.CROSS ? CONSTANTS.CIRCLE : CONSTANTS.CROSS;
	  },

	  /**
	  * Check the options to win
	  * @param {Number} x
	  * @param {Number} y
	  * @return {boolean}
	  */
	  checkWin: function checkWin(x, y) {
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
	  setWin: function setWin(winCells) {
	    winCells.forEach(function (cell) {
	      return cell.setWin();
	    });
	    score[currentPlayer]++;
	    sideBar.updateScore(score);
	  },

	  /**
	   * Check horizontal line for win
	   */
	  getHorizontalWin: function getHorizontalWin(x, y) {
	    var winCells = [board.getCell(x, y)],
	        last = board.getCellsInRow() - 1;

	    // check right
	    if (x < last) {
	      var nextX = x + 1,
	          cell = board.getCell(nextX, y),
	          samePlayer = cell.getState() === currentPlayer;

	      while (nextX <= last && samePlayer) {
	        winCells.push(cell);

	        nextX++;
	        cell = board.getCell(nextX, y);
	        samePlayer = cell && cell.getState() === currentPlayer;
	      }
	    }

	    // check left
	    if (x > 0) {
	      var nextX = x - 1,
	          cell = board.getCell(nextX, y),
	          samePlayer = cell.getState() === currentPlayer;

	      while (nextX >= 0 && samePlayer) {
	        winCells.push(cell);

	        nextX--;
	        cell = board.getCell(nextX, y);
	        samePlayer = cell && cell.getState() === currentPlayer;
	      }
	    }

	    return winCells;
	  },

	  /**
	   * Check vertical line for win
	   */
	  getVerticalWin: function getVerticalWin(x, y) {
	    var winCells = [board.getCell(x, y)],
	        last = board.getCellsInRow() - 1;

	    // check down
	    if (y < last) {
	      var nextY = y + 1,
	          cell = board.getCell(x, nextY),
	          samePlayer = cell.getState() === currentPlayer;

	      while (nextY <= last && samePlayer) {
	        winCells.push(cell);

	        nextY++;
	        cell = board.getCell(x, nextY);
	        samePlayer = cell && cell.getState() === currentPlayer;
	      }
	    }

	    // check up
	    if (y > 0) {
	      var nextY = y - 1,
	          cell = board.getCell(x, nextY),
	          samePlayer = cell.getState() === currentPlayer;

	      while (nextY >= 0 && samePlayer) {
	        winCells.push(cell);

	        nextY--;
	        cell = board.getCell(x, nextY);
	        samePlayer = cell && cell.getState() === currentPlayer;
	      }
	    }

	    return winCells;
	  },

	  /**
	   * Check first diagonal line for win
	   */
	  getFirstDiagonalWin: function getFirstDiagonalWin(x, y) {
	    var winCells = [board.getCell(x, y)],
	        last = board.getCellsInRow() - 1;

	    // check down right
	    if (x < last && y < last) {
	      var nextX = x + 1,
	          nextY = y + 1,
	          cell = board.getCell(nextX, nextY),
	          samePlayer = cell.getState() === currentPlayer;

	      while (nextX <= last && nextY <= last && samePlayer) {
	        winCells.push(cell);

	        nextX++;
	        nextY++;
	        cell = board.getCell(nextX, nextY);
	        samePlayer = cell && cell.getState() === currentPlayer;
	      }
	    }

	    // check up left
	    if (x > 0 && y > 0) {
	      var nextX = x - 1,
	          nextY = y - 1,
	          cell = board.getCell(nextX, nextY),
	          samePlayer = cell.getState() === currentPlayer;

	      while (nextX >= 0 && nextY >= 0 && samePlayer) {
	        winCells.push(cell);

	        nextX--;
	        nextY--;
	        cell = board.getCell(nextX, nextY);
	        samePlayer = cell && cell.getState() === currentPlayer;
	      }
	    }

	    return winCells;
	  },

	  /**
	   * Check second diagonal line for win
	   */
	  getSecondDiagonalWin: function getSecondDiagonalWin(x, y) {
	    var winCells = [board.getCell(x, y)],
	        last = board.getCellsInRow() - 1;

	    // check up right
	    if (x < last && y > 0) {
	      var nextX = x + 1,
	          nextY = y - 1,
	          cell = board.getCell(nextX, nextY),
	          samePlayer = cell.getState() === currentPlayer;

	      while (nextX <= last && nextY >= 0 && samePlayer) {
	        winCells.push(cell);

	        nextX++;
	        nextY--;
	        cell = board.getCell(nextX, nextY);
	        samePlayer = cell && cell.getState() === currentPlayer;
	      }
	    }

	    // check down left
	    if (x > 0 && y < last) {
	      var nextX = x - 1,
	          nextY = y + 1,
	          cell = board.getCell(nextX, nextY),
	          samePlayer = cell.getState() === currentPlayer;

	      while (nextX >= 0 && nextY <= last && samePlayer) {
	        winCells.push(cell);

	        nextX--;
	        nextY++;
	        cell = board.getCell(nextX, nextY);
	        samePlayer = cell && cell.getState() === currentPlayer;
	      }
	    }

	    return winCells;
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var mouse = _interopRequire(__webpack_require__(3));

	module.exports = {
	  /**
	   * Bind click event on canvas
	   */
	  init: function init() {
	    mouse.init();
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var game = _interopRequire(__webpack_require__(1));

	var canvas = _interopRequire(__webpack_require__(6));

	module.exports = {
	  /**
	   * Bind click event on canvas
	   */
	  init: function init() {
	    var canvasElem = canvas.getCanvas();

	    if (canvasElem) {
	      canvasElem.addEventListener("click", this.onClick);
	      canvasElem.addEventListener("mousemove", this.onMove);
	      canvasElem.addEventListener("mouseout", this.onOut);
	    } else {
	      console.warn("Canvas is not defined");
	    }
	  },

	  /**
	   * Processing mouse click
	   * @param {Object} e
	   */
	  onClick: function onClick(e) {
	    var coords = canvas.getCellPos(e.clientX, e.clientY);

	    if (coords) {
	      game.move(coords.x, coords.y);
	    }
	  },

	  /**
	   * Processing mouse move
	   * @param {Object} e
	   */
	  onMove: function onMove(e) {
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
	  onOut: function onOut() {
	    game.hover(-1, -1);
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  EMPTY: 0,
	  CROSS: 1,
	  CIRCLE: 2,

	  BOARD_BORDER: 3,
	  SIDE_BLOCK: 200,

	  COLOR_BORDER: "#999",
	  COLOR_EMPTY: "#ccc",
	  COLOR_HOVER: "#bbb",
	  COLOR_WIN: "#aaa",
	  COLOR_CROSS: "#f00",
	  COLOR_CIRCLE: "#00f"
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var Cell = _interopRequire(__webpack_require__(8));

	var canvas = _interopRequire(__webpack_require__(6));

	module.exports = {
	  board: [],
	  boardSize: 3,

	  /**
	   * Create new board with choosen size of the side
	   */
	  create: function create() {
	    this.board = [];

	    for (var i = 0; i < this.boardSize; i++) {
	      var newArr = [];

	      for (var j = 0; j < this.boardSize; j++) {
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
	  setBoardSize: function setBoardSize(size) {
	    this.boardSize = size;
	    this.create();
	  },

	  /**
	   * Set all cell on the board at empty state
	   */
	  reset: function reset() {
	    this.board.forEach(function (line) {
	      line.forEach(function (cell) {
	        return cell.setEmpty();
	      });
	    });
	  },

	  /**
	   * Get Count of cell on the board
	   * @return {Number}
	   */
	  getCellsInRow: function getCellsInRow() {
	    return this.boardSize;
	  },

	  /**
	   * Get cell by position
	   * @param {number} x
	   * @param {number} y
	   * @return {?Object}
	   */
	  getCell: function getCell(x, y) {
	    return this.board[x] && this.board[x][y] ? this.board[x][y] : null;
	  },

	  /**
	   * Draw all cells on the board
	   */
	  draw: function draw() {
	    this.board.forEach(function (line) {
	      line.forEach(function (cell) {
	        cell.draw();
	      });
	    });
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var CONSTANTS = _interopRequire(__webpack_require__(4));

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

	module.exports = {
	  /**
	   * Get canvas element and him context
	   */
	  init: function init() {
	    var isPortrait = window.innerWidth < window.innerHeight,
	        width = window.innerWidth - (isPortrait ? 0 : CONSTANTS.SIDE_BLOCK),
	        height = window.innerHeight - (isPortrait ? CONSTANTS.SIDE_BLOCK : 0);

	    virtualBox.sideX = isPortrait ? 0 : CONSTANTS.SIDE_BLOCK;
	    virtualBox.sideY = isPortrait ? CONSTANTS.SIDE_BLOCK : 0;

	    canvas = document.querySelector(".js-game");
	    ctx = canvas.getContext("2d");

	    canvas.width = width;
	    canvas.height = height;


	    this.setFullCanvasSize();
	  },

	  /**
	   * Get canvas element
	   * @return {HTMLElement}
	   */
	  getCanvas: function getCanvas() {
	    return canvas;
	  },

	  /**
	   * Set canvas size by screen size
	   */
	  setFullCanvasSize: function setFullCanvasSize() {
	    var side = canvas.height < canvas.width ? canvas.height : canvas.width,
	        x = side < canvas.width ? (canvas.width - side) / 2 : 0,
	        y = side < canvas.height ? (canvas.height - side) / 2 : 0;

	    this.setCanvasSize(x, y, side);
	  },

	  /**
	   * Set new side and position for working place
	   * @param {Number} x
	   * @param {Number} y
	   * @param {Number} side
	   */
	  setCanvasSize: function setCanvasSize(x, y, side) {
	    if (!canvas) {
	      console.warn("Can't change size, cause canvas not defined");

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
	  * @param {boolean} hover
	  */
	  cell: function cell(x, y, isWin, hover) {
	    var coords = this.getCoordsByPosition(x, y);

	    ctx.fillStyle = isWin ? CONSTANTS.COLOR_WIN : hover ? CONSTANTS.COLOR_HOVER : CONSTANTS.COLOR_EMPTY;

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
	  * @param {boolean} hover
	  */
	  cross: function cross(x, y, isWin, hover) {
	    var coords = this.getCoordsByPosition(x, y),
	        padding = cellSize * 0.2,
	        left = coords.x + padding,
	        right = coords.x + cellSize - padding,
	        top = coords.y + padding,
	        bottom = coords.y + cellSize - padding;

	    this.cell(x, y, isWin, hover);

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
	  * @param {boolean} hover
	  */
	  circle: function circle(x, y, isWin, hover) {
	    var coords = this.getCoordsByPosition(x, y),
	        halfCellSize = cellSize / 2,
	        centerX = coords.x + halfCellSize,
	        centerY = coords.y + halfCellSize,
	        radius = (cellSize - cellSize * 0.4) / 2;


	    this.cell(x, y, isWin, hover);

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
	  updateCellSize: function updateCellSize(cellsInRow) {
	    cellSize = virtualBox.side / cellsInRow;
	    lineWidth = cellSize * 0.1;
	  },

	  /**
	  * Get current cell size
	  * @return {Number}
	  */
	  getCellSize: function getCellSize() {
	    return cellSize;
	  },

	  /**
	  * Get position on screen coordinates by cell position
	  * @param {Number} x
	  * @param {Number} y
	  * @return {Object}
	  */
	  getCoordsByPosition: function getCoordsByPosition(x, y) {
	    return {
	      x: x * cellSize + virtualBox.x,
	      y: y * cellSize + virtualBox.y
	    };
	  },

	  /**
	  * Get cell position by screen coordinates
	  * @param {number} px
	  * @param {number} py
	  * @return {?Object}
	  */
	  getCellPos: function getCellPos(px, py) {
	    var dx = px - virtualBox.x - virtualBox.sideX,
	        dy = py - virtualBox.y - virtualBox.sideY,
	        x,
	        y;

	    if (dx < 0 || dx - virtualBox.side > 0 || dy < 0 || dy - virtualBox.side > 0) {
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var CONSTANTS = _interopRequire(__webpack_require__(4));

	module.exports = {
	  buttonNewGame: null,
	  scoreOne: null,
	  scoreTwo: null,
	  lineSize: null,
	  lineSizeValue: null,
	  lineChangeCallbacks: [],

	  /**
	   * Initialize elements on the sidebar
	   */
	  init: function init() {
	    this.buttonNewGame = document.querySelector(".js-newGame");
	    this.scoreOne = document.querySelector(".js-scoreOne");
	    this.scoreTwo = document.querySelector(".js-scoreTwo");
	    this.lineSize = document.querySelector(".js-lineSize");
	    this.lineSizeValue = document.querySelector(".js-lineSizeValue");

	    this.lineSize.addEventListener("input", this.lineSizeChanged.bind(this));
	  },

	  /**
	   * Output current score
	   * @param {Object} score
	   */
	  updateScore: function updateScore(score) {
	    this.scoreOne.textContent = score[CONSTANTS.CROSS];
	    this.scoreTwo.textContent = score[CONSTANTS.CIRCLE];
	  },

	  /**
	   * Get current line size
	   * @return {Number}
	   */
	  getLineSize: function getLineSize() {
	    return parseInt(this.lineSize.value, 10);
	  },

	  /**
	   * Bind callback on the new game button
	   * @param {Function} cb
	   */
	  bindNewGame: function bindNewGame(cb) {
	    this.buttonNewGame.addEventListener("click", cb);
	  },

	  /**
	   * Add callback on change line size event
	   * @param {Function} cb
	   */
	  addLineChangedCallback: function addLineChangedCallback(cb) {
	    this.lineChangeCallbacks.push(cb);
	  },

	  /**
	   * Processing change the line size
	   */
	  lineSizeChanged: function lineSizeChanged() {
	    this.lineSizeValue.textContent = this.lineSize.value;

	    this.lineChangeCallbacks.forEach(function (cb) {
	      return cb();
	    });
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _prototypeProperties = function (child, staticProps, instanceProps) {
	  if (staticProps) Object.defineProperties(child, staticProps);
	  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
	};

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var CONSTANTS = _interopRequire(__webpack_require__(4));

	var canvas = _interopRequire(__webpack_require__(6));

	module.exports = (function () {
	  var _class = function (x, y) {
	    this.x = x;
	    this.y = y;
	    this.isWin = false;
	    this.hover = false;
	    this.state = CONSTANTS.EMPTY;
	  };

	  _prototypeProperties(_class, null, {
	    getState: {

	      /**
	       * Get current stat of the cell
	       * @return {Number}
	       */
	      value: function getState() {
	        return this.state;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setState: {

	      /**
	       * Set new sate to the cell
	       * @param {Number}
	       */
	      value: function setState(state) {
	        if (this.state !== state) {
	          this.state = state;
	          this.draw();
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    isEmpty: {

	      /**
	       * Checking this cell is empty
	       * @return {boolean}
	       */
	      value: function isEmpty() {
	        return this.state === CONSTANTS.EMPTY || this.state === CONSTANTS.HOVER;
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setEmpty: {

	      /**
	       * Set current cell to empty state
	       */
	      value: function setEmpty() {
	        this.isWin = false;
	        this.setState(CONSTANTS.EMPTY);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setWin: {

	      /**
	       * Set current cell to winning state
	       */
	      value: function setWin() {
	        this.isWin = true;
	        this.draw();
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    setHover: {

	      /**
	       * Change hovered state
	       * @param {boolean} hover
	       */
	      value: function setHover(hover) {
	        hover = !!hover;

	        if (this.hover !== hover) {
	          this.hover = hover;
	          this.draw();
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    draw: {

	      /**
	       * Draw current cell to the canvas
	       */
	      value: function draw() {
	        if (this.state === CONSTANTS.EMPTY) {
	          canvas.cell(this.x, this.y, this.isWin, this.hover);
	        } else if (this.state === CONSTANTS.CROSS) {
	          canvas.cross(this.x, this.y, this.isWin, this.hover);
	        } else if (this.state === CONSTANTS.CIRCLE) {
	          canvas.circle(this.x, this.y, this.isWin, this.hover);
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    }
	  });

	  return _class;
	})();

/***/ }
/******/ ])