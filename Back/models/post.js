// Appel de la dépendance
const mongoose = require('mongoose')

// Déclaration du modèle des posts
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  picture: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
  usersDisliked: { type: Array, default: [] },
})

module.exports = mongoose.model('Post', postSchema)
