const Sequelize = require('sequelize')
const db = require('../config/database-config')

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: 'email present in database already',
    },
    validate: {
      notNull: {
        msg: 'email required',
      },
      isEmail: {
        msg: 'Provide a valid email address',
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
const update = async () => {
  await User.sync()
}

update()

module.exports = User
