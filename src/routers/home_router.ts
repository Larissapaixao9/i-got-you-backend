import {  Router} from 'express'
import { post_thoughts, get_user_name } from '../controllers/home_controller'
import { token_validator } from '../middlewares/token_validator_middleware'
import { thought_schema } from '../schemas/thought_schema'
import { schema_validator } from "../middlewares/schema_validatior"

const home_router = Router()

home_router.post('/home',schema_validator(thought_schema) ,token_validator, post_thoughts)
home_router.get('/home', token_validator, get_user_name)


export default home_router