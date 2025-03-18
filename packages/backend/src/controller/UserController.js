import { User } from "../models/UserModel.js";
import UserService from "../services/UserService.js";


class UserController{
    constructor(){
        this.users = new UserService();
    }

    createUser(req, res){
        const { email, password } = req.body;
        return this._wrapServiceCall( async () => {
            const newUser = this.users.createUser(email, password);
            res.status(200).json(newUser)
        })

    }


    async _wrapServiceCall(fn){
        try{
            return await fn();
        }catch(error){
            console.error(error);
        }
    }
}

export default UserController; 