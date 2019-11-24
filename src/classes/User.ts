import { prop, Typegoose, ModelType, InstanceType, instanceMethod, Ref } from 'typegoose';
import * as bcrypt from 'bcryptjs';
import Organization from './Organization';

export default class User extends Typegoose {
    @prop()
    private name: string;

    @prop()
    private surname: string;

    @prop()
    private email: string;

    @prop()
    private password: string;

    @prop()
    private role: string;

    @prop({ ref: Organization })
    private organization: Ref<Organization>;

    @prop()
    private resetToken: string;
    
    @prop()
    private resetTokenExpiry: Number;

    @instanceMethod
    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    @instanceMethod
    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
        if (!(this.password)) return false;
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    @instanceMethod
    public getUser(): any {
        const user = { 
            name: this.name,
            surname: this.surname,
            email: this.email,
            role: this.role,
            organization: this.organization,
            resetToken: this.resetToken,
            resetTokenExpiry: this.resetTokenExpiry
        };
        return user;
    }
}