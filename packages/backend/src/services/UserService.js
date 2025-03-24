import { User } from "../models/UserModel.js";
import ServiceErrorHandler from "../errors/serviceErrorHanlder.js";
import { NotFoundError } from "../errors/error.js";

class UserService{
    constructor(){
        this.error = new ServiceErrorHandler();
    }

    
    createUser(email, password){
        return this.error.handler(['Create User'], async () => {
            const newUser = await User.create({
                email: email, 
                password: password,
            });
            return newUser;
        });
    }

    readUser(userId){
        return this.error.handler(['Select User', userId, 'User'], async () => {
            console.log(this.error);
            const user = await User.findByPk(userId, {include: {association: "secrets"}});
            if(!user){
                throw new NotFoundError();
            }
            return user;
        })
    }

    updateUser(userId, updates){
        return this.error.handler(['Update user', userId, 'User'], async () => {
            const user = await this.readUser(userId);
            const updatedUser = await user.update(updates);
            return updatedUser;
        })
    }

    deleteUser(userId){
        return this.error.handler(['Delete User', userId, 'User'], async () => {
            const user = await this.readUser(userId);
            //delete user 
            await user.destroy();
            return 1
        })
    }

    users(limit=10, offset=0){
        return this.error.handler(['All users'], async () => {
            const users = await User.findAll({
                attributes:['id', 'email'],
                order: [
                    ['id', 'ASC']
                ],
                include:{
                    association: "secrets",
                    attributes:['content']
                },
                limit: limit,
                offset: offset,
            });
            return users;
        })
    }

}

export default UserService;