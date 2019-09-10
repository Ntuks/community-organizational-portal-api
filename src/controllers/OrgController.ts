import { Request, Response } from "express";
import Controller from "./Controller";
import Organization from '../classes/Organization'

class OrganizationController implements Controller {
    public static getAllPublic = async (req: Request, res: Response) => {
        const OrgModel = new Organization().getModelForClass(Organization);
        try {
            const organizations = await OrgModel.find();
            if (!organizations) {
                res.status(404).send();
            }
            res.send(organizations);
        } catch (error) {
            res.status(500).send();
        }
    }
    
    public static getAll = async (req: Request, res: Response) => {
        const OrgModel = new Organization().getModelForClass(Organization);
        try {
            const organizations = await OrgModel.find();
            if (!organizations) {
                res.status(404).send();
            }
            res.send(organizations);
        } catch (error) {
            res.status(500).send();
        }
    }

    public static getOneById = async (req: Request, res: Response) => {
        const OrgModel = new Organization().getModelForClass(Organization);
        try {
            const organization = await OrgModel.findById(req.params.id);
            if (!organization) {
                res.status(404).send();
            }
            res.send(organization);
        } catch (error) {
            res.status(500).send();
        }
    }


    public static insert = async (req: Request, res: Response) => {
        const OrgModel = new Organization().getModelForClass(Organization);
        try {
            const organization = await OrgModel.findOne({title: req.body.title});
            if (organization) {
                res.status(403).send({ message: 'Organization already exists.' });
                return
            } 
            const newOrg = await OrgModel.create(req.body);
            res.send(newOrg);
        } catch (error) {
            res.status(500).send();
        }      
    };

    public static update = async (req: Request, res: Response) => {
        const OrgModel = new Organization().getModelForClass(Organization);
        try {
            const organization = await OrgModel.findByIdAndUpdate(
                req.params.id, 
                req.body,
                { new:true }
            );
            if (!organization) res.status(400).send({ message: 'Organization not found!' });
            res.send({ message: 'Succesfully updated the organization!' });
        } catch (error) {
            res.status(500).send();
        }
    }

    public static delete = async (req: Request, res: Response) => {
        const OrgModel = new Organization().getModelForClass(Organization);
        try {
            await OrgModel.deleteOne({ _id: req.params.id });
            res.send({ message: 'Succesfully deleted the organization!' });
        } catch (error) {
            res.status(500).send();
        }
    }
}

export default OrganizationController;