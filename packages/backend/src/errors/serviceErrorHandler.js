import { NotFoundError } from "./error.js";
import { ValidationError } from "sequelize";

class ServiceErrorHandler{

    async handler(kwargs, fn){
        try{
           return await fn();
        }catch(error){
            this.serviceError(kwargs, error);
        }
    }


    serviceError(kwargs, error){
        console.error('Error:', error);
        if(error instanceof NotFoundError){
            throw new NotFoundError(`${kwargs[2]} with ID ${kwargs[1]} not found`);
        }

        if(error instanceof ValidationError){
            throw new ValidationError(`Faile ${kwargs[0]} errors: ${error.message}`);
        }
        throw new Error(`Error in : ${error.message}`);
    }


}

export default ServiceErrorHandler;