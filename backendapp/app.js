//var createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const { jwtVerify } = require('./middleware/check-jwt');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/eventdb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

const app = express();

app.use('/picture', express.static(__dirname + '/assets/eventImages'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', jwtVerify);
app.use('/events', eventsRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // try {
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get('env') === 'development' ? err : {};
  // } catch (ex) {
  //   console.log(ex);
  // }
  // console.log(err);
  // render the error page
  res.status(err.status || 500).json(err);
});

//const port = normalizePort(process.env.PORT || '3000');
app.listen(3000, () => { console.log(`Listening on ... 3000`) });

//module.exports = app;
