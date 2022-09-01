// Appel des dépendances
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


// Appel du modèle utilisateur
const User = require('../models/user')

// Fonction signup
async function signup(req, res){
    
    const hash = await hashPassword(req)

    const user = new User({
        email: req.body.email,
        password: hash
    })

    user.save()
        .then(res.status(200).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(500).json({ error }))
}
  

// Fonction login
async function login(req, res){
    const 
}

// Fonction de hashage BCRYPT
async function hashPassword(req){
    const password = req.body.password
    const saltRounds = Number(process.env.BC_SALTROUNDS)
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword    
}

module.exports = { signup, login }