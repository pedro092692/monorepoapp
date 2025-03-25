import { User } from "../models/UserModel.js";
import ServiceErrorHandler from "../errors/serviceErrorHandler.js";
import { NotFoundError } from "../errors/error.js";
import bcrypt from "bcrypt";

class UserService{
    constructor(){
        this.error = new ServiceErrorHandler();
        this.saltRounds = 10;
    }

    
    createUser(email, password){
        return this.error.handler(['Create User'], async () => {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            const newUser = await User.create({
                email: email, 
                password: hashedPassword,
            });
            const user = {...newUser.toJSON()};
            delete user.password;
            return user;
        });
    }

    readUser(userId){
        return this.error.handler(['Select User', userId, 'User'], async () => {
            const user = await User.findByPk(userId, {include: {association: "secrets"}, attributes: ['id', 'email', 'role']});
            if(!user){
                throw new NotFoundError();
            }
            return user;
        })
    }

    findUser(email){
        return this.error.handler(['Find User', email, 'User'], async () => {
            const user = await User.findOne({where:{ email: email}});
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
                    attributes:['content', 'title']
                },
                limit: limit,
                offset: offset,
            });
            return users;
        })
    }

}

export default UserService;