const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // Notre token est de la forme BEARER
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')// randomLengthyString so we split it around the space char
    const { userId } = decodedToken // then get the second element
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !'
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({ error: new Error('unauthorized request!') })
  }
}
