
describe('blogs api', () => {

  // Jest sometimes hangs if run with -t flag and non-running tests have references to mongoose.
  // Fix: only do imports if tests are run. More info: https://github.com/facebook/jest/issues/1456
  const supertest = require('supertest')
  const { app, server } = require('../index')
  const { initialBlogs, blogsInDb, initializeDb, format, initialUsers } = require('./test_helper')
  const Blog = require('../models/blog')
  const User = require('../models/user')

  const api = supertest(app)

  let auth = {}
  let auth2 = {}
  let user = undefined

  beforeAll(async () => {
    await initializeDb()
    auth = await api
      .post('/api/login')
      .send({
        username: initialUsers[0].username,
        password: initialUsers[0].password
      })
    user = await User.findOne({ username: initialUsers[0].username })

    auth2 = await api
      .post('/api/login')
      .send({
        username: initialUsers[1].username,
        password: initialUsers[1].password
      })
    await User.findOne({ username: initialUsers[1].username })
    return
  })

  describe('gets', () => {

    test('blogs are returned as json', async () => {

      const blogsInDatabase = await blogsInDb()

      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(blogsInDatabase.length)
      expect(response.body.length).toBe(initialBlogs.length)
      const contents = response.body.map(r => r.title)
      blogsInDatabase.forEach(blog => {
        expect(contents).toContain(blog.title)
      })
    })
  })

  describe('posts', () => {

    test('blog is posted', async () => {

      const newBlog = {
        'title': 'otsikko233',
        'author': 'tekijä',
        'url': 'nettiurl',
        'likes': 1234,
        user: user._id
      }
      const responsePost = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + auth.body.token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(responsePost.body.title).toBe('otsikko233')

      const blogsAfterOperation = await blogsInDb()

      //newBlog.id = responsePost.body._id
      expect(blogsAfterOperation).toContainEqual(format(newBlog))
    })

    test('blogs are posted with no likes', async () => {
      const newBlog = {
        'title': 'tyhja teos',
        'author': 'ei tekijaa',
        'url': 'nettiurl',
        user: user._id
      }
      const responsePost = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + auth.body.token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(responsePost.body.likes).toBe(0)

    })

    test('blogs are posted with no title', async () => {
      const newBlog = {
        'author': 'ei tekijaa',
        'url': 'nettiurl'
      }
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + auth.body.token)
        .send(newBlog)
        .expect(400)
    })

    test('blogs are posted with no url', async () => {
      const newBlog = {
        'title': 'tyhja teos',
        'author': 'ei tekijaa',
      }
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + auth.body.token)
        .send(newBlog)
        .expect(400)
    })

    test('post empty plog', async () => {
      const newBlog = {}
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + auth.body.token)
        .send(newBlog)
        .expect(400)
    })
  })
  describe('deletes', () => {

    test('basic remove', async () => {

      const blogsInDatabase = await Blog.find({})
      const blogToDelete = blogsInDatabase[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', 'bearer ' + auth.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await blogsInDb()

      expect(await Blog.findById(blogToDelete.id)).toBe(null)

    })

    test('remove by wrong person', async () => {

      const blogsInDatabase = await Blog.find({})
      const blogToDelete = blogsInDatabase[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', 'bearer ' + auth2.body.token)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(await Blog.findById(blogToDelete.id)).not.toBe(null)

    })

    test('remove without auth', async () => {

      const blogsInDatabase = await Blog.find({})
      const blogToDelete = blogsInDatabase[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(await Blog.findById(blogToDelete.id)).not.toBe(null)

    })
  })
  describe('modifies', () => {

    test('basic modify', async () => {

      const blogsInDatabase = await Blog.find({})
      const blogToModify = blogsInDatabase[0]

      const newBlog = format(blogToModify)
      newBlog.likes = 999
      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation).toContainEqual(newBlog)

    })
  })

  afterAll(() => {
    console.log('Closing server connection')
    server.close()
    console.log('Sever connection closed')
  })

})
