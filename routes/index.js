"use strict";
//import {personalLoan} from "../models/models";
var homePageController_1 = require("../controllers/homePageController");
var usersController_1 = require("../controllers/usersController");
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var halson = require('halson');
//mongoose.connect('mongodb://kuda09:305kuda@ds025742.mlab.com:25742/zunde');
/* GET home page. */
router.get('/', homePageController_1.homePageController);
router.post('/api/users', usersController_1.createUserController);
router.get('/api/users/:userid', usersController_1.getUserController);
router.get('/api/users', usersController_1.getUsersController);
router.delete('/api/users/:userid', usersController_1.deleteUserController);
router.put('/api/users/:userid', usersController_1.updateUserController);
module.exports = router;
