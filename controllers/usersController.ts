///<reference path="../typings/tsd.d.ts"/>


import {Request, Response} from "express";
let mongoose = require("mongoose");
let passport = require('passport');
let Promise = require('bluebird');

Promise.promisifyAll(mongoose);
import {user} from "../models/schemas/schemas";
let userSchema = mongoose.model('user');

let sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}

export let createUserController = function (req: Request, res: Response, next: Function) {

    let body = req.body;

    if (!body.username || !body.password) {

        sendJSONResponse(res, 400, {message: "All fields are required"});
        return;
    }


    var user = new userSchema();
    user.username = body.username;
    user.person_details = body.person_details;
    user.loan_details = body.loan_details;
    user.personal_details = body.personal_details;
    user.business_details = body.business_details;
    user.how_did_you_hear_about_us = body.how_did_you_hear_about_us;
    user.setPassword(body.password);

    userSchema.create(user, (err, user) => {

        if (err) {

            return sendJSONResponse(res, 400, err);
        }

        let token = user.generateJWT();
        sendJSONResponse(res, 201, {"token": token});

    });
};
export let getUserController = function (req: Request, res: Response, next: Function) {

    let body = req.body;

    if (!body.username || !body.password) {
        sendJSONResponse(res, 400, {message: "All fields are required"});
        return;
    }

    passport.authenticate('local', (err, user, info) => {
        let token;

        if (err) {
            sendJSONResponse(res, 400, err);
            return;
        }

        if (user) {

            token = user.generateJWT();
            sendJSONResponse(res, 201, {"token": token});
        } else {
            sendJSONResponse(res, 401, info);
        }

    })(req, res);


};


export let getUsersController = function (req: Request, res: Response, next: Function) {

    userSchema.find('User').then((users) => {
        sendJSONResponse(res, 200, users);
    }, (err) => {
        sendJSONResponse(res, 401, err);
    })
};
export let deleteUserController = function (req: Request, res: Response, next: Function) {

    let body = req.body;

    if (req.payload && req.payload.email) {

        userSchema.findOneAndRemove({
            username: body.username
        }).then(user => {

            sendJSONResponse(res, 204, user.username)
        }, (err) => {

            sendJSONResponse(res, 404, err);
        })
    }


};
export let updateUserController = function (req: Request, res: Response, next: Function) {

    if (!req.params.userid) {

        sendJSONResponse(res, 404, {"message": "Not found, user is required"});
        return;
    }

    User.findById(req.params.userid)
        .exec((err, user) => {
            if (!user) {
                sendJSONResponse(res, 404, {"message": "userid not found"});
                return
            } else if (err) {
                sendJSONResponse(res, 400, err);
                return
            }

            user.save((err, user) => {

                if (err) {
                    sendJSONResponse(res, 404, err);
                } else {
                    sendJSONResponse(res, 200, user);
                }
            })

        })
};

