const router = require('express').Router();

const userRouter = require('./users');
const compositionRouter = require('./compositions');
const mediaRouter = require('./media')

router.use('/users', userRouter);
router.use('/compositions', compositionRouter);
router.use('/media', mediaRouter);

module.exports = router;