/// <reference path="./typings/tsd.d.ts"/>
require('dotenv').load();
require('./config/password');

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');
let connections = require('./models/db');
let expressJWT = require('express-jwt');
let expressUnless = require('express-unless');

import {Request, Response} from "express";

let routes = require('./routes/index');
let app = express();

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

app.use('/', routes);


app.use(expressJWT({secret: process.env.JWT_SECRET})).expressUnless({
  path: [
      { url: '/api/user/login', methods: ['POST']},
      { url: '/api/user/register', methods: ['POST']}
  ]
})

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
