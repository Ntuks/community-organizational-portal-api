import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { index } from "typegoose";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // check if there is no jwt, to respond with 401 (unauthorized)
  if (!(req.headers["cookie"])) {
    res.status(401).send();
    return;
  }
  // Get the jwt token from the head
  let cookie: any;
  let token: string;
  if ((req.headers["cookie"]).indexOf("=") != -1) {
    let index = (req.headers["cookie"]).indexOf('=');
    token = req.headers["cookie"].substring(index + 1);
  } else {
    cookie = JSON.parse(req.headers["cookie"]);
    token  = cookie.token;
  }
  
  if (!token) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({ message: "no token"});
  }
  let jwtPayload;

  // Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({message: "no jwt"});
  }

  //Call the next middleware or controller
  next();
};