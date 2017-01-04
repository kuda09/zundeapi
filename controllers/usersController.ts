///<reference path="../typings/tsd.d.ts"/>

import {user} from "../models/schemas/schemas";
import {API_ERROR_MESSAGES} from "../errors/errorMessages";
import {Request, Response} from "express";
import {removeNonUpdatableElementsFromObject, sendJSONResponse} from "../helpers/utils";
const mongoose = require("mongoose");
const passport = require('passport');
const Promise = require('bluebird');
const _ = require("lodash");

Promise.promisifyAll(mongoose);
const userSchema = mongoose.model('user');

export const createUserController = function (req: Request, res: Response, next: Function) {

    let body = req.body;

    if (!body.username || !body.password) {
        return sendJSONResponse(res, 400, {message: API_ERROR_MESSAGES.register.missingFields});
    }

    var user = new userSchema();
    user.username = body.username;
    user.person_details = body.person_details;
    user.loan_details = body.loan_details;
    user.personal_details = body.personal_details;
    user.business_details = body.business_details;
    user.how_did_you_hear_about_us = body.how_did_you_hear_about_us;
    user.setPassword(body.password);

    userSchema.create(user)
        .then(user => {
            let token = user.generateJWT();
            sendJSONResponse(res, 201, {"token": token});
        })
        .catch(err => {

            if (err.code === 11000) {
                return sendJSONResponse(res, 400, {code: err.code, message: API_ERROR_MESSAGES.register.duplicateUsername});
            }

            return sendJSONResponse(res, 400, {code: err.code, message: API_ERROR_MESSAGES.register.genericError});
        })

    next();
};
export const getUserController = function (req: Request, res: Response, next: Function) {

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

    next();


};
export const getUsersController = function (req: Request, res: Response, next: Function) {

    userSchema.find('User')
        .then(users => sendJSONResponse(res, 200, users))
        .catch(err => sendJSONResponse(res, 401, err));

    next();
};
export const deleteUserController = function (req: Request, res: Response, next: Function) {

    let body = req.body;

    userSchema.findOneAndRemove({username: body.username})
        .then(user => sendJSONResponse(res, 204, { message: 'User Deleted'}))
        .catch((err) => sendJSONResponse(res, 401, {code: err.code, message: API_ERROR_MESSAGES.delete.failedDelete}));

    next();

};
export const updateUserController = function (req: Request, res: Response, next: Function) {

    const username = {username: req.body.username};
    var updatedUserObject = req.body;

    userSchema.findOne(username)
        .then((user) => {
            updatedUserObject = removeNonUpdatableElementsFromObject(updatedUserObject);
            user = _.merge(user, updatedUserObject);

            user.save(user)
                .then(data => sendJSONResponse(res, 202, {data: updatedUserObject, message: "User details updated"}))
                .catch((err) => sendJSONResponse(res, 204, {code: err.code, message: API_ERROR_MESSAGES.register.genericError}));
        })
        .catch((err) => sendJSONResponse(res, 204, {code: err.code, message: API_ERROR_MESSAGES.update.noUserFound}));

    next();
};

