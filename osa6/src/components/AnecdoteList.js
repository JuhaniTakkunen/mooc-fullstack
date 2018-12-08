import React from 'react'
import { voteCreation } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  handleSubmit = async (e) => {

    this.props.voteCreation(e)
    this.props.notify('Vote iacta est: ' + e.content, 10)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter  />

        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleSubmit(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  // https://stackoverflow.com/questions/177719/case-insensitive-search
  let filterText = filter.toLowerCase()
  return anecdotes.filter(
    anecdote => anecdote.content.toLowerCase().includes(filterText))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { voteCreation, notify }
)(AnecdoteList)



