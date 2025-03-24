import UserService from "../services/UserService.js";
import ControllerErrorHandler from "../errors/controllerErrorHandler.js";

const error = new ControllerErrorHandler();

class UserController{
    constructor(){
        this.users = new UserService();
    }

    createUser = error.handler( async (req, res) => {
        const { email, password } = req.body;
        const newUser = await this.users.createUser(email, password);
        res.status(201).json(newUser);
    });

    selectUser = error.handler( async (req, res) => {
        const { id } = req.params;
        const user = await this.users.readUser(id);
        res.status(200).json(user);
    });

    updateUser = error.handler( async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
        const updateUser = await this.users.updateUser(id, updates);
        res.status(200).json(updateUser);
    });

    deleteUser = error.handler( async (req, res) => {
        const { id } = req.params;
        const result = await this.users.deleteUser(id);
        res.status(200).json({message: "User has been deleted"});
    });

    allUsers = error.handler( async (req, res ) => {
        const users = await this.users.users();
        res.status(200).json(users);
    });

}

export default UserController; 