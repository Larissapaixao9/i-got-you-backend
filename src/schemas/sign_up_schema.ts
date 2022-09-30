import Joi from "joi";

export const sing_up_schema = Joi.object({
    name:Joi.string().required().trim(),
    email:Joi.string().email().required(),
    password:Joi.string().required().trim(),
    confirm_password:Joi.string().required()
})
