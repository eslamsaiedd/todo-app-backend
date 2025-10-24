
const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken') 

const usersController = require('../controllers/usercontroller')


router.route('/me')
            .get(verifyToken, usersController.me)
// '/me', authMiddleware, getMe
// register
router.route('/register')
            .post(usersController.register)

// login
router.route('/login')
            .post(usersController.login)

module.exports = router;
