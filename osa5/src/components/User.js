import React from 'react'

import { Table } from 'react-bootstrap'


const User = ({ user }) => {

  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <div>has {user.blogs.length} blogs</div>
        <h2>Added blogs</h2>

        <Table striped>
          <tbody>
            {user.blogs.map(blog =>
              <tr key={blog._id}>
                <td><b>{blog.title}</b></td>
                <td>by:<i> {blog.author}</i></td>
              </tr>
            )}
          </tbody>

        </Table>
      </div>

    )
  }
  else {
    return (<div>No user found</div>)
  }
}

export default User