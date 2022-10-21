const rateLimite = require('express-rate-limit')

const limiter = rateLimite({
  max: 5,
  windowsMs: 300000,
  message:
    'Vous devez attendre 5 minutes avant de pouvoir essayer de vous connecter à nouveau',
})

module.exports = limiter
