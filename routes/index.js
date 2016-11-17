"use strict";
var models_ts_1 = require("../models/models.ts");
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var halson = require('halson');
mongoose.connect('mongodb://kuda09:305kuda@ds025742.mlab.com:25742/zunde');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/api', function (req, res, next) {
    res.send('hello api stuff');
});
router.post('/api/register', function (req, res, next) {
});
router.post('/api/apply', function (req, res, next) {
    var loan = req.body;
    console.log(loan);
    if (req.body === null) {
        res.status(400);
        res.setHeader('Content-Type', 'application/vnd.error+json');
        res.json({
            message: 'No content in the body'
        });
    }
    else {
        models_ts_1.personalLoan.save(function (err) {
            if (err) {
                res.status(500);
                res.setHeader('Content-Type', 'application/vnd.error+json');
                res.json({ message: 'Failed to save application information' });
            }
            else {
                res.status(201);
                res.setHeader('Content-Type', 'application/hal+json');
                var resource = halson({
                    created_at: models_ts_1.personalLoan.created_at
                });
                res.send(JSON.stringify(resource));
            }
        });
    }
});
module.exports = router;
