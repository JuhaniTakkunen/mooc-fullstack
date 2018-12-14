import commentService from '../services/comments'

const reducer = (store = '', action) => {
  switch (action.type) {
  case 'MODIFY_COMMENT':
    return action.text
  case 'ADD_COMMENT':
    return ''
  default:
    return store
  }
}

export const createComment = (content) => {
  return async (dispatch) => {
    const newComment = await commentService.create({ content })
    dispatch({
      type: 'ADD_COMMENT',  // also triggers blogReducer
      comment: newComment,
      blogId: content.id
    })
  }
}

export const modifyComment = (content) => {
  return async (dispatch) => {
    dispatch({
      type: 'MODIFY_COMMENT',
      text: content
    })
  }
}

export default reducer