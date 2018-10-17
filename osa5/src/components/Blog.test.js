import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

/* 
    Tee testi, joka varmistaa, että komponentti renderöi blogin titlen, authorin ja likejen määrän.
    Lisää komponenttiin tarvittaessa testausta helpottavia CSS-luokkia.
*/

describe.only('<Blog />', () => {

  let blogComponent
  const blog = {
    title: 'Foo Title',
    author: 'Bar Author', 
    likes: 42
  }
  beforeEach(() => {

    const mockHandler1 = jest.fn()
    const mockHandler2 = jest.fn()

    blogComponent = shallow(<Blog blog={blog} addLikeHandle={mockHandler1} removeHandle={mockHandler2} />)

  })

  it('before button click', () => {
    
    const titleLink = blogComponent.first().find('.blogTitleClickable')
    const authorDiv = blogComponent.first().find('.author')

    
    expect(titleLink.text()).toContain(blog.title)
    expect(authorDiv.text()).toContain(blog.author)

    const extras = blogComponent.first().find('.extraDetailsHidable')
    expect(extras.props().style).toHaveProperty('display', 'none')
  })
  
  it('after button click', () => {
    

    const titleLink = blogComponent.first().find('.blogTitleClickable')
    const authorDiv = blogComponent.first().find('.author')

    titleLink.simulate('click')

    expect(titleLink.text()).toContain(blog.title)
    expect(authorDiv.text()).toContain(blog.author)

    const extras = blogComponent.first().find('.extraDetailsHidable')
    expect(extras.props().style).toHaveProperty('display', '')

  })
})