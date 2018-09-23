const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const initialBlogs = [
  {
    title: 'Kerää itsesi',
    author: 'Pasi Pajamäki',
    url: 'banaanikotka.fi',
    likes: 2
  },
  {
    title: 'Kerää itsesi 2',
    author: 'Pasi Pajamäki',
    url: 'banaaniultra.fi',
    likes: 4
  }
]

const initialUsers = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen'
  },
  {
    username: 'Junnu',
    name: 'Juhani',
    password: 'passukassu'
  },
]

const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const blogsInDb = async () => {
  const res = await Blog.find({})
  return res.map(format)
}

const createHash = async(password) => {
  const saltRounds = 10
  let hashed = await bcrypt.hash(password, saltRounds)
  return hashed
}

const initializeDb = async () => {
  await Blog.remove({})
  await User.remove({})

  for (let user of initialUsers) {
    let userObj = new User(user)
    userObj.passwordHash = await createHash(user.password)
    userObj.password = undefined
    await userObj.save()
  }

  const firstUser = await User.findOne({ username: initialUsers[0].username })

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    blogObject.user = firstUser._id
    const res = await blogObject.save()

    firstUser.blogs.concat(res._id)
    await firstUser.save()
  }
  return await blogsInDb()
}


const usersInDb = async () => {
  const users = await User.find({})
  return users
}


module.exports = {
  initialBlogs, blogsInDb, initializeDb, format, usersInDb, initialUsers, createHash
}