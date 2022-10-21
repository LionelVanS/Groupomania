// Appel de la fonction Router d'Express
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')
const limiter = require('../middleware/rateLimite')

// Appel du contrôleur utilisateur
const userCtrl = require('../controllers/user')

// Création des routes Utilisateurs
router.post('/signup', userCtrl.signup)
router.post('/login', limiter, userCtrl.login)
router.put('/updateUser', auth, multer, userCtrl.updateUser)
router.get('/getOneUser', auth, userCtrl.getOneUser)
router.get('/getPostUser/:id', auth, userCtrl.getPostUser)

module.exports = router
