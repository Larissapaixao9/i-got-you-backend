import * as home_repository from '../repositories/home_repository'

export async function get_user_name(email:string){
    const user_name = await home_repository.get_user_name(email)
    
    return user_name?.name
}

export async function insert_thoughts(text:string, user_id:number) {
    const post = await home_repository.create_post(text,user_id)
}