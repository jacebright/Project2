const express = require('express');
const router = express.Router();

const playersController = require('../controllers/players');
const validation = require('../middleware/validation-middleware');

router.get('/', playersController.getAllPlayers);

router.get('/:id', playersController.getSinglePlayer);

router.post('/', validation.addPlayer, playersController.createPlayer);

router.put('/:id', validation.addPlayer, playersController.updatePlayer);

router.delete('/:id', playersController.deletePlayer);

module.exports = router;