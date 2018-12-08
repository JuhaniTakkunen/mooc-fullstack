
const reducer = (state =  null, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return [action.text, action.isError]
  default:
    return state
  }
}

export const setNotification = (text) => {
  return {
    type: 'SET_NOTIFICATION',
    text
  }
}

export const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    text: null
  }
}

export const notify = (text, timeout, error) => {

  return async (dispatch) => {

    dispatch({
      type: 'SET_NOTIFICATION',
      text: text,
      isError: error
    })

    await setTimeout(() => dispatch(
      {
        type: 'SET_NOTIFICATION',
        text: null,
        isError: false
      }), timeout * 1000)


  }
}

export default reducer