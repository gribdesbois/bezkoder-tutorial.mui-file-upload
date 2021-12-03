const express = require('express')

const router = express.Router()
/* const { xss } = require('express-xss-sanitizer')
const auth = require('../middleware/auth') // L'ordre est important==> si on place multer avant auth, les images des requetes nom /*aut,h*entifiées
const multer = require('../middleware/multer-config')// seront enregistrées dans le server */
const gigController = require('../controllers/gig')

router.get('/', /* auth, multer, */ gigController.findGigs)
router.post('/', /* auth, multer,  xss(), */ gigController.addGig)
// router.post('/:id/like', /*  auth, multer, xss(), */ gigController.likeSauce)
router.get('/:id', /* auth, multer, */ gigController.findGigById)
router.put('/:id',
  /* auth,
  multer,
  xss(), */
  gigController.updateGig)
router.delete('/:id', /* auth, multer, */ gigController.deleteById)

module.exports = router
