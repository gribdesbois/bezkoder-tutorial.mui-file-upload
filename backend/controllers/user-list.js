const Article = require('../models/Article')
const User = require('../models/User')

exports.getAllUsers = (req, res, next) => {
  User.findAll({ include: [Article] })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json(error))
}
