// Appel de la fonction Router d'Express
const express = require('express')
const router = express.Router()

// Appel du middleware d'authentification
const auth = require('../middleware/auth')

// Appel du middleware de gestion des fichiers
const multer = require('../middleware/multer')

// Appel du controleur des posts
const postCtrl = require('../controllers/post')

// Appel du controler des likes
const likeCtrl = require('../controllers/like')

// Création des routes posts                          
router.post('/createPost', auth, multer, postCtrl.createPost)            
router.get('/getAllPosts', auth, postCtrl.getAllPosts)                    
router.get('/getOnePost/:id', auth, postCtrl.getOnePost)
router.put('/updatePost/:id', auth, multer, postCtrl.updatePost)           
router.delete('/deletePost/:id', auth, postCtrl.deletePost)             

// Création des routes like
router.put('/:id/like', likeCtrl.updateLike)

module.exports = router