import express from "express";
import asyncHandler from "express-async-handler";
import UserController from "../controller/UserController.js";
import { validateFields } from "../validators/fieldValidator.js";
import authenticated from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

class UserRoutes{
    constructor(){
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get('/', authenticated, isAdmin, asyncHandler(this.userController.allUsers.bind(this.userController)));
        this.router.post('/', asyncHandler(this.userController.createUser.bind(this.userController)));
        this.router.get('/:id', authenticated, isAdmin, asyncHandler(this.userController.selectUser.bind(this.userController)));
        this.router.get('/profile/view', authenticated, asyncHandler(this.userController.userProfile.bind(this.userController)));
        this.router.patch('/', authenticated, validateFields('updateUser'), asyncHandler(this.userController.updateUser.bind(this.userController)));
        this.router.delete('/:id', authenticated, asyncHandler(this.userController.deleteUser.bind(this.userController)));
    }

}

const routes = new UserRoutes().router;

export default routes;
