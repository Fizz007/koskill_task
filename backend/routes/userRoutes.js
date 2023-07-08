const express = require('express')

const {userSignin,userSignup} = require('../controller/userController')

const router = express.Router();


router.post('/signin', userSignin)
router.post('/signup', userSignup)

module.exports = router;