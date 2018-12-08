
const reducer = (state =  'here be notifications', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.text
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
    text: ''
  }
}

export const notify = (text, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      text: text
    })

    await setTimeout(() => dispatch(
      {
        type: 'SET_NOTIFICATION',
        text: ''
      }), timeout * 1000)


  }
}

export default reducer