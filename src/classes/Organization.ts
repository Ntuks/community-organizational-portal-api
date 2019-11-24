import { Typegoose, prop, arrayProp, Ref, instanceMethod } from "typegoose";
import User from "./User";
import Event from "./Event";
import Campaign from "./Campaign";
import Project from "./Project";

interface Coordinates{
    lat: Number,
    lng: Number
}
export default class Organization extends Typegoose{
    @prop({ default: ""})
    private title: string;
    
    @prop({ default: ""})
    private tagline: string;

    @prop({ default: ""})
    private description: string;
    
    @prop({ default: ""})
    private pboNpoNumber: string;
    
    @prop({ default: ""})
    private contactNo: string;
    
    @prop()
    private email: string;
    
    @prop({ default: ""})
    private facebookPagelink: string;
    
    @prop({ default: ""})
    private location: string;

    @prop({ default: { lat: 0, lng: 0}})
    private coordinates: Coordinates;
    
    @arrayProp({ default: [], items: String })
    private areasOfEngagement: string[];
    
    @arrayProp({ default: [], items: String })
    private affiliates: string[];
    
    @arrayProp({ default: [], itemsRef: Event })
    private events: Ref<Event>[];

    @arrayProp({ default: [], itemsRef: Campaign })
    private campaigns: Ref<Campaign>[];

    @arrayProp({ default: [], itemsRef: Project })
    private projects: Ref<Project>[];
    
    @prop({ ref: User})
    private orgManager: Ref<User>;
    
    @prop({ default: 'INACTIVE'})
    private status: string;

    @instanceMethod
    public getOrganization(): any {
        const org = { 
            title: this.title,
            tagline: this.tagline,
            contactNo: this.contactNo,
            location: this.location,
            coordinates: this.coordinates,
            areasOfEngagement: this.areasOfEngagement,
            facebookPagelink: this.facebookPagelink,
            pboNpoNumber: this.pboNpoNumber,
            description: this.description,
            email: this.email,
            events: this.events,
            projects: this.projects,
            campains: this.campaigns,
            affiliates: this.affiliates,
            orgManager: this.orgManager,
            status: this.status,
        };
        return org;
    }
}