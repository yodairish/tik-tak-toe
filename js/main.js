'use strict';

import game from './game.js';
import controls from './controls.js';

document.addEventListener('DOMContentLoaded', function() {
  game.init();
  controls.init();
});
