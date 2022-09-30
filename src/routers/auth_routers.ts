import express from "express"
import { schema_validator } from "../middlewares/schema_validatior"
import { sing_up_schema } from "../schemas/sign_up_schema"
import { sign_in_schema } from "../schemas/sign_in_schema"
import { sign_in, sign_up } from "../controllers/auth_controller"

const authRouter = express.Router()

authRouter.post('/sign-up', schema_validator(sing_up_schema),sign_up)
authRouter.post('/sign-in', schema_validator(sign_in_schema), sign_in)

export default authRouter


