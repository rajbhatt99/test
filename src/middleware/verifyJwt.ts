import { NextFunction } from "express";
import * as jwt from "jsonwebtoken";


export const verifyJwt = (req: any, res: any,next:NextFunction) => {
  //Get the jwt token from the head
  const authHeader = req.headers.authorization
  console.log(authHeader);
  
  if (authHeader) {
    const token = authHeader && (authHeader as string).split(' ')[1];
    console.log(token);
    

    jwt.verify(token, "utfkgguguglghil", (err: any, user: any) => {
      if (err) {
        return res.Status(403).send('forbidden');
      }
      next()
    });
  } else {
    return res.Status(401).send("unauthorized");
  }
};