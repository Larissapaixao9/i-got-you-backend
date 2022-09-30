import Joi, { string } from "joi";

export  const sign_in_schema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required().trim()
})