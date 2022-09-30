import {prisma} from '../database/database'
//import { User } from '@prisma/client'

//export type Iuser = Omit<User, "id" | "created_at" | "name">

export async function find_existing_email(email:string) {
    const found_email = prisma.user.findFirst({
        where:{email}
    })


    return found_email
}

export async function create_new_user(name:string, email:string, hash_password:string, picture:string) {
    const create=await prisma.user.create({
        data:{
            "name":name,
            "email":email,
            "password":hash_password
        }
    })
    console.log(create)
}