import React from 'react'
import Notifications from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: "",
      password: ""
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser') 

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      this.showMessage({ msg: this.state.error, iserr: true })

      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async () => {
    await window.localStorage.clear()
    console.log(this.state.user)
    await this.setState({ user: null })
    console.log(this.state.user)
    console.log(this.state)
  }

  loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        visible={this.state.visible}
        username={this.state.username}
        password={this.state.password}
        handleChange={this.handleLoginFieldChange}
        handleSubmit={this.login}
      />
    </Togglable>
  )

  showMessage = (props) => {
    this.setState({
      statusMessage: props.msg,
      isError: props.iserr
    });
    setTimeout(() => {
      this.setState({ statusMessage: null })
    }, 5000)
  };

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = { ...this.state.newBlog }
    console.log(blogObject)

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: null
        })
        return newBlog
      })
      .then(newBlog => { this.showMessage({ msg: "Uusi blogikirjoitus" + newBlog.title + "luotu, tekijältä" + newBlog.author, iserr: false }) })
  }

  updateBlog = (blog) => {
    console.log("wii")
    console.log(blog)
    

    const blogObject = { user: blog.user, likes: blog.likes, author: blog.author, title: blog.title, url: blog.url, _id: blog._id }
    blogObject.likes = blogObject.likes === null ? 1 : blogObject.likes + 1
    console.log(blogObject)

    blogService
      .update(blog._id, blogObject)
      .then(updateBlog => {
            this.setState({blogs: this.state.blogs.filter(x => x._id !== blogObject._id)}) 
            console.log("waa")
            console.log(updateBlog)
            return updateBlog
        })
      .then(updateBlog => {
        this.setState({
          blogs: this.state.blogs.concat(blogObject)
        })
        console.log("woo")
        console.log(updateBlog)
        return updateBlog
      })
      .then(updateBlog => { this.showMessage({ msg: "Like lisätty kohteelle" + updateBlog.title + ", yhteensä: " + updateBlog.likes, iserr: false }) })
  }

  deleteBlog = (blog) => {

    if (window.confirm("Delete '" + blog.title + "' by " + blog.author + "?"))
      {
      blogService
        .remove(blog._id)
        .then(updateBlog => {
              this.setState({blogs: this.state.blogs.filter(x => x._id !== blog._id)}) 
              console.log("wafeafaefa")
              console.log(updateBlog)
              return updateBlog
          })
        .then(updateBlog => { this.showMessage({ msg: "Blogikirjoitus poistettu: " + updateBlog.title, iserr: false }) })
    }
  }

  handleBlogChange = (event) => {
    this.setState({ newBlog: { ...this.state.newBlog, [event.target.name]: event.target.value } })
  }

  blogForm = () => (
    <div>
      <p>{this.state.user.name} logged in</p>
      <button onClick={this.logout}>logout</button>
        <BlogForm
          onSubmit={this.addBlog}
          value={this.state.newNote}
          handleChange={this.handleBlogChange}
          blogs={this.state.blogs}
          addLikeHandle={this.updateBlog}
          removeHandle={this.deleteBlog}
        />
    </div>


  );

  render() {
    return (
      <div>
        <Notifications message={this.state.statusMessage} isError={this.state.isError} />
        {
          this.state.user === null ?
            this.loginForm() :
            this.blogForm()

        }
      </div>
    )
  }
}
export default App