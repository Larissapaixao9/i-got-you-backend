import Joi from "joi";

export const thought_schema = Joi.object({
    text:Joi.string().required().trim()
})