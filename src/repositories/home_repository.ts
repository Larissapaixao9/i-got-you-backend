import prisma from "../database/database";

export async function get_user_name(email:string){
    const response = await prisma.user.findFirst({
        where:{email}
    })

    return response
}

export async function create_post(text:string, user_id:number){
    const response = await prisma.essay.create({
        data:{
            "texts":text,
            "user_id":user_id
        }
    })
}