// Appel des dépendances
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Appel des fonctions de vérification de format mot de passe et email
const { checkEmailFormat, checkPassword } = require('../middleware/checkNewUserData')

// Appel du modèle utilisateur
const User = require('../models/user')

// Signup
async function signup(req, res){

        const  isPasswordIsValid  = checkPassword(req)
        const  isEmailIsValid  = checkEmailFormat(req)
            if(isEmailIsValid && isPasswordIsValid){
                const hash = await bcrypt.hash(req.body.password, 10)
                try{
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    })
                    await user.save()
                    res.status(200).json(({ message: 'Utilisateur créé' }))
                } catch(e){
                    res.status(400).json({ message: 'L\'email doit être unique' })
                }
            } else{
                res.status(400).json({ message: 'Les champs de saisie ne sont pas correctement renseignés' })
            }
        }
        
// Login
async function login(req, res){
    try{
        const user = await User.findOne({ email: req.body.email })

        const userIsValid = await bcrypt.compare(req.body.password, user.password)
        
        if(userIsValid){
            res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '24h' }),
                message : 'Utilisateur connecté'
            });
        } else {
            res.status(401).json({ message: 'Mot de passe erroné' })
        }
    } catch (err){
        res.status(400).json({ message: 'Utilisateur inconnu' })
    }
}
    
module.exports = { signup, login }