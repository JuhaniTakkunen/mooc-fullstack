import React from 'react';


class App extends React.Component {

  addVote = (id) => () => {
    this.props.store.dispatch({ type: 'vote', data: { id } })
  }
  addNew = (event) => {
    event.preventDefault();
    console.log("pressed!")
    const content = event.target.anecdote.value

    if (content) {
      this.props.store.dispatch({ type: 'add', data: { content: content } })
      event.target.anecdote.value = ''
    } else {
      window.alert("Cannot send empty")
    }
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addNew}>
          <div><input name="anecdote" /></div>
          <button type="submit">create new</button>
        </form>
      </div>
    )
  }
}

export default App