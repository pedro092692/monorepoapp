import { User } from "../models/UserModel.js";
import UserService from "../services/UserService.js";
import { ValidationError } from "sequelize";


class UserController{
    constructor(){
        this.users = new UserService();
    }

    createUser = this.#wrapServiceCall( async (req, res) => {
        const { email, password } = req.body;
        const newUser = await this.users.createUser(email, password);
        res.status(201).json(newUser);
    });
    

    #controllerErrorHandler(error, res){
        if( error instanceof ValidationError){
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