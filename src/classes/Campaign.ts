import Post from "./Post";
import { prop, Ref, arrayProp } from "typegoose";
import Event from "./Event";
import Project from "./Project";

export default class Campaign extends Post {
    @prop()
    private duration: string;

    @prop()
    private theme: string;

    @prop()
    private interested: number;

    @arrayProp({ itemsRef: Event })
    private events: Ref<Event>[];
    
    @arrayProp({ itemsRef: Project })
    private projects?: Ref<Project>[]
}