const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllGames = async (req, res) => {
    //#swagger.tags=['Games']
    const result = await mongodb.getDatabase().db().collection('Games').find();
    result.toArray().then((games) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games);
    })
};

const getSingleGame = async (req, res) => {
    //#swagger.tags=['Games']
    const gameId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Games').find({_id: gameId});
    result.toArray().then((game) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(game[0]);
    })
};


const createGame = async (req, res) => {
    //#swagger.tags=['Games']
    const game = {
        name: req.body.name,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        time: req.body.time,
        plays: req.body.plays,
        publisher: req.body.publisher,
        genre: req.body.genre
    };
    const response = await mongodb.getDatabase().db().collection('Games').insertOne(game);
    if (response.acknowledged) {
        res.status(204).send(response.body);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the game.');
    }
}

module.exports = {
    getAllGames,
    getSingleGame,
    createGame,
}