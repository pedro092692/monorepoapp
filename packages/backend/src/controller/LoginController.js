import UserService from "../services/UserService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginController{
    constructor(){
        this.user = new UserService();
    }

    
    async loginUser(req, res){
        try{
            const {email, password } = req.body;
            const user = await this.user.findUser(email);
            //verify user 
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                res.status(401).json({message: 'Invalid Email or password'});
            }
            const token = jwt.sign({id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
            res.status(200).json({token});

        }catch(error){
            res.status(401).json({message: 'Invalid Email or password'});
        }
    }
}

export default LoginController;