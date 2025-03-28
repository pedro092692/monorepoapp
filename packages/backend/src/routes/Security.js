import express from "express";
import LoginController from "../controller/LoginController.js";
import asyncHandler from "express-async-handler";
import { validateFields } from "../validators/fieldValidator.js";


class SecurityRoutes{
    constructor(){
        this.rotuer = express.Router()
        this.securityController = new LoginController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.rotuer.get('/test', async (req, res) => {res.status(200).json({message: 'all is ok'})});
        this.rotuer.post('/api/login', validateFields('login'), asyncHandler(this.securityController.loginUser.bind(this.securityController)));
    }
}

const routes =  new SecurityRoutes().rotuer;
export default routes;