const Sequelize = require('sequelize')
const db = require('../config/database-config')

const User = require('./User')

const Article = db.define('article', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },

  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: { // todo rename to content
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    defaultValue: User.id,
    /* allowNull: false, */
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    /* validate: {
      isUrl: true,
    }, */
  },
  likesCount: {
    type: Sequelize.NUMBER,
    defaultValue: 0,
  },
  doesUserLikes: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

})

User.hasMany(Article)
Article.belongsTo(User)
Article.sync()
exports.ShowUsersTasks = async () => {
  await db.sync() // ! check if it can be removed
  const users = await User.findAll({ include: [Article] })
  users.map((user) => {
    console.log(`${user.name} has tasks: `)
    const { articles } = user
    articles.map((article) => {
      console.log(` * ${article.decription}`)
    })
  })
}

module.exports = Article
