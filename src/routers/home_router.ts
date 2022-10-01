import {  Router} from 'express'
import { post_thoughts, get_user_name } from '../controllers/home_controller'
import { token_validator } from '../middlewares/token_validator_middleware'
const home_router = Router()

home_router.post('/home', token_validator, post_thoughts)
home_router.get('/home', token_validator, get_user_name)


export default home_router