// Appel de Jsonwebtoken
const jwt = require('jsonwebtoken')

// Appel de DOtenv
require('dotenv').config()

// Vérification de l'authentification utilisateur
module.exports = (req, res, next) => {
  const token = req.headers.authorization
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY)
    const userIdToCheck = decodedToken.userId

    req.auth = { userId: userIdToCheck }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Utilisateur non autorisé' })
  }
}
