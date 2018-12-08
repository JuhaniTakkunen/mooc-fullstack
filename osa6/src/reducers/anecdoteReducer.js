import anecdoteService from '../services/anecdotes'

const initialState = []

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'VOTE': {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  case 'CREATE':
    return [...store, action.content]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return store
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      content: newAnecdote
    })
  }
}

export const voteCreation = (content) => {
  return async (dispatch) => {
    const modifiedAnecdote = await anecdoteService.addVote(content)
    dispatch({
      type: 'VOTE',
      id: modifiedAnecdote.id
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer