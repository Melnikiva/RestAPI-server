const router = require('express').Router();

const userRouter = require('./users');
const compositionRouter = require('./compositions');


router.get('/', (req, res) => {
    res.render('index');
})

router.get('/about', function (req, res) {
    res.render('about');
})

router.use('/users', userRouter)
router.use('/compositions', compositionRouter);

module.exports = router;