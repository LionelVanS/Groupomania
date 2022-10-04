const Post = require('../models/post')
const fs = require('fs')

// Création d'un post
function createPost(req, res) {
  const reqBody = req.body
  delete reqBody._id
  delete reqBody.userId

  const post = new Post({
    ...reqBody,
    userId: req.auth.userId,
    picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  })

  post
    .save()
    .then(() => {
      res.status(201).json({ message: 'Post créé' })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

// Récupération des posts
function getAllPosts(req, res) {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => res.status(400).json({ message: 'Aucun post' }))
}

// Modification d'un post
function updatePost(req, res) {
  console.log(req.file)
  const modifiedPost = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }

  Post.findOne({ _id: req.params.id })
    .then(() => {
      if ((modifiedPost.userId = req.auth.userId)) {
        Post.updateOne({ _id: req.params.id }, { ...modifiedPost })
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch(() =>
            res.status(500).json({ message: 'Il y a eu une erreur' })
          )
      } else {
        res.status(401).json({ message: 'Non autorisé' })
      }
    })

    .catch(() => res.status(404).json({ message: "Ce post n'existe pas" }))
}

// Suppression d'un post
function deletePost(req, res) {
  try {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if ((post.userId = req.auth.userId)) {
          const filename = post.picture.split('/images/')[1]
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
              .then(() => {
                res.status(200).json({ message: 'Post supprimé' })
              })
              .catch((error) => res.status(400).json({ error }))
          })
        } else {
          res.status(401).json({ message: 'Non autorisé' })
        }
      })
      .catch(() => res.status(400).json({ message: "Ce post n'existe pas" }))
  } catch (e) {
    return
  }
}

// Gestion des likes et dislikes
async function updateLike(req, res) {
  const postId = req.params.id
  const userId = req.body.userId
  const post = await Post.findOne({ _id: postId })

  if (post.usersLiked.includes(userId)) {
    Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
    )
      .then(() =>
        res.status(200).json({ message: 'Vous avez supprimé votre like' })
      )
      .catch((error) => res.status(400).json({ error }))
  } else {
    Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { likes: 1 }, $push: { usersLiked: userId } }
    )
      .then(() => res.status(200).json({ message: 'Vous aimé ce post' }))
      .catch(() => res.status(400).json({ message: "Pas possible d'aimer" }))
  }
}

module.exports = { createPost, getAllPosts, updatePost, deletePost, updateLike }
