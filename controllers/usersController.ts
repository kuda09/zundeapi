import {Request, Response} from "express";
let mongoose = require("mongoose");
import {users} from "../models/schemas/schemas";
let users = mongoose.model('users');

let sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}

export let createUserController = function (req: Request, res: Response, next: Function) {

    var user = {
        username: req.body.username,
        password: req.body.password
    }


    console.log(user);
    users.create(user, (err, user) => {

        if (err) {

            return sendJSONResponse(res, 400, err);
        }

        sendJSONResponse(res, 201, user);

    })
};
export let getUsersController = function (req: Request, res: Response, next: Function) {

    users.find('users').exec((err, users) => {
        sendJSONResponse(res, 200, users);
    })
};
export let getUserController = function (req: Request, res: Response, next: Function) {

    if (req.params && req.params.userid) {

        users
            .findById(req.params.userid)
            .select('username')
            .exec((err, user) => {

                if (!user) {

                    sendJSONResponse(res, 200, {message: 'No user id not found'});

                } else if (err) {

                    sendJSONResponse(res, 404, err);
                    return;
                }

                sendJSONResponse(res, 200, user);
            })
    } else {

        sendJSONResponse(res, 404, {message: 'No location id in the request'})
    }

};
export let deleteUserController = function (req: Request, res: Response, next: Function) {
    res.render('index', {title: 'Get user controller'})
};
export let updateUserController = function (req: Request, res: Response, next: Function) {

    if (!req.params.userid) {

        sendJSONResponse(res, 404, {"message": "Not found, user is required"});
        return;
    }

    users.findById(req.params.userid)
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

