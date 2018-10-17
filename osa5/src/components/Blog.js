import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const blogUsername = this.props.blog.user ? this.props.blog.user.name : ''

    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const showWhenUsersBlog = {display: this.state.username === blogUsername || !blogUsername ? '': 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle}>
        <a onClick={this.toggleVisibility} className='blogTitleClickable'>{this.props.blog.title}</a>
        <div className='author'>Tekijä: {this.props.blog.author}</div>

        <div style={showWhenVisible} className='extraDetailsHidable'>
          <div>Likes: {this.props.blog.likes}</div>
          <div><a href={this.props.blog.url}>{this.props.blog.url}</a></div>
          <div>Added by: {blogUsername}</div>
          <button onClick={() => this.props.addLikeHandle(this.props.blog)}>Like</button>
          <div style={showWhenUsersBlog}>
            <button onClick={() => this.props.removeHandle(this.props.blog)}>Remove</button>
          </div>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired, 
  addLikeHandle: PropTypes.func.isRequired, 
  removeHandle: PropTypes.func.isRequired, 
}


export default Blog