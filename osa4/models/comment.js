const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', {
  text: String,
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
})

module.exports = Comment