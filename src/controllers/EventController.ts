import { Request, Response } from "express";
import Controller from "./Controller";
import Event from '../classes/Event'
import Organization from "../classes/Organization";

export default class EventController implements Controller {
    
    public static getAll = async (req: Request, res: Response) => {
        const EventModel = new Event().getModelForClass(Event);
        try {
            const events = await EventModel.find();
            if (!events) {
                res.status(404).send();
            }
            res.send(events);
        } catch (error) {
            res.status(500).send();
        }
    }

    public static getOneById = async (req: Request, res: Response) => {
        const EventModel = new Event().getModelForClass(Event);
        try {
            const events = await EventModel.findById(req.params.id);
            if (!events) {
                res.status(404).send();
            }
            res.send(events);
        } catch (error) {
            res.status(500).send();
        }
    }


    public static insert = async (req: Request, res: Response) => {
        const EventModel = new Event().getModelForClass(Event);
        try {
            const event = await EventModel.findOne({title: req.body.title});
            if (event) {
                res.status(403).send({ message: 'Event already exists.' });
                return
            }
            const newEvent = await EventModel.create(req.body);

            const OrgModel = new Organization().getModelForClass(Organization);
            const { organization } = res.locals.jwtPayload;
            const org = await OrgModel.findByIdAndUpdate(
                organization, 
                {
                    $push: {
                        events: newEvent,
                    },
                },
                { new:true }
            );
            if (!org) res.status(500).send({ message: 'Organization not found!' });
            res.send(newEvent);
        } catch (error) {
            res.status(500).send();
        }      
    };

    public static update = async (req: Request, res: Response) => {
        const EventModel = new Event().getModelForClass(Event);
        try {
            const event = await EventModel.findByIdAndUpdate(
                req.params.id, 
                req.body,
                { new:true }
            );
            if (!event) res.status(400).send({ message: 'Event not found!' });
            res.send({ message: 'Succesfully updated the event!' });
        } catch (error) {
            res.status(500).send();
        }
    }

    public static delete = async (req: Request, res: Response) => {
        const EventModel = new Event().getModelForClass(Event);
        try {
            await EventModel.deleteOne({ _id: req.params.id });
            res.send({ message: 'Succesfully deleted the event!' });
        } catch (error) {
            res.status(500).send();
        }
    }
}
