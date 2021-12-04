// TODO signup: check for more error case + validate either with sequelize or xpress-validator

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const { validationResult } = require('express-validator')
const User = require('../models/User')
const { create } = require('../models/create-model')

exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    const newUser = await User.create({
      email: req.body.email,
      password: hash,
    })
    res.status(201).json({ message: 'Utilisateur créé' })
  } catch (error) {
    res.status(400).json({ error }) //! might wanna separate different error codes  now i hav all inside try catch
  }
}
exports.login = (req, res, next) => {
  /* const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(400).json({ errors: errors.array() })
  } */

  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur inconnu dans DB' })
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect!' })
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' },
            ),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
