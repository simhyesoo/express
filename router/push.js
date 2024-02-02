const pushRouter = require('express').Router();

pushRouter.get('/', async function (req, res) {
    res.send('push ready...');
})


module.exports = pushRouter;