import {Request, Response} from "express";

export let homePageController = function(req: Request, res: Response, next: Function) {
    res.render('index', { title: 'Express' })
};