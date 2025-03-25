import express from "express";
import SecretController from "../controller/SecretController.js";
import asyncHandler from "express-async-handler";
import { validateFields } from "../validators/fieldValidator.js";
import authenticated from "../middlewares/authMiddleware.js";

class SecretRoutes{
    constructor(){
        this.router = express.Router();
        this.sController = new SecretController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.post('/', authenticated, validateFields("createSecret"), asyncHandler(this.sController.createSecreet.bind(this.sController)));
        this.router.get('/:id', authenticated, asyncHandler(this.sController.selectSecret.bind(this.sController)));
        this.router.get('/mysecrets/view', authenticated, asyncHandler(this.sController.userSecrets.bind(this.sController)));
        this.router.patch('/:id', authenticated, asyncHandler(this.sController.updateSecret.bind(this.sController)));
        this.router.delete('/:id', authenticated, asyncHandler(this.sController.deleteSecret.bind(this.sController)));
        this.router.get('/', authenticated, asyncHandler(this.sController.allSecrets.bind(this.sController)));
    }


}

const routes = new SecretRoutes().router;
export default routes;