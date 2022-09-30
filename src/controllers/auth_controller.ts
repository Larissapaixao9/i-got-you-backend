import { Request, Response } from "express";
import * as authServices from '../services/authServices'


export async function sign_up(req:Request, res:Response) {
    const user_info = req.body

    const { email, name, password, picture, confirm_password } = user_info

    const verify_password = await authServices.verify_password(password, confirm_password)

    const find_user_by_email = await authServices.find_user_by_email(email)

    const create_new_user = await authServices.create_new_user(name, email, password, picture)
    
    return res.sendStatus(201)
}

export async function sign_in(req:Request, res:Response) {
    const { email, password }= req.body

    const find_user_by_email = await authServices.find_user_by_email_for_sign_in(email)

    const verify_password = await authServices.is_password_correct(password, email)

    const token = await authServices.create_token(email)

    return res.status(200).send({token})
}