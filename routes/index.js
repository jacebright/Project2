const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    (res.send('HelloWorld'))
});

router.use('/games', require('./games'))

router.use('/players', require('./players'))

module.exports = router;