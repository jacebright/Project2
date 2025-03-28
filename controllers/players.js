const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPlayers = async (req, res) => {
    //#swagger.tags=['Players']
    const result = await mongodb.getDatabase().db().collection('Players').find();
    result.toArray().then((players) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(players);
    })
};

const getSinglePlayer = async (req, res) => {
    //#swagger.tags=['Players']
    const playerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Players').find({_id: playerId});
    result.toArray().then((player) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(player[0]);
    })
};

const createPlayer = async (req, res) => {
    //#swagger.tags=['Players']
    const player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favorite: req.body.favorite
    };
    const response = await mongodb.getDatabase().db().collection('Players').insertOne(player);
    if (response.acknowledged) {
        res.status(204).send(response.body);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the player.');
    }
}

module.exports = {
    getAllPlayers,
    getSinglePlayer,
    createPlayer,
}