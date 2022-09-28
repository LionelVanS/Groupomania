// Appel de la dépendance
const mongoose = require('mongoose')

// Déclaration du modèle des posts
const postSchema = mongoose.Schema({
  // User
  userId: { type: String, required: true },
  // Content
  text: { type: String, required: true },
  picture: { type: String, required: true },
  date: { type: String, required: true },
  // Likes
  likes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
})

module.exports = mongoose.model('Post', postSchema)
