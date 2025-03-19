import express from "express";
import SecretController from "../controller/SecretController.js";
import asyncHandler from "express-async-handler";
import { validateFields } from "../validators/fieldValidator.js";

class SecretRoutes{
    constructor(){
        this.router = express.Router();
        this.sController = new SecretController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.post('/', validateFields("createSecret"), asyncHandler(this.sController.createSecreet.bind(this.sController)));

    }


}

const routes = new SecretRoutes().router;
export default routes;