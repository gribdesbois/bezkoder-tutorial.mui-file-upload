/* might want to locate it elsewhere => not a middleware */
const Gig = require('../models/Gig')

const gigDao = {
  findAll,
  create,
  findById,
  deleteById,
  updateGig,
}

function findAll() {
  return Gig.findAll()
}

function findById(id) {
  return Gig.findByPk(id)
}

function deleteById(id) {
  return Gig.destroy({ where: { id } })
}

function create(gig) {
  const newGig = new Gig(gig)
  return newGig.save()
}

function updateGig(gig, id) {
  const updateGig = {
    title: gig.title,
    technologies: gig.technologies,
    description: gig.description,
    budget: gig.budget,
    contact_email: gig.contact_email,
  }
  return Gig.update(updateGig, { where: { id } })
}
module.exports = gigDao
