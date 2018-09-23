const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs')

  console.log('noudettiin käyttäjät: ', users)
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.password === undefined) {
      return response.status(400).json({ error: 'content missing, password' })
    } else if (body.password.length < 3) {
      return response.status(400).json({ error: 'password is too short, min length 3' })
    }
    if (body.username === undefined) {
      return response.status(400).json({ error: 'content missing, username' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
      adult: body.adult
    })

    const savedUser = await user.save()
    console.log(savedUser)
    response.status(201).json(savedUser)
  } catch (exception) {
    if (exception.name === 'MongoError' && exception.code === 11000) {
      // Duplicate username
      return response.status(400).send({
        error: 'username must be unique'
      })
    }

    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }

})

module.exports = userRouter
