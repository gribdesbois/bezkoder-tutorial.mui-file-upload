const express = require('express')

const router = express.Router()
const userListCtrl = require('../controllers/user-list')

router.get('/', userListCtrl.getAllUsers)

module.exports = router
