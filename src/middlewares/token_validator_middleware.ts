import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import * as session_repository from '../repositories/session_repository'

interface JwtPayload {
    email: string
  }

dotenv.config()

export async function token_validator(req:Request, res:Response, next:NextFunction){
    const secret_key = process.env.JWT_SECRET_KEY ?? '';

    const authorization = req.headers.authorization

    const token = authorization?.replace("Bearer ",'').trim()

    let init_session 

    let token_info

    if(!token){
        throw{
            type:"unauthorized",
            message:"token invalido"
        }
    }

    
        jwt.verify(token, secret_key, function(err, decoded) {
            console.log('verificando token...') // bar

            if(err){
                throw{
                    type:"unauthorized",
                    message:"token invalido"
                }
            }

          });

        
            token_info = jwt.verify(token, secret_key) as JwtPayload
            
            console.log(`info do token ${token_info.email}`)
        
    
     init_session = await session_repository.verify_valid_session(token_info.email, token)

   if(init_session!=null){
    if(!init_session.is_on){
        throw{
            type:"unauthorized",
            message:"sessão esgotada"
        }
    }

   }
  
   const user_id = await session_repository.find_user_id(token_info.email)
   console.log(user_id?.id)

   res.locals.token_info={
    "email":token_info.email,
    "session_id": init_session?.id,
    "user_id": user_id?.id
   }

   next()
}