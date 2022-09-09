// Appel des dépendances
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Déclarations du modèle Utilisateur
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, unique: true },
    profilPic: { type: String }
})

// Vérification de l'unicité de l'adresse mail
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)