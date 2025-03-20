import SecretService from "../services/SecretService.js";
import { NotFoundError } from "../errors/error.js";


class SecretController{
    constructor(){
        this.secrets = new SecretService();
    }

    createSecreet = this.#wrapControllerCall( async (req, res) => {
        const {userId, content} = req.body;
        const newUser = await this.secrets.createSecret(userId, content);
        res.status(201).json(newUser);
    });

    selectSecret = this.#wrapControllerCall( async (req, res) =>{
        const { id } = req.params;
        const secret = await this.secrets.readSecret(id);
        res.status(200).json(secret);
    });

    updateSecret = this.#wrapControllerCall( async (req, res) =>{
        const { id } = req.params;
        const updates = req.body;
        const updatedSecret = await this.secrets.updateSecret(id, updates);
        res.status(200).json(updatedSecret);
    })

    deleteSecret = this.#wrapControllerCall( async (req, res) => {
        const { id } = req.params;
        const results = await this.secrets.deleteSecret(id);
        res.status(200).json({message: "Secret has been deleted"});
    })


    #handleControllerError(error, res){
        if (error instanceof NotFoundError){
            return res.status(404).json({error: error.message});
        }
        res.status(500).json({error: error.message});
    }
    
    #wrapControllerCall(fn){
        return async (req, res, next) => {
            try{
                return await fn(req, res, next);
            }catch(error){
                this.#handleControllerError(error, res);
            }
        }
    }
}

export default SecretController;