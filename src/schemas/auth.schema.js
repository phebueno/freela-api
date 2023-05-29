import joi from "joi";

export const signupSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
  imgProfile: joi.string().uri().required(),
  bio: joi.string().allow('')
});

export const signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
});