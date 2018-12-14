import blogService from '../services/blogs'

const initialState = []

const reducer = (store = initialState, action) => {
  let modifiedBlog = null

  switch (action.type) {
  case 'CREATE_BLOG':
    return [...store, action.content]
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_COMMENT':
    modifiedBlog = store.filter(a => a._id === action.blogId)[0]
    modifiedBlog.comments = modifiedBlog.comments.concat(action.comment)
    return store.filter(a => a._id !== action.blogId).concat(modifiedBlog)
  case 'ADD_LIKE':
    modifiedBlog = store.filter(a => a._id === action.blogId)[0]
    modifiedBlog.likes = modifiedBlog.likes === null ? 1 : modifiedBlog.likes + 1
    return store.filter(a => a._id !== action.blogId).concat(modifiedBlog)
  case 'DELETE_BLOG':
    return store.filter(a => a._id !== action.blogId)
  default:
    return store
  }
}

export const blogCreation = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ likes: 0, ...content })
    const newBlog2 = {
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
      user: newBlog.user,
      _id: newBlog._id
    }

    dispatch({
      type: 'CREATE_BLOG',
      content: newBlog2
    })
    return newBlog2
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

export const addLike = (blog) => {
  return async (dispatch) => {
    const blogObject = { ...blog }
    blogObject.likes = blogObject.likes === null ? 1 : blogObject.likes + 1
    const res = await blogService.update(blog._id, blogObject)
    dispatch({
      type: 'ADD_LIKE',
      blogId: blogObject._id
    })
    return {
      title: res.title,
      url: res.url,
      author: res.author,
      user: res.user,
      likes: res.likes,
      _id: res._id
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const res = await blogService.remove(blog._id)
    dispatch({
      type: 'DELETE_BLOG',
      blogId: blog._id
    })
    return {
      title: res.title ?  res.title : blog.title,
      url: res.url,
      author: res.author,
      user: res.user,
      _id: res._id
    }
  }
}

export default reducer