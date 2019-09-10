import { Request, Response } from "express";
import Controller from "./Controller";
import Organization from "../classes/Organization";

class AdminController implements Controller {
    
    public static actOrDeactOrg = async (req: Request, res: Response) => {
        const OrgModel = new Organization().getModelForClass(Organization);
        const { status } = req.body;
        try {
            const org = await OrgModel.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: {status}
                },
            );
            if (!org) res.status(400).send({ message: 'Organization not found!' });
            res.send({ message: 'Succesfully updated the org!' });
        } catch (error) {
            res.status(500).send();
        }
    }
}

export default AdminController;