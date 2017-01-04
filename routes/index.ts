/// <reference path="../typings/tsd.d.ts"/>

import {homePageController} from "../controllers/homePageController";
import {createUserController, getUsersController, deleteUserController, updateUserController, getUserController} from "../controllers/usersController";
let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
let halson = require('halson');
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.JWT_SECRET, userProperty: 'payload'});

router.get('/', homePageController);

router.post('/api/user/register', createUserController);
router.post('/api/user/login', getUserController);
router.get('/api/users', auth, getUsersController);

router.delete('/api/user/delete', auth, deleteUserController);
router.patch('/api/user/update', auth, updateUserController);

module.exports = router;
