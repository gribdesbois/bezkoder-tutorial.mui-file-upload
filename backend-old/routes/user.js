const express = require('express')

const router = express.Router()
/* const { body } = require('express-validator') */
const userCtrl = require('../controllers/user')
/* const { createAccountLimiter, loginLimiter } = require('../middleware/express-rate-limit') */

router.post('/signup/',
  /* body('email').isEmail().normalizeEmail().withMessage('email incorrect'),
  body('password').isStrongPassword().withMessage(' minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1'),
  createAccountLimiter, */
  userCtrl.signup)
router.post('/login/',
  /* body('email').isEmail(),
  body('password').isStrongPassword().withMessage(' minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1'),
  loginLimiter, // might prevent DDOS attacks and / or brute force */
  userCtrl.login)

module.exports = router
