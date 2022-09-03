// Appel des dépendances
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Appel des fonctions
const { checkEmailFormat, checkPassword } = require('../middleware/checkNewUserData')

// Appel du modèle utilisateur
const User = require('../models/user')

// Signup
async function signup(req, res){
    const isPasswordIsValid = checkPassword(req)
    const isEmailIsValid = checkEmailFormat(req)

    if(isEmailIsValid && isPasswordIsValid){
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            password: hash
        })

        await user.save()
        res.status(200).json({ message: 'Utilisateur créé' })
    } else {
        res.status(400).json({ message: 'Impossible d\'enregistrer l\'utilisateur' })
    }
}

// Login
async function login(req, res){
    try{
        const user = await User.findOne({ email: req.body.email })
        const isValid = await bcrypt.compare(req.body.password, user.password)
        
        if(isValid){
            jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '24h' })    
            res.status(200).json({ message: 'Utilisateur connecté' })
        } else {
            res.status(401).json({ message: 'Utilisateur non connecté' })
        }
    } catch {
        res.status(401).json({ message: 'Utilisateur non connecté'})
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
