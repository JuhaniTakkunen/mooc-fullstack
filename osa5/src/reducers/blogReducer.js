import blogService from '../services/blogs'

const initialState = []

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'CREATE_BLOG':
    return [...store, action.content]
  case 'INIT_BLOGS':
    return action.data
  default:
    return store
  }
}

export const blogCreation = (content) => {
  return async (dispatch) => {
    console.log("whats up")

    const newBlog = await blogService.create({ likes: 0, ...content })
    dispatch({
      type: 'CREATE_BLOG',
      content: newBlog
    })
  }
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer