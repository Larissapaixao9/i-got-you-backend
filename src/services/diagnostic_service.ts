import * as home_repository from '../repositories/home_repository'
import * as diagnostic_repository from '../repositories/diagnostic_repository'
import { format } from 'path'

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

    const filtering_result = await filter_humor(essay_from_day, good_humor_words, bad_humor_words)

    console.log(filtering_result)

    return filtering_result

    function filter_humor(essay_from_day:any, good_humor_words:string, bad_humor_words:string){

        const user_text = essay_from_day[0].texts

        const essay_from_day_words = user_text.split(" ")

        console.log(essay_from_day_words)

        const filtered_essay = essay_from_day_words.filter((item:string)=>{
            return item!='da' && item!='mas' && item!='mais' && item!='a' && item!='o' && item!='do' && item!='de' && item!='e' && item!='como'
           })

        let max_count = 0;

        let element_with_highest_frequency

        for(let i=0;i<filtered_essay.length;i++){
            let count = 0
            for(let j=i+1;j<filtered_essay.length;j++){
                if(filtered_essay[i]==filtered_essay[j]){
                    count++
                }

                if(count>max_count){
                    max_count = count
                    element_with_highest_frequency=filtered_essay[i]
                }
            }
        }
        console.log(`O elemento com a maio frequencia é ${element_with_highest_frequency}`)

        const good_humor_with_split = good_humor_words.split(", ")
        const bad_humor_with_split = bad_humor_words.split(", ")

        let amount_good_words = 0

        let amount_bad_words = 0;

        let highest_frequency_good_word

        let highest_frequency_bad_word

        if(element_with_highest_frequency==undefined){
            for(let i=0;i<good_humor_with_split.length;i++){
                if(filtered_essay.includes(good_humor_with_split[i])){
                    amount_good_words++
                    highest_frequency_good_word=good_humor_with_split[i]
                }
            }
        }

        if(element_with_highest_frequency!=undefined){
            if(good_humor_with_split.includes(element_with_highest_frequency)){
                amount_good_words+=1
                return {
                    result:"bom humor",
                    element_with_highest_frequency
                        }
            }
        }

        if(element_with_highest_frequency!=undefined){
            if(bad_humor_with_split.includes(element_with_highest_frequency)){
                amount_bad_words+=1
                return {
                    result:"mau humor",
                    element_with_highest_frequency
                        }
            }
        }

        if(element_with_highest_frequency==undefined){
            for(let i=0;i<bad_humor_with_split.length;i++){
                if(filtered_essay.includes(bad_humor_with_split[i])){
                    amount_bad_words++
                    highest_frequency_bad_word=bad_humor_with_split[i]
                }
            }
        }

        if(amount_good_words>amount_bad_words){
        return {
            result:"bom humor",
            element_with_highest_frequency
                }
        }

        if(amount_good_words<amount_bad_words){
            return {
            result:"mau humor",
            element_with_highest_frequency
                }
        }


    }
}