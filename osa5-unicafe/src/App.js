import React from 'react'
import store from './store'


const Statistiikka = () => {
  let state = store.getState();
  const palautteita = (state.good + state.ok + state.bad)

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }
  let avg = state.good / palautteita
  
  return (
    <div>
      <h2>stataistiikka</h2>
      <table>
        <tbody>
        <tr>
          <td>hyvä</td>
          <td>{state.good}</td>
        </tr>
        <tr>
          <td>neutraali</td>
          <td>{state.ok}</td>
        </tr>
        <tr>
          <td>huono</td>
          <td>{state.bad}</td>
        </tr>
        <tr>
          <td>hyviä</td>
          <td>{avg} %                                                                                                                                                                                                                                                                                                                                                                                                                </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}


class App extends React.Component {

  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
    console.log(store.getState())
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />

      </div>
    )
  }
}

export default App