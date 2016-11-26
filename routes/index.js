"use strict";
//import {personalLoan} from "../models/models";
var homePageController_1 = require("../controllers/homePageController");
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var halson = require('halson');
//mongoose.connect('mongodb://kuda09:305kuda@ds025742.mlab.com:25742/zunde');
/* GET home page. */
router.get('/', homePageController_1.homePageController);
router.get('/api', function (req, res, next) {
    res.send('hello api stuff');
});
router.post('/api/register', function (req, res, next) {
});
router.post('/api/apply', function (req, res, next) {
});
module.exports = router;
