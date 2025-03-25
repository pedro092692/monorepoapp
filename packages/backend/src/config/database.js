import { Sequelize } from "sequelize";
import path from "path";
import { initializeUser, User } from "../models/UserModel.js";
import { initializeSecret, Secret } from "../models/SecretModel.js";

let instance = null;
let synced = false;

class DataBase{
    constructor(){
        if(instance){
            return instance
        }

        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: path.resolve('database/db.sqlite'),
            logging: false,
        });

        instance = this;

        this.initializeModels();
        this.iniciateRelations();
        this.syncModels(synced);
    }

    async testConnecction(){
        try{
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully');
        }catch(error){
            console.error('Unable to connect to the database:', error);
        }
    }

    async closeConnection(){
        try{
            await this.sequelize.close();
            console.log('Database connection was closed successfully');
        }catch(error){
            console.error('Error while closing the database connection:', error);
        }
    }

    async initializeModels(){
        initializeUser(this.sequelize);
        initializeSecret(this.sequelize);
    }

    iniciateRelations(){
        User.association({Secret});
        Secret.assosiation({User});
    }

    async syncModels(sync=false){
        if(!sync) return;

        // sync models
        try{
            await this.sequelize.sync({ alter: true });
            console.log('All tables synchronized successfully');
            
            // add admin user
            const adminUser = await User.findByPk(1);
            if(!adminUser){
                await User.create({
                    email: 'admin@admin.com',
                    password: 'adminadmin',
                    role: 'admin',
                });
                console.log('admin user has been created');
            }

        }catch(error){
            console.error('Error synchronizing tables:', error);
        }

    }
}

export default DataBase;