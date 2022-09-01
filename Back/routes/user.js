// Appel de la fonction Router d'Express
const express = require('express')
const router = express.Router()

// Appel du contrôleur utilisateur
const userCtrl = require('../controllers/user')

// Création des routes Utilisateurs
router.post('/signup', userCtrl.signup)

module.exports = router
