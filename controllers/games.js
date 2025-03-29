const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllGames = (req, res) => {
    //#swagger.tags=['Games']
    mongodb
        .getDatabase()
        .db()
        .collection('Games')
        .find()
        .toArray((err, games) => {
            if (err) {
                res.status(400).json({ message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(games);
        });
};

const getSingleGame = (req, res) => {
    //#swagger.tags=['Games']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to perform the function');
    }
    const gameId = new ObjectId(req.params.id);
    mongodb
        .getDatabase()
        .db()
        .collection('Games')
        .find({_id: gameId})
        .toArray((err, game) => {
            if (err) {
                res.status(400).json({message: err });
            }
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

const updateGame = async (req, res) => {
    //#swagger.tags=['Games']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to perform the function');
    }
    const gameId = new ObjectId(req.params.id);
    const game = {
        name: req.body.name,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        time: req.body.time,
        plays: req.body.plays,
        publisher: req.body.publisher,
        genre: req.body.genre
    };
    const response = await mongodb.getDatabase().db().collection('Games').replaceOne({ _id:gameId}, game);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(reponse.error || 'Some error occured while updating the game.');
    }
};

const deleteGame = async (req, res) => {
    //#swagger.tags=['Games']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to perform the function');
    }
    const gameId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Games').deleteOne({ _id:gameId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the game.')
    }
}

module.exports = {
    getAllGames,
    getSingleGame,
    createGame,
    updateGame,
    deleteGame,
}