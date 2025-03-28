import express from "express";
import asyncHandler from "express-async-handler";
import DataBase from "./config/database.js";
import UserRoutes from "./routes/UserRoutes.js";
import SecretRoutes from "./routes/SecretRouter.js";
import SecureRoutes from "./routes/Security.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import fs from "fs";
import https from "https";


class Server{
    constructor(){
        env.config();
        this.app = express();
        this.port = 4000;
        this.db = new DataBase();
        this.middlewares();
        this.UserRoutes = UserRoutes;
        this.SecretRoutes = SecretRoutes;
        this.SecureRoutes = SecureRoutes;
        this.rotues();
        this.options = {
            key: fs.readFileSync('../backend/localhost+1-key.pem'),
            cert: fs.readFileSync('../backend/localhost+1.pem'),
        }
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors({
            origin: 'https://127.0.0.1:3000', 
            credentials: true,               
        }));
        this.app.use(cookieParser());
    }

    rotues(){
        this.app.get('/', asyncHandler((req, res) => res.send("Hello world")));

        //users routes
        this.app.use('/users', this.UserRoutes);
        //secrets rotues
        this.app.use('/secrets', this.SecretRoutes);
        //Secure routes
        this.app.use(this.SecureRoutes);
        
    }

    errorHandler(){
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send("Something went wrong");
        })
    }


    start(){
        https.createServer(this.options, this.app).listen(this.port, () => {
            console.log(`Server running at https://127.0.0.1:${this.port}`);
        });
    }

}

export default Server;