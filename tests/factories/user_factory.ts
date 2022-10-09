export  async function fixed_user(){
    
    return {
        email: "larissa@gmail.com",
        name:"larissa",
        password: "larissa",
        confirm_password: "larissa"
    }
}

export async function user_login(){
    
    return {
        email: "larissa@gmail.com",
        password: "larissa"
    }
}

export async function user_login_wrong_password(){
    
    return {
        email: "larissa@gmail.com",
        password: "larissaPaixao"
    }
}

export async function user_login_wrong_email(){
    
    return {
        email: "larissaPaixaoa@gmail.com",
        password: "larissa"
    }
}

export async function user_login_empty(){
    
    return {
        email: "",
        password: ""
    }
}

export  async function empty_logup_info(){
    
    return {
        email: "",
        password: "",
        confirmPassword: ""
    }
}

export async function passwords(){
    
    return {
        password: "larissa",
        confirm_password: "larissa"
    }
}