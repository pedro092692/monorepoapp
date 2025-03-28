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
            //send HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: true, 
                sameSite: 'None',
                path: '/',
                maxAge: 3600000,
            });
            console.log(token);
            console.log(res.getHeaders()); // Log headers
            res.status(200).json({ message: 'Login successful' })
        }catch(error){
            res.status(401).json({message: 'Invalid Email or password'});
        }
    }
}

export default LoginController;