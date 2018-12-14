import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

/*
    Tee testi, joka varmistaa, että komponentti renderöi blogin titlen, authorin ja likejen määrän.
    Lisää komponenttiin tarvittaessa testausta helpottavia CSS-luokkia.
*/

describe('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Foo Title',
      author: 'Bar Author',
      likes: 42
    }
    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const titleAuthorDiv = blogComponent.first().find('.titleauthor')
    const detailsDiv = blogComponent.first().find('.details')

    expect(titleAuthorDiv.text()).toContain(blog.title)
    expect(titleAuthorDiv.text()).toContain(blog.author)
    expect(detailsDiv.text()).toContain(blog.likes.toString())

    const button = detailsDiv.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)


  })
})