/* const express = require('express')

const router = express.Router()
const { xss } = require('express-xss-sanitizer')
const auth = require('../middleware/auth') // L'ordre est important==> si on place multer avant auth, les images des requetes nom /*aut,h*entifiées
const multer = require('../middleware/multer-config')// seront enregistrées dans le server
const sauceCtrl = require('../controllers/sauce')

router.get('/', auth, multer, sauceCtrl.getAllSauces)
router.post('/', auth, multer, xss(), sauceCtrl.createSauce)
router.post('/:id/like', auth, multer, xss(), sauceCtrl.likeSauce)
router.get('/:id', auth, multer, sauceCtrl.getOneSauce)
router.put('/:id',
  auth,
  multer,
  xss(),
  sauceCtrl.modifySauce)
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce)

module.exports = router */
