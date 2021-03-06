const mongoose = require('mongoose')

const Blog = mongoose.model('User', {
  username: { type: String, index: { unique: true } },
  name: String,
  passwordHash: String,
  adult: { type: Boolean, default: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]

})

module.exports = Blog