import { Request, Response } from "express";
import Controller from "./Controller";
import Campaign from '../classes/Campaign'
import Organization from "../classes/Organization";

export default class CampaignController implements Controller {
    
    public static getAll = async (req: Request, res: Response) => {
        const CampaignModel = new Campaign().getModelForClass(Campaign);
        try {
            const campaigns = await CampaignModel.find();
            if (!campaigns) {
                res.status(404).send();
            }
            res.send(campaigns);
        } catch (error) {
            res.status(500).send();
        }
    }

    public static getOneById = async (req: Request, res: Response) => {
        const CampaignModel = new Campaign().getModelForClass(Campaign);
        try {
            const campaigns = await CampaignModel.findById(req.params.id);
            if (!campaigns) {
                res.status(404).send();
            }
            res.send(campaigns);
        } catch (error) {
            res.status(500).send();
        }
    }


    public static insert = async (req: Request, res: Response) => {
        const CampaignModel = new Campaign().getModelForClass(Campaign);
        try {
            const campaign = await CampaignModel.findOne({title: req.body.title});
            if (campaign) {
                res.status(403).send({ message: 'Campaign already exists.' });
                return
            } 
 
            const newCampaign = await CampaignModel.create(req.body);
            const OrgModel = new Organization().getModelForClass(Organization);
            const { organization } = res.locals.jwtPayload;
            const org = await OrgModel.findByIdAndUpdate(
                organization, 
                {
                    $push: {
                        campaigns: newCampaign,
                    },
                },
                { new:true }
            );
            if (!org) res.status(500).send({ message: 'Organization not found!' });
            res.send(newCampaign);
        } catch (error) {
            res.status(500).send();
        }      
    };

    public static update = async (req: Request, res: Response) => {
        const CampaignModel = new Campaign().getModelForClass(Campaign);

        try {
            const campaign = await CampaignModel.findByIdAndUpdate(
                req.params.id, 
                req.body,
                { new:true }
            );
            if (!campaign) res.status(400).send({ message: 'Campaign not found!' });
        } catch (error) {
            res.status(500).send();
        }
    }

    public static delete = async (req: Request, res: Response) => {
        const CampaignModel = new Campaign().getModelForClass(Campaign);

        try {
            await CampaignModel.deleteOne({ _id: req.params.id });
            res.send({ message: 'Succesfully deleted the campaign!' });
        } catch (error) {
            res.status(500).send();
        }
    }
}
