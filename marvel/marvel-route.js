const express = require('express');
const ct = require('./marvel-controller')
var router = express.Router();

router.get('/', ct.cache, ct.getCharacters);
router.get('/:characterId', ct.cache, ct.getCharactersById);

module.exports = {
  router: router
}