import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {

    beforeAll(() => {
        app = mount(<App />)
    })

    it('blogs are not rendered', () => {
        app.update()
        const blogComponents = app.find(Blog)

        expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged in without blogs', () => {
    const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
    }
    
    beforeAll(() => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        app = mount(<App />)
    })
    it('blogs are rendered, but user has none', () => {
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  }) 

  describe('when user is logged in with blogs', () => {
    const user = {
        username: "mluukkai",
        token: "1231231214",
        name: "Matti Luukkainen"
    }
    
    beforeAll(() => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        app = mount(<App />)
    })
    it('blogs are rendered, user has some', () => {
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  }) 
}) 