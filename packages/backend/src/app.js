import express from "express";
import asyncHandler from "express-async-handler";
import DataBase from "./config/database.js";

class Server{
    constructor(){
        this.app = express();
        this.port = 4000;
        this.db = new DataBase();
        this.middlewares();
        this.rotues();
    }


    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    rotues(){
        this.app.get('/', asyncHandler((req, res) => res.send("Hello world")));
    }

    errorHandler(){
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send("Something went wrong");
        })
    }


    start(){
        this.app.listen(this.port, () => {
            console.log(`The server is listen on port: ${this.port}`);
        })
    }

}

export default Server;