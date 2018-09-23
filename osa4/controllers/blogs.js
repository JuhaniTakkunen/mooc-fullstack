const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined) {
      return response.status(400).json({ error: 'content missing, title' })
    }
    if (body.url === undefined) {
      return response.status(400).json({ error: 'content missing, url' })
    }
    if (body.likes === undefined) {
      body.likes = 0
    }

    const blog = new Blog(body)
    const user = await User.findById(decodedToken.id)
    blog.user = user._id

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }

})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog
      .findById( request.params.id )
      .populate('user')

    if (!blog)
      return response.status(400).json({ error: 'unknown id' })

    const user = await User.findById(decodedToken.id)

    if ( blog.user._id.toString() === user._id.toString() ) {
      blog.remove()
      console.log(request.params.id, user.blogs)
      user.blogs = user.blogs.filter(b => b.toString() !== request.params.id )
      console.log(request.params.id, user.blogs)
      user.save()
    } else {
      return response.status(401).json({ error: 'Käyttäjällä ei ole oikeutta poistaa kyseistä blogia' })
    }
    console.log('poistettiin blogi: ', blog)
    response.json(blog)
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findOneAndUpdate({ likes: body.likes })
  response.json(blog)
})

module.exports = blogsRouter
