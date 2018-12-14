
const reducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_TITLE':
    return { title: action.text, author: state.author, url: state.url }
  case 'SET_AUTHOR':
    return { author: action.text, title: state.title, url: state.url }
  case 'SET_URL':
    return { url: action.text, title: state.title, author: state.author }
  default:
    return state
  }
}

export const setTitle = (text) => {
  return {
    type: 'SET_TITLE',
    text
  }
}

export const setAuthor = (text) => {
  return {
    type: 'SET_AUTHOR',
    text
  }
}

export const setUrl = (text) => {
  return {
    type: 'SET_URL',
    text
  }
}


export const setAny = (type, text) => {
  return (dispatch) => {
    dispatch({
      type: type,
      text: text
    })
  }
}

export default reducer