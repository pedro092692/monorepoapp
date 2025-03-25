import UserService from "../services/UserService.js";
import ControllerErrorHandler from "../errors/controllerErrorHandler.js";
const error = new ControllerErrorHandler();

class LoginController{
    constructor(){
        this.user = new UserService();
    }

    loginUser = error.handler( async (req, res ) => {
        const { email, password } = req.body;
        const user = await this.user.findUser(email);
        // verify user 
        if(user.password === password){
            res.status(200).json({message: 'ok'});
        }
        res.status(200).json({message: 'invalid user or password'});
    })
}

export default LoginController;