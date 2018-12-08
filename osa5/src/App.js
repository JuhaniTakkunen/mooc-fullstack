import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Navbar from './components/Navbar'
import Notifications from './components/Notifications'

import { blogInitialization } from './reducers/blogReducer'
import { userInitialization } from './reducers/userReducer'
import { setToken } from './reducers/loginReducer'
import { logoutUser } from './reducers/loginReducer'

import { notify } from './reducers/notificationReducer'


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.blogInitialization()
    this.props.userInitialization()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.token)
        this.props.setToken(user)
      console.log("-----------")
      console.log(user)
    }
  }

  loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  )

  blogForm = () => (
    <div>
      <BlogForm />
    </div>
  )

  entityById = (entityid, entity) => {
    if (entity) {
      return entity.find(a => a._id === entityid)
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <h1>Blog applikaatio</h1>
            <Navbar />
            <Notifications />

            <Route exact path="/" render={() =>
              (this.props.user === null || typeof this.props.user === "undefined" || this.props.user.logged === false) ?
                this.loginForm() :
                this.blogForm()
            } />

            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({ match }) => <User user={this.entityById(match.params.id, this.props.users)} />} />
            <Route exact path="/blogs/:id" render={({ match }) => <Blog blog={this.entityById(match.params.id, this.props.blogs)} />} />

          </div>

        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user, 
    users: state.users, 
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { blogInitialization, userInitialization, notify, logoutUser, setToken }
)(App)