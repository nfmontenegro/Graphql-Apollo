import React from 'react'
import {Query} from 'react-apollo'
import {LIST_USERS} from '../queries'

class User extends React.Component {
  render() {
    return (
      <div>
        <Query query={LIST_USERS}>
          {({loading, error, data}) => {
            if (loading) return <div>Loadingg..</div>
            if (error) return null
            return (
              <div>
                {data.listUsers.map((user, i) => (
                  <p key={i}>{user.name}</p>
                ))}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default User
