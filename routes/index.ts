/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response} from "express";
import {Db} from "mongodb";
//import {personalLoan} from "../models/models";
import {homePageController} from "../controllers/homePageController";
import {createUserController, getUsersController, deleteUserController, updateUserController, getUserController} from "../controllers/usersController";
let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
let halson = require('halson');
let jwt = require('express-jwt');
let auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})

//mongoose.connect('mongodb://kuda09:305kuda@ds025742.mlab.com:25742/zunde');

/* GET home page. */


//To add authentication to the routes add the auth payload to the request
//router.post('/locations/:locationid/reviews', auth, ctrlReviews.reviewsCreate);

router.get('/', homePageController);

router.post('/api/user/register', createUserController);
router.post('/api/user/login', getUserController);
router.get('/api/users', getUsersController);


router.delete('/api/user/:userid', deleteUserController);
router.put('/api/user/:userid', updateUserController);




module.exports = router;
