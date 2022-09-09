// Appel du modèle des posts
const Post = require('../models/post')

// Création d'un post
function createPost(req, res){
    const reqBody = req.body

    const post = new Post({
        ...reqBody,
        userId: req.body.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    })    

    post.save()
        .then(() => res.status(201).json({ message : 'Post créé' }))
        .catch(error => res.status(400).json({ error }))
}

// Récupération des posts
function getAllPosts(req, res){
    Post.find()
        .then(posts => { res.status(200).json(posts)})
        .catch(error => res.status(400).json({ error }))
}

// Récupération d'un seul post
function getOnePost(req, res){
    Post.findOne({ _id: req.params.id })
        .then((post) => {return res.status(200).json(post)})
        .catch(error => res.status(404).json({ error }))
}

// Modification d'un post
function updatePost (req, res){
    const modifiedPost = req.body
    
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message : "Non autorisé"})
            } else {
                Post.updateOne({ _id: req.params.id}, { ...modifiedPost, _id: req.params.id})
                    .then(() => res.status(200).json({ message : "Objet modifié!" }))
                    .catch(error => res.status(404).json({ error }))
            }
        })
        
        .catch((error) => {
            res.status(400).json({ error });
        })
}

// Suppression d'un post
function deletePost (req, res){
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId = req.auth.userId) {
                const filename = post.imageUrl.split("/images/")[1]
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: "Post supprimé" })})
                        .catch(error => res.status(400).json({ error }))
                    })
            } else {
                res.status(401).json({ message: "Non autorisé" })
            }
        })
        .catch(error => res.status(400).json({ error }))
}

module.exports = { createPost, getAllPosts, getOnePost, updatePost, deletePost }