/// <reference path="../typings/tsd.d.ts"/>
"use strict";
var homePageController_1 = require("../controllers/homePageController");
var usersController_1 = require("../controllers/usersController");
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var halson = require('halson');
var jwt = require('express-jwt');
var auth = jwt({ secret: process.env.JWT_SECRET, userProperty: 'payload' });
router.get('/', homePageController_1.homePageController);
router.post('/api/user/register', usersController_1.createUserController);
router.post('/api/user/login', usersController_1.getUserController);
router.get('/api/users', auth, usersController_1.getUsersController);
router.delete('/api/user/delete', auth, usersController_1.deleteUserController);
router.patch('/api/user/update', auth, usersController_1.updateUserController);
module.exports = router;
//# sourceMappingURL=index.js.map