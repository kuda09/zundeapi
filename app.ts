/// <reference path="./typings/tsd.d.ts"/>
require('dotenv').load();
import {Request, Response} from "express";
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const connections = require('./models/db');
require('./config/password');
const routes = require('./routes/index');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


connections();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  // Here we are creating a unique session identifier
  secret: process.env.JWT_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(function(req: Request, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: Function) => {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err: Error, req: Request, res: Response, next: Function) => {

    if(err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({
        "message": `${err.name} : ${err.message}`
      })
    }
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: Request, res: Response, next: Function) =>{
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use((err: any, req: Request, res: Response, next: Function) => {

  if(err.name === 'UnauthorizedError'){

    res.status(401);
    res.json({"message" : err.message});
  }
})

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: Function) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
