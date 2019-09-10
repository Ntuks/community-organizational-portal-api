import { Request, Response } from "express";
import Controller from "./Controller";
import Project from '../classes/Project'
import Organization from "../classes/Organization";

export default class ProjectController implements Controller {
    
    public static getAll = async (req: Request, res: Response) => {
        const ProjectModel = new Project().getModelForClass(Project);
        try {
            const projects = await ProjectModel.find();
            if (!projects) {
                res.status(404).send();
            }
            res.send(projects);
        } catch (error) {
            res.status(500).send();
        }
    }

    public static getOneById = async (req: Request, res: Response) => {
        const ProjectModel = new Project().getModelForClass(Project);
        try {
            const projects = await ProjectModel.findById(req.params.id);
            if (!projects) {
                res.status(404).send();
            }
            res.send(projects);
        } catch (error) {
            res.status(500).send();
        }
    }


    public static insert = async (req: Request, res: Response) => {
        const ProjectModel = new Project().getModelForClass(Project);
        try {
            const project = await ProjectModel.findOne({title: req.body.title});
            if (project) {
                res.status(403).send({ message: 'Project already exists.' });
                return
            } 
            const newProject = await ProjectModel.create(req.body);

            const OrgModel = new Organization().getModelForClass(Organization);
            const { organization } = res.locals.jwtPayload;
            const org = await OrgModel.findByIdAndUpdate(
                organization, 
                {
                    $push: {
                        projects: newProject,
                    },
                },
                { new:true }
            );
            if (!org) res.status(500).send({ message: 'Organization not found!' });
            res.send(newProject);
        } catch (error) {
            res.status(500).send();
        }      
    };

    public static update = async (req: Request, res: Response) => {
        const ProjectModel = new Project().getModelForClass(Project);
        try {
            const project = await ProjectModel.findByIdAndUpdate(
                req.params.id, 
                req.body,
                { new:true }
            );
            if (!project) res.status(400).send({ message: 'Project not found!' });
            res.send({ message: 'Succesfully updated the project!' });
        } catch (error) {
            res.status(500).send();
        }
    }

    public static delete = async (req: Request, res: Response) => {
        const ProjectModel = new Project().getModelForClass(Project);
        try {
            await ProjectModel.deleteOne({ _id: req.params.id });
            res.send({ message: 'Succesfully deleted the project!' });
        } catch (error) {
            res.status(500).send();
        }
    }
}