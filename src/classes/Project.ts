import Post from "./Post";
import { prop } from "typegoose";

export default class Project extends Post {
    @prop()
    private duration: string;

    @prop()
    private interested: number;
}