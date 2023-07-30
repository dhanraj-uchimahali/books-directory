const Joi = require("joi")
.extend(require('@joi/date'));

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  mobile: Joi.number().min(10).required(),
  password: Joi.string().required(),
})

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().required()
})

const changePasswordSchema = Joi.object({
  password: Joi.string().required()
})

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  releaseDate: Joi.date().format('YYYY-MM-DD').required(),
  genre: Joi.string(),
  rating: Joi.number(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  releaseDate: Joi.date().required(),
  genre: Joi.string(),
  rating: Joi.number(),
});


module.exports = { createBookSchema, updateBookSchema, createUserSchema, loginSchema, changePasswordSchema };
