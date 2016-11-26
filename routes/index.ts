/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response} from "express";
import {Db} from "mongodb";
//import {personalLoan} from "../models/models";
import {homePageController} from "../controllers/homePageController"
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var halson = require('halson');

//mongoose.connect('mongodb://kuda09:305kuda@ds025742.mlab.com:25742/zunde');

/* GET home page. */

router.get('/', homePageController);

router.get('/api', function(req: Request, res: Response, next: Function) {

  res.send('hello api stuff');
});

router.post('/api/register', (req: Request, res: Response, next: Function) => {


})

router.post('/api/apply', (req: Request, res: Response, next: Function) => {


})



module.exports = router;
