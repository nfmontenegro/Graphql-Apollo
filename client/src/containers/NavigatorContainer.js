import React from 'react'
import {Route} from 'react-router-dom'
import {Menu, Icon} from 'antd'
import {withApollo} from 'react-apollo'

import {SignInFormContainer} from './SignInFormContainer'
import {HomeContainer} from './HomeContainer'
import {UserContainer} from './UserContainer'

import withAuth from '../HOC/withAuth'

const NavigatorContainer = ({history, client}) => {
  const logout = () => {
    client.resetStore()
    localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home" onClick={() => history.push('/')}>
          <Icon type="home" />
          Home
        </Menu.Item>
        <Menu.Item key="down" onClick={() => history.push('/users')}>
          <Icon type="down" />
          Users
        </Menu.Item>
        <Menu.Item key="login" onClick={() => history.push('/signin')}>
          <Icon type="login" />
          Login
        </Menu.Item>
        <Menu.Item key="logout" onClick={logout}>
          <Icon type="logout" />
          Logout
        </Menu.Item>
      </Menu>

      <Route exact path="/" component={HomeContainer} />
      <Route path="/signin" component={SignInFormContainer} />
      <Route path="/users" component={withAuth(UserContainer)} />
    </div>
  )
}

export default withApollo(NavigatorContainer)
