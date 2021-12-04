const express = require('express')

const app = express()
/* const mongoose = require('mongoose')
const dotenv = require('dotenv') */
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const hpp = require('hpp')

const db = require('./config/database-config')
const gigRoutes = require('./routes/sauce_gig')
const userRoutes = require('./routes/user')
const userListRoutes = require('./routes/user-list')
const articleRoutes = require('./routes/article')
/* const mongoSanitize = require('express-mongo-sanitize')

const { apiLimiter } = require('./middleware/express-rate-limit') */
const Article = require('./models/Article')

// ! DB connection
db.authenticate().then(() => {
  console.log('Database connected...');
}).catch((err) => {
  console.log(`Error: ${err}`);
})

app.use(cors())
app.use(helmet({ crossOriginEmbedderPolicy: true })) // headers config
app.use(express.json())
app.options('*', cors()) // enables pre-flight requests before other routes
app.use(hpp()) //! Prevents query parameter pollution

/* // Sanitization prevents SQL injection
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
) */
//! indique comment traiter les requetes vers la route /image
app.use('/images', express.static(path.join(__dirname, 'images')))

//! Express-rate-limit

//! temp dummy route
app.use('/api/users', userListRoutes)
app.use('/api/articles', articleRoutes)
// app.use('/api/gigs', /* apiLimiter, */ gigRoutes) //! DO NOT FORGET / BEFORE api/sauces
app.use('/api/auth', userRoutes)//! more limitations on route/user.js
//! hit 429 if we hit this route too often
module.exports = app
