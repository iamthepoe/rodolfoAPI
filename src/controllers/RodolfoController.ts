import { Request, Response} from 'express';
import {RodolfoModel} from '../models/Rodolfo';
import mongoose, { Error } from 'mongoose';

const Rodolfo = mongoose.model('Rodolfo', RodolfoModel);

let createDefault = async ()=>{
    await Rodolfo.create({name:"Rodolfo Fofo", state:"Cute", path:"/images/rodolfocute.png"});
    await Rodolfo.create({name:"Rodolfo Cavalheiro", state:"Gentleman", path:"/images/rodolfogentleman.jpg"});
    await Rodolfo.create({name:"Rodolfo Amongus", state:"sus", path:"/images/rodolfosuspect.jpg"});
    await Rodolfo.create({name:"Rodolfo Ensinando", state:"Teacher", path:"/images/rodolfoteacher.png"});
}

//createDefault();


class RodolfoController{
    public getRodolfos = async (req: Request, res: Response)=>{
        let rodolfos = await Rodolfo.find({});
        res.json(rodolfos);
    }

    public getRodolfoById = async (req: Request, res: Response)=>{
        let {_id} = req.params;
        let rodolfo = await Rodolfo.find({_id});
        if(!rodolfo)
            res.sendStatus(404);
        else
            res.json(rodolfo);
    }

    public postRodolfo = async (req: Request, res: Response)=>{
        let {name, state, path} = req.body;
        if(!name || !state || !path){
            res.sendStatus(409);
        }else{
            let rodolfo = new Rodolfo({name, state, path});
            await rodolfo.save();
            res.sendStatus(201);
        }
    }

    public deleteRodolfo = async (req: Request, res: Response)=>{
        let {_id} = req.params;
        Rodolfo.findByIdAndDelete(_id, (error: Error)=>{
            let status = error ? 409 : 200;
            res.sendStatus(status);
        });
    }

    public randomRodolfo = async (req: Request, res: Response)=>{
        const count = await Rodolfo.countDocuments();
        const random = Math.floor(Math.random() * count);
        const rodolfos = await Rodolfo.find({});
        const rodolfosArray = Array.from(rodolfos);
        res.render('rodolfo', {path: rodolfosArray[random].path});
    }
}

export const rodolfoController = new RodolfoController();