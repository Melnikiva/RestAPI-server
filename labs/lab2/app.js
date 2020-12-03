const createError = require('http-errors');
const express = require('express');

const apiRouter = require('./routes/api')

const app = express();

app.use('/api/', apiRouter);

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
