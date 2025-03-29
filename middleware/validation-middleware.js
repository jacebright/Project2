const validator = require('../helper/validate');
const addGame = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "minPlayers": "required|integer",        
        "maxPlayers": "required|integer",        
        "time": "required|integer",        
        "plays": "required|integer",
        "publisher": "string",        
        "genre": "string"
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const addPlayer = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",        
        "favorite": "string"
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}


module.exports = {
    addGame, 
    addPlayer
};