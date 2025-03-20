import { Secret } from "../models/SecretModel.js";
import UserService from "./UserService.js";
import { NotFoundError } from "../errors/error.js";

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

    readSecret(secretId){
        return this.#wrapperServiceCall(['Select Secret', secretId], async () =>{
            const secret = await Secret.findByPk(secretId, {include: { association: "user",
                attributes: ["id", "email"],
            }});
            if(!secret){
                throw new NotFoundError();
            }
            return secret;
        })
    }

    updateSecret(secretId, updates){
        return this.#wrapperServiceCall(['Update Secret', secretId], async () => {
            const { content } = updates;
            const secret = await this.readSecret(secretId);
            const updatedSecret = await secret.update({content});
            return updatedSecret;
        })
    }

    deleteSecret(secretId){
        return this.#wrapperServiceCall(['Delete Secret', secretId], async () => {
            const secret = await this.readSecret(secretId);
            // delete secret 
            await secret.destroy();
            return 1;
        })
    }

    secrets(limit=10, offset=0){
        return this.#wrapperServiceCall(['All secrets'], async () => {
            const allSecrets = await Secret.findAll({
                attributes: ['id', 'userId', 'content'],
                order:[['id', 'ASC']],
                include:{
                    association: "user",
                    attributes: ["email"]
                },
                limit: limit,
                offset: offset
            });
            return allSecrets;
        })
    }
    

    
    async #wrapperServiceCall(kwargs, fn){
        try{
            return await fn();
        }catch(error){
            this.#handleServiceError(kwargs, error);
        }
    }

    #handleServiceError(kwargs, error){
        console.error(`Error in ${kwargs[0]}, ${error}`);
        if(error instanceof NotFoundError){
            throw new NotFoundError(`Secret with ID ${kwargs[1]} not found`);
        }

        throw new Error(`Faile ${kwargs[0]}, Error: ${error.message}`);
    }
}

export default SecretService;