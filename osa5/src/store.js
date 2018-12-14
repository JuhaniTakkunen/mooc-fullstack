import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import newBlogReducer from './reducers/newBlogReducer'
import loginReducer from './reducers/loginReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  users: userReducer,
  newBlog: newBlogReducer,
  user: loginReducer,
  comment: commentReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store