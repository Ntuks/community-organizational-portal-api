import { Request, Response } from "express";
import Controller from "./Controller";
import Organization from '../classes/Organization'
import Campaign from '../classes/Campaign'
import Event from '../classes/Event'
import Project from '../classes/Project'

export default class PostsController implements Controller {

    public static compare = (array: any[], compareArray: any[]): any[] => {
        const final:any[] = [];
        array.forEach((elemOne) => compareArray.forEach((elemTwo) => {
            if (String(elemOne._id) == String(elemTwo)) {
                final.push(elemOne);
            }
        }))
        return final;
    };

    // Getting all the posts for all the organizations
    public static getAllPosts = async (req: Request, res: Response) => {
        const OrgModel = new Organization().getModelForClass(Organization);
        const campaignModel = new Campaign().getModelForClass(Campaign);
        const eventModel = new Event().getModelForClass(Event);
        const projectModel = new Project().getModelForClass(Project);
        try {
            const organizations = await OrgModel.find();
            if (!organizations) {
                res.status(404).send();
            }
        
            
            const campaigns = await campaignModel.find();
            const events = await eventModel.find();
            const projects = await projectModel.find();
            let data: any[] = [];
            
            organizations.forEach(organization => {
                const orgCampaigns = PostsController.compare(campaigns, organization.get('campaigns'));
                const orgEvents = PostsController.compare(events, organization.get('events'));
                const orgProjects = PostsController.compare(projects, organization.get('projects'));

                let posts: any[] = orgCampaigns;
                posts = posts.concat(orgEvents);
                posts = posts.concat(orgProjects);
                const orgName = organization.get('title');
                data.push({
                    name: orgName,
                    posts: posts,
                });
            });

            res.send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Getting all the posts for all the organizations
    public static getAllPostsByOrgId = async (req: Request, res: Response) => {
        const OrgModel = new Organization().getModelForClass(Organization);
        const campaignModel = new Campaign().getModelForClass(Campaign);
        const eventModel = new Event().getModelForClass(Event);
        const projectModel = new Project().getModelForClass(Project);
        try {
            const organization = await OrgModel.findById(req.params.id);
            if (!organization) {
                res.status(404).send();
            }
        
            const allCampaigns = await campaignModel.find();
            const allEvents = await eventModel.find();
            const allProjects = await projectModel.find();
            
            const orgCampaigns = PostsController.compare(allCampaigns, organization.get('campaigns'));
            const orgEvents = PostsController.compare(allEvents, organization.get('events'));
            const orgProjects = PostsController.compare(allProjects, organization.get('projects'));

            const orgName = organization.get('title');

            res.send({
                name: orgName,
                posts: {
                    events: orgEvents,
                    campaigns: orgCampaigns,
                    projects: orgProjects
                },
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}