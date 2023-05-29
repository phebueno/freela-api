import joi from "joi";

export const signupSchema = joi.object({
  imgPost: joi.string().uri().required(),
  bodyPost: joi.string().allow('')
});