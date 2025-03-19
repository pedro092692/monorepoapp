import SecretService from "../services/SecretService.js";


class SecretController{
    constructor(){
        this.secrets = new SecretService();
    }

    createSecreet = this.#wrapControllerCall( async (req, res) => {
        const {userId, content} = req.body;
        console.log('hhihihihihihi');
        const newUser = await this.secrets.createSecret(userId, content);
        res.status(201).json(newUser);
    });

    
    #wrapControllerCall(fn){
        return async (req, res, next) => {
            try{
                return await fn(req, res, next);
            }catch(error){
                this.#handleControllerError(error, res);
            }
        }
    }

    #handleControllerError(error, res){
        res.status(500).json({error: error.message});
    }
}

export default SecretController;