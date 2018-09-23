


describe('user api posts', async () => {
  // Jest sometimes hangs if run with -t flag and non-running tests have references to mongoose.
  // Fix: only do imports if tests are run. More info: https://github.com/facebook/jest/issues/1456
  const supertest = require('supertest')
  const { app, server } = require('../index')
  const User = require('../models/user')
  const { usersInDb, createHash } = require('./test_helper')
  const api = supertest(app)

  beforeAll(async () => {
    await User.remove({})
    let pw = await createHash('sekret')
    const user = new User({ username: 'root', passwordHash: pw })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    const usersBeforeOperation = await usersInDb()

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
    expect(res.body.adult).toBe(true)
  })

  test('POST /api/users fails too short password', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'root2',
      name: 'Superuser2',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'password is too short, min length 3' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails without password', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'root2',
      name: 'Superuser2'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'content missing, password' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails without username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      name: 'Superuser2',
      password: 'foo'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'content missing, username' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  afterAll(() => {
    server.close()
  })
})

