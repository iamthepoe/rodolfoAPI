import  express  from "express"; 
import {router} from './router';
import mongoose from 'mongoose';

export class App{
    public server: express.Application;
    constructor(){
        this.server = express();
        this.middleware();
        this.router();
    }

    private middleware(){
        mongoose.connect('mongodb://localhost:27017/rodolfo');
        mongoose.set('strictQuery', true);
        this.server.use(express.json());
        this.server.set('view engine', 'ejs');
        this.server.use(express.static('public'));
    }

    public router(){
        this.server.use(router);
    }
}
