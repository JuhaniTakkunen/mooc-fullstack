import loginService from '../services/login'
import blogService from '../services/blogs'


const reducer = (store = { logged: false }, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return { ...store, ...action.user, logged: true }
  case 'SET_USERNAME':
    return { ...store, usernameInput: action.text }
  case 'SET_PASSWORD':
    return { ...store, passwordInput: action.text }
  case 'RESET_CREDENTIALS':
    return { ...store, passwordInput: '', usernameInput: '' }
  case 'SET_TOKEN':
    return { ...store, token: action.token, logged: true, username: action.username, name: action.name }
  case 'LOGOUT_USER':
    return { logged: false }
  default:
    return store
  }
}
export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    dispatch({
      type: 'LOGIN_USER',
      user: user
    })
    return user
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export const resetCredentials = () => {
  return (dispatch) => {
    dispatch({
      type: 'RESET_CREDENTIALS'
    })
  }
}

export const setCredential = (type, text) => {
  return (dispatch) => {
    dispatch({
      type: type,
      text: text
    })
  }
}

export const setToken = (user) => {
  blogService.setToken(user.token)
  return (dispatch) => {
    dispatch({
      type: 'SET_TOKEN',
      token: user.token,
      username: user.username,
      name: user.name
    })
  }
}
export default reducer