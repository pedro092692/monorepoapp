import { User } from "../models/UserModel.js";
import { Association, ValidationError } from "sequelize";
import { NotFoundError } from "../errors/error.js";


class UserService{
    
    createUser(email, password){
        return this.#wrapServiceCall(['Create User'], async () => {
            const newUser = await User.create({
                email: email, 
                password: password,
            });
            return newUser;
        });
    }

    readUser(userId){
        return this.#wrapServiceCall(['Select User', userId], async () =>{
            const user = await User.findByPk(userId, {include: {association: "secrets"}});
            if(!user){
                throw new NotFoundError();
            }
            return user;
        })
    }

    updateUser(userId, updates){
        return this.#wrapServiceCall(['Update user', userId], async () => {
            const user = await this.readUser(userId);
            const updatedUser = await user.update(updates);
            return updatedUser;
        })
    }

    deleteUser(userId){
        return this.#wrapServiceCall(['Delete User', userId], async () => {
            const user = await this.readUser(userId);
            //delete user 
            await user.destroy();
            return 1
        })
    }

    users(limit=10, offset=0){
        return this.#wrapServiceCall(['All users'], async () => {
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


    async #wrapServiceCall(kwargs, fn){
        try{
            return await fn();
        }catch(error){
            this.#handleServiceError(kwargs, error);
        }
    }

    #handleServiceError(kwargs, error){
        console.error( `Error in ${kwargs[0]}:`, error);
        if(error instanceof NotFoundError){
            throw new NotFoundError(`User with ${kwargs[1]} not found`);
        }

        if(error instanceof ValidationError){
            const errors = error.errors.map(err => err.message);
            throw new Error(`Faile ${kwargs[0]} Errors: ${errors}`);
        }
        throw new Error(`Faile ${kwargs[0]}: ${error}`)
    }

}

export default UserService;