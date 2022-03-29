var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var winston = require('winston');
var expressWinston = require('express-winston');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

var app = express();

app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ],
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
