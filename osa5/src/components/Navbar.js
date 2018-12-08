import React from 'react';
import { connect } from 'react-redux'
import { logoutUser } from './../reducers/loginReducer'
import { Link } from 'react-router-dom'


class Navbar extends React.Component {
  menuStyle = {
    background: 'grey',
    fontSize: 15,
  }

  logout = async () => {  // move me to login form
    await window.localStorage.clear()
    await this.props.logoutUser()
  }

  isUserLogged = () => {
    return this.props.user && this.props.user.logged
  }

  render() {
    const onlyIfLoggedOut = { display: this.isUserLogged() ? 'none' : '' }
    const onlyIfLoggedIn = { display: this.isUserLogged() ? '' : 'none' }
    console.log(this.props.user)
    console.log("============")
    return (
      <div style={this.menuStyle}>
        <Link to="/">blogs</Link>&nbsp;
        <Link to="/users">users</Link>&nbsp;
        <div style={onlyIfLoggedIn}><p>User: {this.props.user.name}</p></div>
        <div style={onlyIfLoggedOut}><p>User not logged in </p></div>

        <button onClick={this.logout} style={onlyIfLoggedIn}>logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps, 
  { logoutUser }
)(Navbar)
