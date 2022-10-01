import {  Router} from 'express'
import { get_diagnostic } from '../controllers/diagnostic_controller'
import { token_validator } from '../middlewares/token_validator_middleware'
const diagnostic_router = Router()

//diagnostic_router.post('/diagnostic', token_validator, post_thoughts)
diagnostic_router.get('/diagnostic', token_validator, get_diagnostic)


export default diagnostic_router