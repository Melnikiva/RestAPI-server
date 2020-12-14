const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const mustache = require('mustache-express');
const path = require('path');

const apiRouter = require('./routes/api/api.js')
const serviceRouter = require('./routes/server/service');

const app = express();

app.use('/api/', apiRouter);
app.use('/', serviceRouter);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('mst', mustache());
// set app options
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mst');


// swagger
const expressSwaggerGenerator = require('express-swagger-generator');
const expressSwagger = expressSwaggerGenerator(app);

const options = {
  swaggerDefinition: {
    info: {
      description: 'Detailed documentation',
      title: 'Lab2 api documentation',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    produces: ["application/json"],
  },
  basedir: __dirname,
  files: ['./routes/**/*.js', './models/**/*.js'],
};
expressSwagger(options);

app.listen(3000);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;
