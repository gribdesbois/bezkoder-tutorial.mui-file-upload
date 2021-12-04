const admin = require('firebase-admin')
const serviceAccount = require('../config/open-classroom-p7-firebase-adminsdk-jfk0t-9e1dd12dcd.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
module.exports = (req, res, next) => {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then(() => {
        next()
      }).catch(() => {
        res.status(403).send('Unauthorized')
      })
  } else {
    res.status(403).send('Unauthorized')
  }
}
