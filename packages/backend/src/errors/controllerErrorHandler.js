import { ValidationError, ValidationErrorItem } from "sequelize";
import { NotFoundError } from "./error.js";

class ControllerErrorHandler{

    handler(fn){
        return async (req, res, next) =>{
            try{
                await fn(req, res, next);
            }catch(error){
                this.controllerError(error, res);
            }
        }
    }


    controllerError(error, res){
        if (error instanceof NotFoundError){
            return res.status(404).json({error: error.message});
        }
        if ( error instanceof ValidationError || error instanceof ValidationErrorItem){
            return res.status(409).json({error: error.message});
        }
        return res.status(500).json({error: error.message});
    }

}

export default ControllerErrorHandler;