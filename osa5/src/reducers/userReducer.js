import userService from '../services/users'

const initialState = []

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'CREATE_USER':
    return [...store, action.content]
  case 'INIT_USERS':
    return action.data
  default:
    return store
  }
}

export const userCreation = (content) => {
  return async (dispatch) => {
    const newBlog = await userService.create(content)
    dispatch({
      type: 'CREATE_USER',
      content: newBlog
    })
  }
}

export const userInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default reducer