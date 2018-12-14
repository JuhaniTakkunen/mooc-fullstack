import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Table, Grid, Row, Col, Button, Navbar, NavItem, Nav } from 'react-bootstrap'

const Notifications = ({ message }) => {

  const successStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    border: 2,
    borderColor: 'green',
    borderStyle: 'dotted ',
    margin: 10
  }

  if (message === null) {
    return (
      <div className="notification" />)
  } else {
    return (
      <div className="notification" style={successStyle} >
        {message}
      </div>
    )
  }
};

const Menu = ({ notification }) => {

  return (
    <div>
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Mainpage</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/create">create new</NavItem>
            <NavItem eventKey={2} href="/about">about</NavItem>
          </Nav>
        </Navbar>
      </div>

      <div>
        <Notifications message={notification} />
      </div>
    </div>

  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped bordered condensed hover>
      <tbody>

        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>
              {anecdote.author}
            </td>
          </tr>
        )}
      </tbody>

    </Table>
  </div>
  )
      

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>

      <div><br /></div>
      <div></div>
    </div>
  )}
      
  const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <Grid>
          <Row className="show-grid">
          <Col xs={12} md={8}>

            <p>According to Wikipedia:</p>

            <em>An anecdote is a brief, revealing account of an individual person or an incident.
              Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
              such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
              An anecdote is "a story with a point."</em>
            </Col>

            <Col xs={6} md={4}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/250px-Ada_Lovelace_portrait.jpg" alt="Ada Lovelace" />
              <br/>Kuva: Ada Lovelace, lähde: Wikipedia
            </Col>
          </Row>

      </Grid>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </div>
      )
      
      const Footer = () => (
  <div>
        Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
    
    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
      )
      
class CreateNew extends React.Component {
    constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
        console.log(e.target.name, e.target.value)
    this.setState({[e.target.name]: e.target.value })
    }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <Grid>
            <Row className="show-grid">
              <Col xs={2} md={2}>content</Col>
              <Col xs={3} md={3}>
                <input name='content' value={this.state.content} onChange={this.handleChange} />
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={2} md={2}>author</Col>
              <Col xs={3} md={3}><input name='author' value={this.state.author} onChange={this.handleChange} /></Col>
            </Row>
            <Row className="show-grid">
              <Col xs={2} md={2}>url for more info</Col>
              <Col xs={3} md={3}><input name='info' value={this.state.info} onChange={this.handleChange} /></Col>
            </Row>
          </Grid>
          <Button bsStyle="primary">create</Button>

        </form>
      </div>
    )

  }
}

class App extends React.Component {
        constructor() {
      super()
  
    this.state = {
        anecdotes: [
        {
        content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
        {
        content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ],
  notification: null
}
}

  addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState(
      {
        anecdotes: this.state.anecdotes.concat(anecdote),
      notification: 'a new anecdote: ' + anecdote.content,
    }
  )
    setTimeout(() => {
        this.setState({ notification: null })
      }, 10000)
    }
  
    anecdoteById = (id) =>
      this.state.anecdotes.find(a => a.id === id)
  
  vote = (id) => {
    const anecdote = this.anecdoteById(id)
  
    const voted = {
        ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({anecdotes})
    }
  
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu notification={this.state.notification} />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            <Route exact path="/about" render={() => <About />} />

            <Route path="/create" render={() =>
              this.state.notification
                ? <Redirect to="/" />
                : <CreateNew addNew={this.addNew} />
            } />

            <Footer />
          </div>
        </Router>

      </div>
      );
    }
  }
  
  export default App;
