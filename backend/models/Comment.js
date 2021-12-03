const Sequelize = require('sequelize')
const db = require('../config/database-config')
const Article = require('./Article')
const User = require('./User')

const Comment = db.define('comment', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  }, /* // ! Should i add a title? */
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    /* validate: {
      isUrl: true,
    }, */
  },
  userId: {
    type: Sequelize.UUID,
    defaultValue: User.id,
    allowNull: false,
  },
  articleId: {
    type: Sequelize.UUID,
    defaultValue: Article.id,
    allowNull: false,
  },
})

Article.hasMany(Comment)
Comment.belongsTo(Article)

User.hasMany(Comment)
Comment.belongsTo(User)
Comment.sync()

module.exports = Comment
