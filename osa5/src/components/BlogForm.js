import React from 'react'
import { connect } from 'react-redux'

import { notify } from './../reducers/notificationReducer'
import { setAny } from './../reducers/newBlogReducer'
import { blogCreation } from './../reducers/blogReducer'
import { Table } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import { FormGroup, ControlLabel, FormControl, Button, Form, Grid, Row, Col } from 'react-bootstrap'


class BlogList extends React.Component {

  addBlog = async (event) => {
    event.preventDefault()
    const newBlog = await this.props.blogCreation({ ...this.props.newBlog })
    this.props.notify('Uusi blogikirjoitus \'' + newBlog.title + '\' luotu, tekijältä: ' + newBlog.author, 10)
  }
  handleBlogChange = (event) => {
    this.props.setAny(event.target.name, event.target.value)
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={4}>

              <div className="blogForm">
                <h2>Create new blog</h2>
                <Form onSubmit={this.addBlog}>
                  <FormGroup>
                    <ControlLabel>title</ControlLabel>{' '}
                    <FormControl
                      type="text"
                      name="SET_TITLE"
                      onChange={this.handleBlogChange}
                    />
                  </FormGroup>{' '}
                  <FormGroup>

                    <ControlLabel>author</ControlLabel>{' '}
                    <FormControl
                      type="text"
                      name="SET_AUTHOR"
                      onChange={this.handleBlogChange}
                    />
                  </FormGroup>{' '}
                  <FormGroup>

                    <ControlLabel>url</ControlLabel>{' '}
                    <FormControl
                      type="text"
                      name="SET_URL"
                      onChange={this.handleBlogChange}
                    />
                  </FormGroup>{' '}
                  <Button type="submit">create</Button>
                </Form>
              </div>
            </Col>

          </Row>
          <hr />
          <Row>
            <Col xs={12}>

              <div>
                <h2>Blogs</h2>
                <Table striped>
                  <tbody>
                    {this.props.blogs.sort(function (a, b) { return b.likes - a.likes }).map(blog =>
                      <tr key={blog._id}>
                        <td><Link to={`/blogs/${blog._id}`}>{blog.title} by {blog.author}. Added by: {blog.user ? blog.user.name: 'anonymous'}</Link></td>
                      </tr>
                    )}
                  </tbody>

                </Table>
              </div>
            </Col>

          </Row>
        </Grid>

      </div >
    )
  }
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    newBlog: state.newBlog
  }

}

export default connect(
  mapStateToProps,
  { notify, setAny, blogCreation }
)(BlogList)



