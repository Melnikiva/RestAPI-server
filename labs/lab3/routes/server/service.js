const router = require('express').Router();
const path = require('path');

const userRouter = require('./users');
const compositionRouter = require('./compositions');


router.get('/', function (req, res) {
    res.render('index');
})

router.get('/about', function (req, res) {
    res.render('about');
})

router.get('/data/media/:id', function (req, res) {
    res.sendFile(path.join(__dirname, `../../data/media/${parseInt(req.params.id)}.png`));
})

router.use('/users', userRouter)
router.use('/compositions', compositionRouter);

module.exports = router;