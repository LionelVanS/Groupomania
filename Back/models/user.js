// Appel des dépendances
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Déclarations du modèle Utilisateur
const userSchema = new mongoose.Schema({
  // Données de connexion
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },

  // Profil à compléter
  name: { type: String },
  surname: { type: String },
  picture: { type: String },
})

// Vérification de l'unicité de l'adresse mail
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
