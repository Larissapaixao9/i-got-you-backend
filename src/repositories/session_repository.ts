import prisma from '../database/database'

export async function start_new_session(email:string, token:string){
    const response = await prisma.session.create({
        data:{
            "token":token,
            "email":email
        }

    })
}

export async function verify_valid_session(email:string, token:string){
    const response = await prisma.session.findFirst({
        where:{
            "email":email,
            "token":token
        }
    })
    return response
}

export async function find_user_id(email:string){
    const response = await prisma.user.findFirst({
        where:{
            "email":email
        }
    })
    return response
}
