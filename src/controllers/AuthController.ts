import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { promisify } from "util";
import { randomBytes } from "crypto";

import User from "../classes/User";
import Controller from "./Controller";
import Organization from "../classes/Organization";

export default class AuthController implements Controller {

    private static setCookie(res: Response, token: string){
        res.cookie('token', token, {
            // Javascript shouldn't be able to access the cookie
            httpOnly: true,
            // One year cookie
            maxAge: 1000 * 60 * 24 * 7,
          });
    }

    /**
     * signup
     */
    public static signup = async (req: Request, res: Response) => {
        const { name, surname, password } = req.body;
        const email = req.body.email.toLowerCase();
        if (!(email && name && surname && password)) {
            res.status(400).send({ message: 'Please fill in all the fields.' });
        }

        const UserModel = new User().getModelForClass(User);
        try {
            const usr = await UserModel.findOne({ email });
            if (usr) {
                res.status(401).send({ message: 'A user with these credentials already exists.' });
            }
        } catch (error) {
            res.status(500).send();
        }
        
        const role = 'Organization Manager';
        const user = new UserModel({name, surname, email, password, role});
        user.hashPassword();
        try {
            await user.save();
        } catch (error) {
            res.status(500).send();
        }
        
        const OrgModel = new Organization().getModelForClass(Organization);
        const org = new OrgModel({ email ,orgManagers: [user._id]});
        user.set('organization',org._id);
        try {
            await org.save();
            await user.save();
        } catch (error) {
            res.status(500).send();
        }

        res.send({ message: 'Signup Successful!' });
    }

    public static signin = async (req: Request, res: Response) => {
        //Check if email and password are set
        let { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send({ message: 'Please fill in all the fields.' });
        }

        const UserModel = new User().getModelForClass(User);
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                res.status(401).send({ message: 'No user found with these signin credentials.' });
                return;
            }

            //Check if encrypted password match
            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                res.status(401).send({ message: 'Your signin details are incorrect.' });
                return;
            }
            const { name, surname, role, organization} = user.getUser();
            //Sing JWT, valid for 1 hour
            const payload = { 
                email,
                userId: user._id,
                organization,
                role,
            };
            const token = jwt.sign(payload, config.jwtSecret,{ expiresIn: "1d" });
            // set the jwt as a cookie on the response
            AuthController.setCookie(res, token);

            //Send the jwt in the response
            res.send({ _id: user._id, name, surname, email, role, organization, token });
        } catch (error) {
            res.status(401).send(error.message);
        }
    }  

    public static signout = async (req: Request, res: Response) => {
        res.clearCookie('token');
        res.send({ message: 'Logged out successfuly!' });
    };

    public static resetRequest = async (req: Request, res: Response) => {
        const email = req.body.email.toLowerCase();
        if (!email) {
            res.send({ message: 'Please fill in all the fields.' });
            return;
        }
    
        const UserModel = new User().getModelForClass(User);
        try {
            // check if there is a user with that email
            const user = await UserModel.findOne({ email });
            if (!user) {
                res.send({ message: `No user was found for the email ${email}.` });
                return;
            }
        
            // set a reset token and its lifespan on that user
            const randomBytesPromsified = promisify(randomBytes);
            const resetToken = (await randomBytesPromsified(20)).toString('hex');
            const resetTokenExpiry = Date.now() + 3600000; // one hour from now
            await UserModel.findOneAndUpdate(
                { email },
                {
                $set: {
                    resetToken,
                    resetTokenExpiry,
                },
                },
                { new: true }
            );
        
            // send email to the given email address
            // const subject = 'Reset Password Request';
            // const emailData = {
            //   name: user.name,
            //   title: 'Password reset',
            //   description: 'You have requested a password reset, please follow the link below to reset your password.',
            //   link: 'NEED ONE', // TODO: put the reset page link here.
            //   buttonText: 'Follow this link to reset your password.',
            // };
            // await sendMail(user.email, subject, emailData);
        
            res.send({ message: 'Reset Request Sent Successfully!' });
        } catch (error) {
            res.send({ message: error.message.substring(error.message.lastIndexOf(':') + 2) });
        }
    }
  
    public static resetPassword = async (req: Request, res: Response) => {
        let { password, confirmPassword, resetToken } = req.body
        if (!(password && confirmPassword)) {
            res.send({ message: 'Please fill in all the fields.' });
            return;
        }
    
        // check if the passwords match
        if (password !== confirmPassword) {
            res.send({ message: 'Passwords Do Not Match' });
            return;
        }

        const UserModel = new User().getModelForClass(User);

        try {
            // check if the token is belongs to a user in the db
            const user = await UserModel.findOne({ resetToken });
            if (!user) {
                res.send({ message: 'This token is invalid.' });
                return;
            }
        
            // and check if the token has expired
            if (!(user.getUser().resetTokenExpiry > Date.now() - 3600000)) {
                res.send({ message: 'This token has expired.' });
                return;
            }
            // hash the new password
            const newPassword = await user.hashPassword();
            // save the new password to the user and remove the old reset token fields
            const updatedUser = await UserModel.findOneAndUpdate(
                { resetToken },
                {
                    $set: {
                        password: newPassword,
                        resetToken: null,
                        resetTokenExpiry: null,
                    },
                },
                { new: true }
            ).populate(
                {
                    path: 'orgManager',
                    select: 'role',
                }
            );
        
            // return the new user
            res.send({ message: 'Password Reset Successfully!' });
        } catch (error) {
            res.send({ message: error.message.substring(error.message.lastIndexOf(':') + 2) });
        }
    }
}