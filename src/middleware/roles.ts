    
import { Request, Response, NextFunction } from "express";
import User from '../classes/User'

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    const UserModel = new User().getModelForClass(User);
    try {
      // check if the token is belongs to a user in the db
      const user = await UserModel.findById(id);
      //Check if array of authorized roles includes the user's role
      if (roles.indexOf(user.getUser().role) > -1) next();
      else res.status(403).send();
    } catch (id) {
      res.status(401).send();
    }
  };
};