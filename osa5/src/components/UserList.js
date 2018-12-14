import React from 'react'
import { connect } from 'react-redux'
import { notify } from './../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


class UserList extends React.Component {

  render() {
    return (
      <div>

        <h2>Users</h2>
        <Table striped>
          <tbody>
            {this.props.users.map(user =>
              <tr key={user._id}>
                <td><Link to={`/users/${user._id}`}>{user.name}</Link></td>
                <td>has {user.blogs.length} blogs. </td>
              </tr>
            )}
          </tbody>

        </Table>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return { users: state.users }

}

export default connect(
  mapStateToProps,
  { notify }
)(UserList)



