const jwt = require('jsonwebtoken')

exports.extractUser = (req) => {
  const token = req.headers.authorization.split(' ')[1] // Notre token est de la forme BEARER
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
  const { userId } = decodedToken
  return userId
}
