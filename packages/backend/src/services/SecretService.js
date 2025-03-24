import { Secret } from "../models/SecretModel.js";
import UserService from "./UserService.js";
import { NotFoundError } from "../errors/error.js";
import ServiceErrorHandler from "../errors/serviceErrorHanlder.js";

class SecretService{

    constructor(){
        this.users = new UserService();
        this.error = new ServiceErrorHandler();
    }

    createSecret(userId, content){
        return this.error.handler(['Create Secret'], async () => {
            const user = await this.users.readUser(userId);
            const newSecret = await Secret.create({
                userId: user.id, 
                content: content,
            })
            return newSecret;
        })
    }

    readSecret(secretId){
        return this.error.handler(['Select Secret', secretId, 'Secret'], async () =>{
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
        return this.error.handler(['Update Secret', secretId, 'Secret'], async () => {
            const { content } = updates;
            const secret = await this.readSecret(secretId);
            const updatedSecret = await secret.update({content});
            return updatedSecret;
        })
    }

    deleteSecret(secretId){
        return this.error.handler(['Delete Secret', secretId, 'Secret'], async () => {
            const secret = await this.readSecret(secretId);
            // delete secret 
            await secret.destroy();
            return 1;
        })
    }

    secrets(limit=10, offset=0){
        return this.error.handler(['All secrets'], async () => {
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
    
}

export default SecretService;