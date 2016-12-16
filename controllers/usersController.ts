///<reference path="../typings/tsd.d.ts"/>
import {Request, Response} from "express";
import {user} from "../models/schemas/schemas";
import {errorMessages} from "../config/errorMsgs";

let mongoose = require("mongoose");
let passport = require('passport');
let Promise = require('bluebird');

Promise.promisifyAll(mongoose);

let userSchema = mongoose.model('user');
let sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}
let setSchema = (schema, body) => {

    schema.username = body.username;
    schema.person_details = body.person_details;
    schema.loan_details = body.loan_details;
    schema.personal_details = body.personal_details;
    schema.business_details = body.business_details;
    schema.how_did_you_hear_about_us = body.how_did_you_hear_about_us;
    schema.setPassword(body.password);

    return schema;

}

export let createUserController = function (req: Request, res: Response, next: Function) {

    let body = req.body;

    if (!body.username || !body.password) {

        sendJSONResponse(res, 400, {message: errorMessages.API.Register.usernameAndPassword});
        return;
    }

    var user = new userSchema();

    userSchema.create(setSchema(user, body))
        .then(function (user) {
            let token = user.generateJWT();
            sendJSONResponse(res, 201, {"token": token});
        })
        .catch((err) => {

            return sendJSONResponse(res, 400, err);
        });
};
export let getUserController = function (req: Request, res: Response, next: Function) {

    let body = req.body;

    if (!body.username || !body.password) {
        sendJSONResponse(res, 400, {message: errorMessages.API.Login.usernameAndPassword});
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



};

