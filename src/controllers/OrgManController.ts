import { Request, Response } from "express";
import Controller from "./Controller";
import OrgManager from '../classes/OrganizationManager'
import User from "../classes/User";

class OrgManagerController implements Controller {
    
    public static getAll = async (req: Request, res: Response) => {
        const UserModel = new User().getModelForClass(User);
        try {
            const organizations = await UserModel.find();
            if (!organizations) {
                res.status(404).send();
            }
            const orgManagers = organizations.filter((Objs) =>  (Objs.get('role').equals('OrgManager')));
            res.send(orgManagers);
        } catch (error) {
            res.status(500).send();
        }
    }

    public static getOneById = async (req: Request, res: Response) => {
        const UserModel = new User().getModelForClass(User);
        try {
            const orgManager = await UserModel.findById(req.params.id);
            if (!orgManager) {
                res.status(404).send();
            }
            res.send(orgManager);
        } catch (error) {
            res.status(500).send();
        }
    }

    public static delete = async (req: Request, res: Response) => {
        const OrgManagerModel = new OrgManager().getModelForClass(OrgManager);
        try {
            await OrgManagerModel.deleteOne({ _id: req.params.id });
            res.send({ message: 'Succesfully deleted the orgManager!' });
        } catch (error) {
            res.status(500).send();
        }
    }
}

export default OrgManagerController;