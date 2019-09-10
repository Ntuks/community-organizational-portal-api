import { Request, Response, NextFunction } from "express";
import Organization from "../classes/Organization";

export const checkStatus = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the organization ID from previous midleware
    const id = res.locals.jwtPayload.orgId;

    const OrganizationModel = new Organization().getModelForClass(Organization);
    try {
      // check if the token is belongs to a organization in the db
      const organization = await OrganizationModel.findById(id);
      // Check if the organization's STATUS == ACTIVE
      if (organization.get('status', String) == 'ACTIVE') next();  
      else res.status(403).send({ 
        message: 'Account not yet activated.'
      });
    } catch (id) {
      res.status(401).send();
    }
  };
};