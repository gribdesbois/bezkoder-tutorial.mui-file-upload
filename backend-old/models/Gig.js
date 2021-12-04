const Sequelize = require('sequelize')
const db = require('../config/database-config')

const Gig = db.define('gig', {
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
  technologies: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  budget: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
const update = async () => {
  await Gig.sync()
}

update()

module.exports = Gig
