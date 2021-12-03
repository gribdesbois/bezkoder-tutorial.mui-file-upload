const express = require('express')

const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const {
  addArticle, listArticles, modifyArticle, getOneArticle, likeArticle, deleteArticle,
} = require('../controllers/article')
const { listComments, postComment } = require('../controllers/comment')

router.get('/',  multer, listArticles) //! auth compares req.body .. might wanna double check that
router.post('/',  multer, addArticle)
router.post('/:id/like',  multer, /* xss(), */ likeArticle)

//! auth compares req.body .. might wanna double check that
router.post('/:id/comments/',  multer, postComment)
router.get('/:id/comments/',  listComments)

router.get('/:id',  multer, getOneArticle)
router.put('/:id',  multer, modifyArticle)
router.delete('/:id',  multer, deleteArticle)
// todo get('/:id/comment/), put('id:/comment)
// todo get('/:id/like)
module.exports = router
