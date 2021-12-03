const { extractUser } = require('../middleware/get-token')
const Comment = require('../models/Comment')

exports.postComment = (req, res, next) => {
  const userId = extractUser(req)
  const articleId = req.params.id
  const comment = { ...req.body, userId, articleId }
  const newComment = new Comment(comment)
  newComment.save()
    .then((data) => res.status(201).json(data))
    .catch((err) => console.log(err))
}

exports.listComments = (req, res, next) => {
  const userId = extractUser(req)
  const articleId = req.params.id

  Comment.findAll({ include: { all: true }, where: { articleId } }) /* same for include */
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err))
}
