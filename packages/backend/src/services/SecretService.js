import { Secret } from "../models/SecretModel.js";
import UserService from "./UserService.js";

class SecretService{

    constructor(){
        this.users = new UserService();
    }

    createSecret(userId, content){
        return this.#wrapperServiceCall(['Create Secret'], async () => {
            const user = await this.users.readUser(userId);
            const newSecret = await Secret.create({
                userId: user.id, 
                content: content,
            })
            return newSecret;
        })
    }
    

    
    async #wrapperServiceCall(kwargs, fn){
        try{
            return fn();
        }catch(error){
            this.#handleServiceError(kwargs, error);
        }
    }

    #handleServiceError(kwargs, error){
        console.error(`Error in ${kwargs[0]}, ${error}`);
        throw new Error(`Faile ${kwargs[0]}, Error: ${error.message}`);
    }
}

export default SecretService;