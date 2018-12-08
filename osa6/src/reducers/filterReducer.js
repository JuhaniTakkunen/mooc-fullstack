
const reducer = (state = '', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_FILTER':
    return action.text
  default:
    return state
  }
}

export const setFilter = (text) => {
  return {
    type: 'SET_FILTER',
    text
  }
}

export default reducer