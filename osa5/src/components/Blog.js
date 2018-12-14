import React from 'react'
import { Table } from 'react-bootstrap'
import { modifyComment, createComment } from './../reducers/commentReducer'
import { addLike, deleteBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'


class Blog extends React.Component {
  handleCommentFieldChange = (event) => {
    this.props.modifyComment(event.target.value)
  }

  sendLike = async (blog) => {
    try {
      const updateBlog = await this.props.addLike(blog)
      this.props.notify('Like lisätty kohteelle' + updateBlog.title + ', yhteensä: ' + updateBlog.likes, 5)
    } catch (exception) {
      console.log(exception)
      this.props.notify('Tykkäyksen päivitys epäonnistui', 5, true)
    }
  }
  sendDelete = async (blog) => {
    if (window.confirm('Delete \'' + blog.title + '\' by ' + blog.author + '?')) {
      try {
        const updateBlog = await this.props.deleteBlog(blog)
        this.props.notify('Blogikirjoitus poistettu: ' + updateBlog.title, 5)
      } catch (exception) {
        console.log(exception)
        this.props.notify('Poistaminen epäonnistui', 5, true)
      }
    }
  }
  render() {

    const blog = this.props.blog

    if (blog) {

      const blogUsername = blog.user ? blog.user.name : ''
      let visibleState = this.props.user.username ? true: false
      let removableBlog =  !blog.user || !blog.user.username || this.props.user.username === blog.user.username
      const showWhenVisible = { display: visibleState ? '' : 'none' }
      const showWhenUsersBlog = { display: removableBlog ? '' : 'none' }

      const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

      const sendComment = async (event) => {
        event.preventDefault()
        try {
          const newComment = this.props.comment
          await this.props.createComment({
            id: blog._id,
            text: this.props.comment
          })
          this.props.notify('Uusi kommentti lisätty: ' + newComment, 5, false)
        } catch (exception) {
          console.log(exception)
          this.props.notify('Kommentin päivitys epäonnistui', 5, true)
        }
      }

      return (
        <div style={blogStyle}>
          <a onClick={this.toggleVisibility} className='blogTitleClickable'>{blog.title}</a>
          <div className='author'>Tekijä: {blog.author}</div>

          <div style={showWhenVisible} className='extraDetailsHidable'>
            <div>Likes: {blog.likes}</div>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>Added by: {blogUsername}</div>
            <button onClick={() => this.sendLike(blog)}>Like</button>
            <div style={showWhenUsersBlog}>
              <button onClick={() => this.sendDelete(blog)}>Remove</button>
            </div>
          </div>
          <div>
            <h2>comments</h2>
            <form onSubmit={sendComment}>
              <div>
                <input onChange={this.handleCommentFieldChange} type="text" />
              </div>
              <button type="submit">lähetä</button>
            </form>
            <Table striped>
              <tbody>
                {blog.comments.map(comment =>
                  <tr key={comment._id}>
                    <td>{comment.text}</td>
                  </tr>
                )}
              </tbody>

            </Table>
          </div>
        </div>
      )
    }
    else {
      return (<div>Blog not found. Typical for example if blog was just removed. </div>)
    }
  }
}


const mapStateToProps = (state) => {
  return {
    comment: state.comment,
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { notify, modifyComment, createComment, addLike, deleteBlog }
)(Blog)

