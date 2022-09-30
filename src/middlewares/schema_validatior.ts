import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function schema_validator(schema_object:Joi.ObjectSchema){
    return async (req:Request, res:Response, next:NextFunction)=>{
        await schema_object.validateAsync(req.body, { abortEarly:false })

        next()
    }
}