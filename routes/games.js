const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
const validation = require('../middleware/validation-middleware');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', gamesController.getAllGames);

router.get('/:id', gamesController.getSingleGame);

router.post('/', isAuthenticated, validation.addGame, gamesController.createGame);

router.put('/:id', isAuthenticated, validation.addGame, gamesController.updateGame);

router.delete('/:id', isAuthenticated, gamesController.deleteGame);


module.exports = router;
