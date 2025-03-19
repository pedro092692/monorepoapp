import express from "express";
import asyncHandler from "express-async-handler";
import UserController from "../controller/UserController.js";

class UserRoutes{
    constructor(){
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.post('/', asyncHandler(this.userController.createUser.bind(this.userController)));
        this.router.get('/:id', asyncHandler(this.userController.selectUser.bind(this.userController)));

    }

}

const routes = new UserRoutes().router;

export default routes;
