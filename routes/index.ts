/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response} from "express";
import {Db} from "mongodb";
//import {personalLoan} from "../models/models";
import {homePageController} from "../controllers/homePageController";
import {createUserController, getUsersController, deleteUserController, updateUserController, getUserController} from "../controllers/usersController";
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var halson = require('halson');

//mongoose.connect('mongodb://kuda09:305kuda@ds025742.mlab.com:25742/zunde');

/* GET home page. */

router.get('/', homePageController);

router.post('/api/users', createUserController);
router.get('/api/users/:userid', getUserController);
router.get('/api/users', getUsersController);
router.delete('/api/users/:userid', deleteUserController);
router.put('/api/users/:userid', updateUserController);




module.exports = router;
