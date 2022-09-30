import { NextFunction, Request, Response } from "express";
import { PrismaClient, Prisma } from '@prisma/client'

export function errorHanddlingMiddleware(err:any, req: Request, res: Response, next: NextFunction) {
    //console.log(err);
    if(err.type) {
        return res.status(errorTypeToStatusCode(err.type)).send(err.message);
    }

    if(err.details){
        return res.status(422).send(`${err.message}`);
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (err.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
          return res.status(401).send('There is a unique constraint violation, a new user cannot be created with this email')
        }
    }
    //console.log(err)

    return res.sendStatus(500);
}

function errorTypeToStatusCode(errorType: string) {
    if (errorType === "conflict") return 409;
    if (errorType === "not_found") return 404;
    if (errorType === "unauthorized") return 401;

    return 400;
}