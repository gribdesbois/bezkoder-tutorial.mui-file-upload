/* eslint-disable no-restricted-syntax */
const jwt = require('jsonwebtoken')
const fs = require('fs')
const Article = require('../models/Article')
const User = require('../models/User')
const Like = require('../models/Like')
const hasUserLiked = require('../middleware/helpers').default
const handleLike = require('../middleware/likes-count')

const hasUserDisliked = hasUserLiked //! for better readability

exports.addArticle = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] // Notre token est de la forme BEARER
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
  const { userId } = decodedToken
  const article = { ...req.body, userId }
  const newArticle = new Article(article)
  newArticle.save()
    .then((data) => res.status(201).json(data))
    .catch((err) => console.log(err))
  console.log(newArticle)
}

exports.listArticles = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] // Notre token est de la forme BEARER
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
  const { userId } = decodedToken
  /* const userId = '06f1743d-1a2c-434f-84bc-4a6daf3067f6' */

  Article.findAll({ include: { all: true } })
    .then(async (response) => {
      for (const article of response) {
        await handleLike(article, userId)
      }

      return response
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json(err))
}

exports.modifyArticle = async (req, res, next) => {
  const {
    protocol, file, body, headers,
  } = req
  const token = headers.authorization.split(' ')[1] //! check auth.js if in doubt
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')//! not sure about the relevance of doing it again
  const { userId } = decodedToken

  if (file != null) { //! Per requirements " Si un fichier est fourni, la article [...]
    const article = JSON.parse(body.article)//! se trouve dans req.body.article.
    if (article.userId !== userId) {
      return res.status(403).json({ error: new Error('unauthorized request!') })
    }
    Article.findByPk({ where: { id: req.params.id } })
      .then((articleStored) => {
        const filename = articleStored.imageUrl.split('/images/')[1]

        fs.unlink(`images/${filename}`, () => { //! maybe check file content with hash to avoid duplicates
          Article
            .update(
              {
                ...article,
                imageUrl: `${protocol}://${req.get('host')}/images/${file.filename}`,
              },
              { where: { id: req.params.id } },
            )
            .then((article) => {
              console.log(article)
              res.status(200).json({ message: 'Objet modifié !' })
            })
            .catch((error) => res.status(400).json({ error }))
        })
      })
      .catch((error) => res.status(500).json({ error }))
  } else {
    if (body.userId !== userId) {
      return res.status(403).json({ error: new Error('unauthorized request!') })
    }
    /* // delete req.file */
    Article.update({ ...body }, { where: { id: req.params.id } }) //! Si aucun fichier n'est fourni,les informations sur la
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))//! article se trouvent directement dans le corps de la requête
      .catch((error) => res.status(400).json({ error }))
  }
}

exports.getOneArticle = (req, res, next) => {
  Article.findOne({ where: { id: req.params.id }, include: { all: true } }) // todo find a way to include [User]
    .then((article) => res.status(200).json(article))
    .catch((error) => res.status(404).json({ error }))
}

exports.deleteArticle = (req, res, next) => { // TODO CHECK IF I NEED A TRY ... CATCH AS IN AUTH.JS
  const token = req.headers.authorization.split(' ')[1] //! check auth.js if in doubt
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')//! tested with thunder . i DO need to prevent unauthorized actions
  const { userId } = decodedToken
  Article.findByPk(req.params.id)
    .then((article) => {
      if (article.userId !== userId) {
        return res.status(403).json({ error: new Error('unauthorized request!') })
      }
      if (!article) {
        res.status(404).json({ message: 'article not found in DB' })
      }
      if (article.imageUrl) {
        const filename = article.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          article.destroy()
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch((error) => res.status(400).json({ error }))
        })
      } else {
        article.destroy()
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch((error) => res.status(400).json({ error }))
      }
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.likeArticle = (req, res, next) => {
  const reqObject = { ...req.body } //! lamest name
  const { userId, value } = reqObject; /* ASI freaks out otherwise */
  const token = req.headers.authorization.split(' ')[1] //! check auth.js if in doubt
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
  const idExtractedFromToken = decodedToken.userId //! NOT WORKING ATM NEED TO DOUBLE CHECK

  if (idExtractedFromToken !== userId) {
    return res.status(403).json({ error: new Error('unauthorized request!') })
  }

  Like.findOne({ where: { articleId: req.params.id, userId } })
    .then((entry) => { //! findOne find the first entry so duplicate entries should not be a problem
      if (entry === null && value !== 'default') {
        const likedArticleObj = { ...reqObject, articleId: req.params.id }
        const likedArticle = new Like(likedArticleObj)
        likedArticle.save()
          .then((data) => res.status(201).json(data))
          .catch((err) => console.log(err))
      } else if (value === 'default') {
        entry.destroy()
          .then((data) => res.status(200).json(data))
          .catch((err) => console.log(err))
      } else {
        entry.update({
          ...reqObject,
          articleId: req.params.id,
        })
          .then((data) => res.status(200).json(data))
          .catch((err) => console.log(err))
      }
    })
    .catch((error) => res.status(500).json({ error }))
}
