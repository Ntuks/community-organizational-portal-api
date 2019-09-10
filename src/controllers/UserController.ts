import { Request, Response } from "express";
import Controller from "./Controller";
import User from '../classes/User'

export default class UserController implements Controller {
    
    public static getAll = async (req: Request, res: Response) => {
        const UserModel = new User().getModelForClass(User);
        try {
            const users = await UserModel.find();
            if (!users) {
                res.status(404).send();
            }
            res.send(users);
        } catch (error) {
            res.status(500).send();
        }
    }

    public static getOneById = async (req: Request, res: Response) => {
        const UserModel = new User().getModelForClass(User);
        try {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                res.status(404).send();
            }
            res.send(user);
        } catch (error) {
            res.status(500).send();
        }
    }

    public static update = async (req: Request, res: Response) => {
        const UserModel = new User().getModelForClass(User);
        try {
            await UserModel.findByIdAndUpdate(
                req.params.id, 
                req.body,
                { new:true }
            );
            res.send({ message: 'Succesfully updated the user!' });
        } catch (error) {
            res.status(500).send();
        }
    }

    public static delete = async (req: Request, res: Response) => {
        const UserModel = new User().getModelForClass(User);
        try {
            await UserModel.deleteOne({ _id: req.params.id });
            res.send({ message: 'Succesfully deleted the user!' });
        } catch (error) {
            res.status(500).send();
        }
    }
}