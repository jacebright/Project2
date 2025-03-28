const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/players');

router.get('/', gamesController.getAllPlayers);

router.get('/:id', gamesController.getSinglePlayer);

router.post('/', gamesController.createPlayer);

module.exports = router;