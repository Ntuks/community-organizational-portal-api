import Post from "./Post";
import { prop } from "typegoose";

export default class Event extends Post {
    @prop()
    private location: string;

    @prop()
    private time: string;

    @prop()
    private interested: number;
}