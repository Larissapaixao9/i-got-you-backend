import { create_good_mood_words, create_bad_mood_words, create_neutral_words } from '../prisma/words_factory'
import prisma from '../src/database/database'

async function main(){
    const good_words = await create_good_mood_words()

    const bad_mood = await create_bad_mood_words()

    const neutral_words = await create_neutral_words()

    await prisma.word.create({
        data:{
            "good_mood":good_words,
            "bad_mood": bad_mood,
            "neutral_mood":neutral_words
        }
    })
}

main().catch(err=>{
    console.error(err)
    
    process.exit(1)
}).finally(()=>{
    prisma.$disconnect()
})
