import React from 'react'
import {Form, Icon, Input, Button, Row, Col, Card, message} from 'antd'
import {Query} from 'react-apollo'
import {LIST_USERS} from '../queries'

class User extends React.Component {
  render() {
    return (
      <div>
        <Query query={LIST_USERS}>
          {({loading, error, data}) => {
            console.log('Data:', data)
            console.log('Error:', error)
            if (loading) return <div>Loadingg..</div>
            if (error) return <div>Something is wrong!</div>
            return (
              <div>
                {data.listUsers.map(user => (
                  <p>{user.name}</p>
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
