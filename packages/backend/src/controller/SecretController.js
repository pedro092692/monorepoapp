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
        if(req.user.role === 'user' && secret.userId != req.user.id){
           return res.status(403).json({message: 'Forbidden'});
        }
        res.status(200).json(secret);
    });

    userSecrets = error.handler( async (req, res) => {
        const secrets = await this.secrets.userSecrets(req.user.id);
        res.status(200).json(secrets);
    });

    updateSecret = error.handler( async (req, res) =>{
        const { id } = req.params;
        const updates = req.body;
        const updatedSecret = await this.secrets.updateSecret(id, updates);
        res.status(200).json(updatedSecret);
    });

    deleteSecret = error.handler( async (req, res) => {
        const { id } = req.params;
        const results = await this.secrets.deleteSecret(id);
        res.status(200).json({message: "Secret has been deleted"});
    });

    allSecrets = error.handler( async (req, res) => {
        const secrets = await this.secrets.secrets();
        res.status(200).json(secrets);
    });
}

export default SecretController;