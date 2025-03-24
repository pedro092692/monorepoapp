import SecretService from "../services/SecretService.js";
import { NotFoundError } from "../errors/error.js";
import ControllerErrorHandler from "../errors/controllerErrorHandler.js";

const error = new ControllerErrorHandler();

class SecretController{
    constructor(){
        this.secrets = new SecretService();
    }

    createSecreet = error.handler( async (req, res) => {
        const {userId, content, title} = req.body;
        const newUser = await this.secrets.createSecret(userId, content, title);
        res.status(201).json(newUser);
    });

    selectSecret = error.handler( async (req, res) =>{
        const { id } = req.params;
        const secret = await this.secrets.readSecret(id);
        res.status(200).json(secret);
    });

    updateSecret = error.handler( async (req, res) =>{
        const { id } = req.params;
        const updates = req.body;
        const updatedSecret = await this.secrets.updateSecret(id, updates);
        res.status(200).json(updatedSecret);
    })

    deleteSecret = error.handler( async (req, res) => {
        const { id } = req.params;
        const results = await this.secrets.deleteSecret(id);
        res.status(200).json({message: "Secret has been deleted"});
    })

    allSecrets = error.handler( async (req, res) => {
        const secrets = await this.secrets.secrets();
        res.status(200).json(secrets);
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