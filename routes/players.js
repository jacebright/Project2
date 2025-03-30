const express = require('express');
const router = express.Router();

const playersController = require('../controllers/players');
const validation = require('../middleware/validation-middleware');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', isAuthenticated, playersController.getAllPlayers);

router.get('/:id', isAuthenticated, playersController.getSinglePlayer);

router.post('/', isAuthenticated, validation.addPlayer, playersController.createPlayer);

router.put('/:id', isAuthenticated, validation.addPlayer, playersController.updatePlayer);

router.delete('/:id', isAuthenticated, playersController.deletePlayer);

module.exports = router;