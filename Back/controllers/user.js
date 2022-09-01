// Appel des dépendances
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Appel du modèle utilisateur
const User = require('../models/user')

// Signup
async function signup(req, res){
    const userData = await hashUserData(req)

    const user = new User({
        email: userData.email,
        password: userData.password
    })

    user.save()
        .then(res.status(200).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(500).json({ error }))
}


// Login
async function login(req, res){

}

module.exports = { signup, login }


        // FONCTIONS //

// Hachage Email et Password Utilisateur à l'inscription
async function hashUserData(req){
    const saltRounds = Number(process.env.BC_SALTROUNDS)
    const hashedEmail = await bcrypt.hash(req.body.email, saltRounds)
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    
    const userData = {
        email: hashedEmail,
        password: hashedPassword
    }

    return userData
}