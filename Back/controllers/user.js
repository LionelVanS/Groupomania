// Appel des dépendances
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Appel du modèle utilisateur
const User = require('../models/user')

// Signup
async function signup(req, res){
    const hashedEmail = await hashEmail(req)
    const hashedPassword = await hashPassword(req)

    const user = new User({
        email: hashedEmail,
        password: hashedPassword
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

// Hachage BCRYPT
async function hashPassword(req){
    const password = req.body.password
    const saltRounds = Number(process.env.BC_SALTROUNDS)
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

async function hashEmail(req){
    const email = req.body.email
    const saltRounds = Number(process.env.BC_SALTROUNDS)
    const hashedEmail = await bcrypt.hash(email, saltRounds)
    return hashedEmail
}