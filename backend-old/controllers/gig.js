const gigDao = require('../middleware/gig-dao')

const gigController = {
  addGig,
  findGigs,
  findGigById,
  updateGig,
  deleteById,
}
function addGig(req, res) {
  const gig = req.body
  return gigDao.create(gig)
    .then((data) => {
      res.status(201).json({ message: 'Objet enregistrĂ©' })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

function findGigById(req, res) {
  gigDao.findById(req.params.id)
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

function deleteById(req, res) {
  gigDao.deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Gig deleted successfully',
        gig: data,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

function updateGig(req, res) {
  gigDao.updateGig(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Gig updated successfully',
        gig: data,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

function findGigs(req, res) {
  gigDao.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      console.log(error)
    })
}
module.exports = gigController
