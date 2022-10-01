import { Request, Response } from "express";
import * as home_services from '../services/home_service'

export async function post_thoughts(req:Request, res:Response){
    const text = req.body.text

    const user_id = res.locals.token_info.user_id

    console.log(user_id)

    const create_post = await home_services.insert_thoughts(text, user_id)

    return res.sendStatus(201)
}

export async function get_user_name(req:Request, res:Response){

    const user_email = res.locals.token_info.email

    const get_name = await home_services.get_user_name(user_email)

    console.log(get_name)
    
    return res.sendStatus(200)
}