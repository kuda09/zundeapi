"use strict";
/// <reference path="../typings/tsd.d.ts"/>
var homePageController_1 = require("../controllers/homePageController");
var usersController_1 = require("../controllers/usersController");
var express = require('express');
var router = express.Router();
var halson = require('halson');
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
//mongoose.connect('mongodb://kuda09:305kuda@ds025742.mlab.com:25742/zunde');
/* GET home page. */
//To add authentication to the routes add the auth payload to the request
//router.post('/locations/:locationid/reviews', auth, ctrlReviews.reviewsCreate);
router.get('/', homePageController_1.homePageController);
router.post('/api/user/register', usersController_1.createUserController);
router.post('/api/user/login', usersController_1.getUserController);
router.get('/api/users', usersController_1.getUsersController);
router.delete('/api/user/delete', auth, usersController_1.deleteUserController);
router.put('/api/user/update', auth, usersController_1.updateUserController);
module.exports = router;
//# sourceMappingURL=index.js.map