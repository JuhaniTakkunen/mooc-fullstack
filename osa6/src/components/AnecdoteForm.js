import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'

import { connect } from 'react-redux'


class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.anecdoteCreation(content)

    this.props.notify('New anecdote created: ' + content, 5)

  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteCreation, notify }
)(AnecdoteForm)


