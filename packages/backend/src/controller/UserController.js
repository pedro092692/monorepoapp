import UserService from "../services/UserService.js";
import { ValidationError, ValidationErrorItem } from "sequelize";
import { NotFoundError } from "../errors/error.js";


class UserController{
    constructor(){
        this.users = new UserService();
    }

    createUser = this.#wrapServiceCall( async (req, res) => {
        const { email, password } = req.body;
        const newUser = await this.users.createUser(email, password);
        res.status(201).json(newUser);
    });

    selectUser = this.#wrapServiceCall( async (req, res) => {
        const { id } = req.params;
        const user = await this.users.readUser(id);
        res.status(200).json(user);
    })

    updateUser = this.#wrapServiceCall( async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
        const updateUser = await this.users.updateUser(id, updates);
        res.status(200).json(updateUser);
    })
    

    #controllerErrorHandler(error, res){
        if (error instanceof NotFoundError){
            return res.status(404).json({error: error.message});
        }

        if( error instanceof ValidationError || ValidationError){
            return res.status(409).json({error: error.message});
        }
        res.status(500).json({error: error.message});
    }

    #wrapServiceCall(fn){
        return async (req, res, next) =>{
            try{
                 await fn(req, res, next);
            }catch(error){
                this.#controllerErrorHandler(error, res);
            }    
        }
    }


}

export default UserController; 