// Appel des dépendances
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
require('dotenv').config()

// Appel du modèle utilisateur
const User = require('../models/user')

// Signup
async function signup(req, res){
    const hash = await bcrypt.hash(req.body.password, 10)

    const user = new User({
        email: req.body.email,
        password: hash
    })

    user.save()
        .then(res.status(200).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(500).json({ error }))
}


// Login
async function login(req, res){
    try{
        const user = await User.findOne({ email: req.body.email })
        const isValid = await bcrypt.compare(req.body.password, user.password)
        
        if(isValid){
            jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '24h' })    
            res.status(200).json({ message: 'Utilisateur connecté' })
        } 
    } catch {
        res.status(401).json({ message: 'Vous ne pouvez pas vous connecter'})
    }
}
    
module.exports = { signup, login }


        // FONCTIONS //

// Comment récupérer l'utilisateur sur la BDD pour vérifier le hash ? findOne et compare ?

// Hachage Email et Password Utilisateur à l'inscription
// async function hashUserData(req){
//     const saltRounds = Number(process.env.BC_SALTROUNDS)
//     const hashedEmail = await bcrypt.hash(req.body.email, saltRounds)
//     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    
//     const userData = {
//         email: hashedEmail,
//         password: hashedPassword
//     }

//     return userData
// }
