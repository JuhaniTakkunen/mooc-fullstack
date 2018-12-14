import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from './../reducers/loginReducer'
import { Navbar, NavItem, Nav, Button } from 'react-bootstrap'

class Header extends React.Component {

  logout = async () => {
    await window.localStorage.clear()
    await this.props.logoutUser()
  }

  isUserLogged = () => {
    return this.props.user && this.props.user.logged
  }

  render() {
    const onlyIfLoggedIn = { display: this.isUserLogged() ? '' : 'none' }
    return (
      <div>
        <Navbar>
          <Nav>
            <NavItem eventKey={1} href="/">blogs</NavItem>
            <NavItem eventKey={2} href="/users">users</NavItem>
          </Nav>

          <Navbar.Text pullRight>{this.isUserLogged() ? 'User: ' + this.props.user.name: 'User not logged in'}</Navbar.Text>
          <Navbar.Form pullRight>
            <Button type="button" onClick={this.logout} style={onlyIfLoggedIn}>logout</Button>
          </Navbar.Form>
        </Navbar>

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
)(Header)
