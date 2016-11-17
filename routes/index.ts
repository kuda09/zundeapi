/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response} from "express";
import {Db} from "mongodb";
import {personalLoan} from "../models/models.ts";
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var halson = require('halson');

mongoose.connect('mongodb://kuda09:305kuda@ds025742.mlab.com:25742/zunde');

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: Function) {
  res.render('index', { title: 'Express' })
});

router.get('/api', function(req: Request, res: Response, next: Function) {

  res.send('hello api stuff');
});

router.post('/api/register', (req: Request, res: Response, next: Function) => {


})

router.post('/api/apply', (req: Request, res: Response, next: Function) => {

  let loan = req.body;

  console.log(loan);
  if(req.body === null) {

    res.status(400);
    res.setHeader('Content-Type', 'application/vnd.error+json');
    res.json({
      message: 'No content in the body'
    });

  } else {

    personalLoan.save((err) => {

      if(err) {

        res.status(500);
        res.setHeader('Content-Type', 'application/vnd.error+json');
        res.json({message: 'Failed to save application information'});
      } else {

        res.status(201);
        res.setHeader('Content-Type', 'application/hal+json');

        let resource = halson({
          created_at: personalLoan.created_at
        })

        res.send(JSON.stringify(resource));
      }

    })

  }


})



module.exports = router;
