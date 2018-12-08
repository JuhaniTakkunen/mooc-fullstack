import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

// class Blog extends React.Component {

const Blog = ({ blog }) => {

  if (blog) {

  const toggleVisibility = () => {
    // this.setState({ visible: !this.state.visible })
  }
  console.log("--------- juhani ------------")
    console.log(blog)

    const blogUsername = blog.user ? blog.user.name : ''
    let visibleState = true // this.state.visible
    let usernameState = true //  === blogUsername || !blogUsername
    const showWhenVisible = { display: visibleState ? '' : 'none' }
    const showWhenUsersBlog = { display: usernameState ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle}>
        <a onClick={this.toggleVisibility} className='blogTitleClickable'>{blog.title}</a>
        <div className='author'>Tekijä: {blog.author}</div>

        <div style={showWhenVisible} className='extraDetailsHidable'>
          <div>Likes: {blog.likes}</div>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>Added by: {blogUsername}</div>
          <button onClick={() => this.props.addLikeHandle(blog)}>Like</button>
          <div style={showWhenUsersBlog}>
            <button onClick={() => this.props.removeHandle(blog)}>Remove</button>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (<div>blog not found</div>)
  }
}

  /*
  Blog.propTypes = {
    blog: PropTypes.object.isRequired, 
    addLikeHandle: PropTypes.func.isRequired, 
    removeHandle: PropTypes.func.isRequired, 
  }
  */

  export default Blog