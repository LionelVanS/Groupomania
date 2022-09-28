// Appel des dépendances
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Appel des fonctions de vérification de format mot de passe et email
const {
  checkEmailFormat,
  checkPassword,
} = require('../middleware/checkNewUserData')

// Appel du modèle utilisateur
const User = require('../models/user')

// Signup
async function signup(req, res) {
  const isPasswordIsValid = checkPassword(req)
  const isEmailIsValid = checkEmailFormat(req)
  const saltRounds = await bcrypt.genSalt(parseInt(process.env.BC_SALTROUNDS))
  if (isEmailIsValid && isPasswordIsValid) {
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    try {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      await user.save()
      res.status(200).json({
        userId: user._id,
        token: jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY, {
          expiresIn: '24h',
        }),
      })
    } catch (e) {
      res.status(400).json({ message: "L'email doit être unique" })
    }
  } else {
    res.status(400).json({
      message: 'Les champs de saisie ne sont pas correctement renseignés',
    })
  }
}

// Login
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })

    const userIsValid = await bcrypt.compare(req.body.password, user.password)

    if (userIsValid) {
      res.status(200).json({
        userId: user._id,
        token: jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY, {
          expiresIn: '24h',
        }),
      })
    } else {
      res.status(401).json({ message: 'Mot de passe erroné' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Utilisateur inconnu' })
  }
}

// Modification du profil
async function updateUser(req, res) {
  try {
    await User.findOneAndUpdate(
      { _id: req.auth.userId },
      {
        ...req.body,
        _id: req.auth.userId,
        picture: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    )

    res.status(200).json({ message: 'Utilisateur modifié' })
  } catch {
    res.status(404).json({ message: "Impossible de modifier l'utilisateur" })
  }
}

// Obtenir un utilisateur
async function getOneUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.auth.userId })
    res.status(200).json({ user })
  } catch {
    res.status(404).json({ message: 'Utilisateur inconnu' })
  }
}

async function getPostUser(req, res) {
  try {
    const postUser = await User.findOne({ _id: req.params.id })
    res.status(200).json({ postUser })
  } catch {
    res.status(404).json({ message: 'Utilisateur introuvable' })
  }
}

module.exports = { signup, login, updateUser, getOneUser, getPostUser }
