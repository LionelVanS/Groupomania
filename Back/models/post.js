// Appel de la dépendance
const mongoose = require('mongoose')

// Déclaration du modèle des posts
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String },
  likes: { type: Number, default: 0, required: true },
  dislikes: { type: Number, default: 0, required: true },
  usersLiked: { type: Array, default: [], required: true },
  usersDisliked: { type: Array, default: [], required: true }
})

module.exports = mongoose.model('Post', postSchema)