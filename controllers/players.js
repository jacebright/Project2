const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPlayers = (req, res) => {
    //#swagger.tags=['Players']
    mongodb
        .getDatabase()
        .db()
        .collection('Players')
        .find()
        .toArray((err, player) => {
            if (err) {
                res.status(400).json({ message: err});
            } 
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(player);
        });
};

const getSinglePlayer = (req, res) => {
    //#swagger.tags=['Players']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to perform the function');
    }
    const playerId = new ObjectId(req.params.id);
    mongodb
        .getDatabase()
        .db()
        .collection('Players')
        .find({_id: playerId})
        .toArray((err, player) => {
            if (err) {
                res.status(400).json({message: err });
            }
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

const updatePlayer = async (req, res) => {
    //#swagger.tags=['Players']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to perform the function');
    }
    const playerId = new ObjectId(req.params.id);
    const player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favorite: req.body.favorite
    };
    const response = await mongodb.getDatabase().db().collection('Players').replaceOne({ _id:playerId}, player);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(reponse.error || 'Some error occured while updating the player.');
    }
};

const deletePlayer = async (req, res) => {
    //#swagger.tags=['Players']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to perform the function');
    }
    const playerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Players').deleteOne({ _id:playerId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the player.')
    }
}

module.exports = {
    getAllPlayers,
    getSinglePlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
}