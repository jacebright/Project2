const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
const validation = require('../middleware/validation-middleware');

router.get('/', gamesController.getAllGames);

router.get('/:id', gamesController.getSingleGame);

router.post('/', validation.addGame, gamesController.createGame);

router.put('/:id', validation.addGame, gamesController.updateGame);

router.delete('/:id', gamesController.deleteGame);


module.exports = router;
