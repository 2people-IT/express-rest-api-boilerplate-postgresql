import Joi from 'joi'

export const createUser = Joi.object({
  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  name: Joi.string(),
  password: Joi.string().min(6).required()
})
export const updateUser = Joi.object({
  name: Joi.string().min(2).max(32).required()
})
export const updatePassword = Joi.object({
  password: Joi.string().min(6).required()
})
export const withUserID = Joi.object({
  id: Joi.number().integer().min(1).required()
})
// TODO do not use db select statements as a query params
export const withDBOptions = Joi.object({
  where: Joi.object(),
  attributes: Joi.object(),
  limit: Joi.number().integer().min(1).max(100).default(10),
  offset: Joi.number().integer().min(0).default(0)
})
