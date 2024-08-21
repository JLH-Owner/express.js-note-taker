const router = require('express').Router();

// Import our modular routers for /api and /html
const apiRouter = require('./apiRoutes');
const htmlRouter = require('./htmlRoutes');

router.use('/apiRoutes', apiRouter);
router.use('/htmlRoutes', htmlRouter);

module.exports = router;