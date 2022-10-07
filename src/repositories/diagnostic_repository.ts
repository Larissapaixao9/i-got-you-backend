import prisma from "../database/database";

export async function get_user_essay(user_id:number){

    const essay = await prisma.essay.findMany({
        where:{"user_id":user_id, texts:{
            mode: 'insensitive'
        }},
        orderBy:{ "created_at": 'desc' },
        take:1

    })

    return essay
}

export async function get_good_humor_words() {

    const good_words = await prisma.word.findMany()

    return good_words[0]?.good_mood
}

export async function get_bad_humor_words() {

    const bad_words = await prisma.word.findMany()
    
    return bad_words[0]?.bad_mood
}