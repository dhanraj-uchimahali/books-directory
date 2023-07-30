const express = require('express')
const router = express.Router()

const {createBookSchema, updateBookSchema, createUserSchema, loginSchema, changePasswordSchema } = require('../schema/schema-suit')
const healthAPI = require('../controller/health.controller')
const { create, fetchAll, fetchOne, update, deleteBookData } = require('../controller/books.controller')
const { createUser, loginUser, changePassword } = require('../controller/user.controller')
const validationMiddleware = require('../middleware/validation.middleware')
const authMiddleware = require('../middleware/auth.middleware')

// Health API
router.get('/init', healthAPI)

// User Registration, Login and change password API
router.post('/v1/signup', validationMiddleware(createUserSchema), createUser)
router.post('/v1/login', validationMiddleware(loginSchema), loginUser)
router.post('/v1/change-password', validationMiddleware(changePasswordSchema), authMiddleware, changePassword)

// Books Directory API
router.post('/v1/books', validationMiddleware(createBookSchema), authMiddleware, create);
router.get('/v1/books', authMiddleware, fetchAll)
router.get('/v1/:bookId', authMiddleware, fetchOne)
router.put('/v1/:bookId', validationMiddleware(updateBookSchema), authMiddleware, update)
router.delete('/v1/:bookId',authMiddleware, deleteBookData)
module.exports = router