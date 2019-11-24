import { Typegoose, prop, instanceMethod } from "typegoose";

export default class Post extends Typegoose {
    @prop()
    private title: string;

    @prop()
    private description: string;

    @prop()
    private date: string;

    private poster: string;

}