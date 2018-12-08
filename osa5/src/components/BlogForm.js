import React from 'react'
import { connect } from 'react-redux'

import { notify } from './../reducers/notificationReducer'
import { setAny } from './../reducers/newBlogReducer'
import { blogCreation } from './../reducers/blogReducer'
import { Table } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import blogService from './../services/blogs'


class BlogList extends React.Component {
    
    addBlog = (event) => {
        event.preventDefault()
        const newBlog = {...this.props.newBlog}
        this.props.blogCreation(newBlog)
        this.props.notify("Uusi blogikirjoitus '" + newBlog.title + "' luotu, tekijältä: " + newBlog.author, 10)
    }
    handleBlogChange = (event) => {
        this.props.setAny(event.target.name, event.target.value)
    }

    updateBlog = (blog) => {

        const blogObject = { user: blog.user, likes: blog.likes, author: blog.author, title: blog.title, url: blog.url, _id: blog._id }
        blogObject.likes = blogObject.likes === null ? 1 : blogObject.likes + 1

        blogService
            .update(blog._id, blogObject)
            .then(updateBlog => {
                this.setState({ blogs: this.props.blogs.filter(x => x._id !== blogObject._id) })
                return updateBlog
            })
            .then(updateBlog => {
                this.setState({
                    blogs: this.props.blogs.concat(blogObject)
                })
                return updateBlog
            })
            .then(updateBlog => { this.props.notify({ text: "Like lisätty kohteelle" + updateBlog.title + ", yhteensä: " + updateBlog.likes, error: false }) })
    }

    deleteBlog = (blog) => {

        if (window.confirm("Delete '" + blog.title + "' by " + blog.author + "?")) {
            blogService
                .remove(blog._id)
                .then(updateBlog => {
                    this.setState({ blogs: this.state.blogs.filter(x => x._id !== blog._id) })
                    return updateBlog
                })
                .then(updateBlog => { this.props.notify({ text: "Blogikirjoitus poistettu: " + updateBlog.title, error: false }) })
        }
    }

    //                     <Blog key={blog._id} blog={blog} addLikeHandle={this.updateBlog} removeHandle={this.deleteBlog} />

    render() {
        return (
            <div className="blogForm">
                <h2>blogs</h2>

                <div>
                    <h2>create new</h2>
                    <div>
                        <form onSubmit={this.addBlog}>
                            <div>
                                title
                                <input
                                    type="text"
                                    name="SET_TITLE"
                                    onChange={this.handleBlogChange}
                                />
                            </div>
                            <div>
                                author
                                <input
                                    type="text"
                                    name="SET_AUTHOR"
                                    onChange={this.handleBlogChange}
                                />
                            </div>
                            <div>
                                url
                                <input
                                    type="text"
                                    name="SET_URL"
                                    onChange={this.handleBlogChange}
                                />
                            </div>
                            <button>create</button>
                        </form>
                    </div>
                </div>

                <div>

                <h2>Blogs</h2>
                <Table striped>
                    <tbody>
                        {this.props.blogs.sort(function (a, b) { return b.likes - a.likes }).map(blog =>
                            <tr key={blog._id}>
                                <td><Link to={`/blogs/${blog._id}`}>{blog.title} by {blog.author}</Link></td>
                            </tr>
                        )}
                    </tbody>

                </Table>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return { 
        blogs: state.blogs, 
        newBlog: state.newBlog
    }

}

export default connect(
    mapStateToProps,
    { notify, setAny, blogCreation }
)(BlogList)



