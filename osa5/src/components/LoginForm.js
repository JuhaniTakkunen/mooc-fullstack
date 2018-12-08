import React from 'react'
import { connect } from 'react-redux'

import { notify } from './../reducers/notificationReducer'
import { loginUser, setCredential, resetCredentials, setToken } from './../reducers/loginReducer'

class LoginForm extends React.Component {


  handleLoginFieldChange = (event) => {
    this.props.setCredential(event.target.name, event.target.value)
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const newUser = await this.props.loginUser({
        username: this.props.user.username,
        password: this.props.user.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify({ ...newUser, password: '' } ))  // reset password just in case
      await this.props.setToken(newUser)
      console.log(newUser)
      console.log("--------------")
      this.props.resetCredentials()
    } catch (exception) {
      console.log(exception)
      this.props.notify( 'käyttäjätunnus tai salasana virheellinen', 5, true )

      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    return (
      <div className="loginForm">
        <h2>Kirjaudu sovellukseen</h2>
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="SET_USERNAME"
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="SET_PASSWORD"
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return { 
      user: state.user 
  }
}

export default connect(
  mapStateToProps,
  { notify, loginUser, setToken, setCredential, resetCredentials }
)(LoginForm)