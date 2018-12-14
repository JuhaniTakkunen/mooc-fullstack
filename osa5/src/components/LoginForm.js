import React from 'react'
import { connect } from 'react-redux'

import { notify } from './../reducers/notificationReducer'
import { loginUser, setCredential, resetCredentials, setToken } from './../reducers/loginReducer'
import { FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap'


class LoginForm extends React.Component {


  handleLoginFieldChange = (event) => {
    this.props.setCredential(event.target.name, event.target.value)
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const newUser = await this.props.loginUser({
        username: this.props.user.usernameInput,
        password: this.props.user.passwordInput
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify({ ...newUser, passwordInput: '' }))  // reset password just in case
      await this.props.setToken(newUser)
      this.props.resetCredentials()
    } catch (exception) {
      console.log(exception)
      this.props.notify('käyttäjätunnus tai salasana virheellinen', 5, true)

      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    return (
      <div className="loginForm">
        <h2>Kirjaudu sovellukseen</h2>
        <Form inline onSubmit={this.login}>
          <FormGroup>
            <ControlLabel>käyttäjätunnus</ControlLabel>{' '}
            <FormControl
              type="text"
              autoComplete="username"
              name="SET_USERNAME"
              onChange={this.handleLoginFieldChange}
            />
          </FormGroup>{' '}
          <FormGroup>
            <ControlLabel>salasana</ControlLabel>{' '}
            <FormControl
              type="password"
              name="SET_PASSWORD"
              autoComplete="current-password"
              onChange={this.handleLoginFieldChange}
            />{' '}
            <Button type="submit">kirjaudu</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { notify, loginUser, setToken, setCredential, resetCredentials }
)(LoginForm)