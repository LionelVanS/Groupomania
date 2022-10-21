// Appel des dependances
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')

// Appel des différentes routes
const userRoutes = require('./routes/user')
const userPost = require('./routes/post')

// Création de l'application Express
const app = express()

// Récupération des réponses de requêtes en JSON
app.use(express.json())

// Ajout du middleware HELMET
app.use(helmet())

// Ajout du middleware CORS
app.use(cors())

// Connexion à la DATABASE MongoDB Atlas
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée ! >>>', err))

// Modification des en-têtes pour autoriser le fonctionnement de l'application
// sur plusieurs port (port 3001 pour le backend et port 3000 pour le frontend)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
  next()
})

// Routes
app.use('/', userRoutes)
app.use('/', userPost)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app
