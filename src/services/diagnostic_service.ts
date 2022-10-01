import * as home_repository from '../repositories/home_repository'
import * as diagnostic_repository from '../repositories/diagnostic_repository'

export async function get_diagnostic(){
    
}

export async function get_user_essay(user_id:number){

    const today = Date.now()

    const essay_from_day = await diagnostic_repository.get_user_essay(user_id)

    console.log(essay_from_day)

    const good_humor_words = await diagnostic_repository.get_good_humor_words()

    console.log(good_humor_words)

    const bad_humor_words = await diagnostic_repository.get_bad_humor_words()

    console.log(bad_humor_words)
}