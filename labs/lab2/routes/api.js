const router = require('express').Router();

const userRouter = require('./users');
const compositionRouter = require('./compositions');

router.use('/users', userRouter);
router.use('/compositions', compositionRouter);

module.exports = router;