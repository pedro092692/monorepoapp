import { Sequelize } from "sequelize";
import path from "path";
import { initializeUser } from "../models/UserModel.js";

let instance = null;

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
        this.syncModels();
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

    initializeModels(){
        initializeUser(this.sequelize);
    }

    async syncModels(sync=false){
        if(!sync) return;

        // sync models
        try{
            await this.sequelize.sync({ force: true });
            console.log('All tables synchronized successfully');
        }catch(error){
            console.error('Error synchronizing tables:', error);
        }
    }
}

export default DataBase;