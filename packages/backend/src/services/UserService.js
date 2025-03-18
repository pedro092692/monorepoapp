import { User } from "../models/UserModel.js";
import { ValidationError } from "sequelize";


class UserService{
    
    createUser(email, password){
        return this._wrapServiceCall('Create User', async () => {
            const newUser = User.create({
                email: email, 
                password: password,
            });
            return newUser;
        });
    }


    async _wrapServiceCall(operation, fn){
        try{
            return await fn();
        }catch(error){
            this.#handleServiceError(operation, error);
        }
    }

    #handleServiceError(operation, error){
        console.error( `Error in ${operation}:`, error);
        if(error instanceof ValidationError){
            const errors = error.errors.map(err => err.message);
            throw new Error(`Faile ${operation} Errors: ${errors}`);
        }
        throw new Error(`Faile ${operation}: ${error}`)
    }

}

export default UserService;