import { Request, Response } from "express";
import * as diagnostic_service from '../services/diagnostic_service'

export async function get_diagnostic(req:Request, res:Response){
    const user_id = res.locals.token_info.user_id

    const get_user_essay = await diagnostic_service.get_user_essay(user_id)

    return res.sendStatus(200)
}