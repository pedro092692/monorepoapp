import { User } from "../models/UserModel.js";

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

    }

}

export default UserService;