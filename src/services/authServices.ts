import * as auth_repository from '../repositories/auth_repository'
import bcrypt from 'bcrypt'

export async function verify_password(password:string, confirm_password:string){
    if(password!=confirm_password){
        throw{
            type:"unauthorized",
            message:"senhas digitadas não são iguais"
        }
    }
}

export async function find_user_by_email(email:string){
    const found_email = await auth_repository.find_existing_email(email);

    if(found_email){
        throw{
            type:"conflict",
            message:"usuario já cadastrado"
        }
    }
    console.log(found_email)
}

export async function create_new_user(name:string, email:string, password:string, picture:string) {
    const hash_password = bcrypt.hashSync(password, 10)

    console.log(hash_password)

    await auth_repository.create_new_user(name, email, hash_password, picture)    
}

export async function find_user_by_email_for_sign_in(email:string){
    const found_email = await auth_repository.find_existing_email(email);

    console.log(found_email)
    
    if(!found_email){
        throw{
            type:"not_found",
            message:"email ou senha não encontrado"
        }
    }
    console.log(found_email)
}

export async function is_password_correct(password:string, email:string) {
    const user = await auth_repository.find_existing_email(email)

    let compared_password;

    const password_from_db = user?.password

    if(password_from_db){
         compared_password = bcrypt.compareSync(password, password_from_db)
    }
    if(!compared_password){
        throw{
            type:"unauthorized",
            message:"senha incorreta"
        }
    }
}