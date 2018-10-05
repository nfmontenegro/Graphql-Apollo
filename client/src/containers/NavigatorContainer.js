import React from 'react'
import {Route} from 'react-router-dom'
import {Menu, Icon} from 'antd'
import {withApollo, Query} from 'react-apollo'

import {SignInFormContainer} from './SignInFormContainer'
import {HomeContainer} from './HomeContainer'
import {UserContainer} from './UserContainer'
import {RegisterFormContainer} from './RegisterFormContainer'

import withAuth from '../HOC/withAuth'
import {USER} from '../queries'

const NavigatorContainer = ({history, client}) => {
  const logout = () => {
    client.resetStore()
    localStorage.removeItem('token')
    history.push('/signin')
  }

  const SubMenu = Menu.SubMenu
  const MenuItemGroup = Menu.ItemGroup

  const token = localStorage.getItem('token')
  return (
    <div>
      <Menu mode="horizontal">
        {token && (
          <Menu.Item key="home" onClick={() => history.push('/')}>
            <Icon type="home" />
            Home
          </Menu.Item>
        )}

        {token && (
          <Menu.Item key="down" onClick={() => history.push('/users')}>
            <Icon type="down" />
            Users
          </Menu.Item>
        )}

        {token && (
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Query query={USER} variables={{token: token}}>
                  {({loading, data: {user}}) => {
                    if (loading) return <Icon type="loading" />
                    return (
                      <div>
                        <Icon type="user" />
                        {user.name}
                      </div>
                    )
                  }}
                </Query>
              </span>
            }
          >
            <MenuItemGroup>
              <Menu.Item key="setting:1">Profile</Menu.Item>
              <Menu.Item key="logout" onClick={logout}>
                Logout
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        )}

        {!token && (
          <Menu.Item key="user" onClick={() => history.push('/register')}>
            <Icon type="user" />
            Register
          </Menu.Item>
        )}

        {!token && (
          <Menu.Item key="login" onClick={() => history.push('/signin')}>
            <Icon type="login" />
            Login
          </Menu.Item>
        )}
      </Menu>

      <Route exact path="/" component={HomeContainer} />
      <Route path="/signin" component={SignInFormContainer} />
      <Route path="/register" component={RegisterFormContainer} />
      <Route path="/users" component={withAuth(UserContainer)} />
    </div>
  )
}

export default withApollo(NavigatorContainer)
