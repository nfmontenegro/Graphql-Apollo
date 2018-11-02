import React, {Suspense, lazy} from 'react'
import {compose} from 'recompose'
import {Route, Switch, withRouter} from 'react-router-dom'
import {Avatar, Menu, Icon, Spin, Row, Col} from 'antd'
import {withApollo, Query} from 'react-apollo'

import withAuth from '../HOC/withAuth'
import {USER} from '../queries'

const SignInFormContainer = lazy(() => import('./SignInFormContainer'))
const ProfileContainer = lazy(() => import('./ProfileContainer'))
const HomeContainer = lazy(() => import('./HomeContainer'))
const PublicationContainer = lazy(() => import('./PublicationContainer'))
const RegisterFormContainer = lazy(() => import('./RegisterFormContainer'))

function WaitingComponent(Component) {
  return props => (
    <Suspense
      fallback={
        <Row style={{marginTop: '200px'}}>
          <Col span={8} offset={11}>
            <Spin size="large" />
          </Col>
        </Row>
      }
    >
      <Component {...props} />
    </Suspense>
  )
}

const NavigatorContainer = ({history, client}) => {
  const logout = () => {
    client.resetStore()
    localStorage.removeItem('token')
    history.push('/')
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
          <Menu.Item key="edit" onClick={() => history.push('/publications')}>
            <Icon type="edit" />
            Publications
          </Menu.Item>
        )}

        {token && (
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Query query={USER} variables={{token: token}}>
                  {({loading, data: {user}}) => {
                    if (loading) return <Spin size="large" />
                    return (
                      <div>
                        <Avatar
                          src={user.imageUrl}
                          size="small"
                          style={{marginRight: '5px'}}
                        />
                        {user.name}
                      </div>
                    )
                  }}
                </Query>
              </span>
            }
          >
            <MenuItemGroup>
              <Menu.Item
                key="setting:1"
                onClick={() => history.push('/profile')}
              >
                Profile
              </Menu.Item>
              <Menu.Item key="logout" onClick={logout}>
                Logout
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        )}

        {!token && (
          <Menu.Item key="home" onClick={() => history.push('/')}>
            <Icon type="home" />
            Home
          </Menu.Item>
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
      <Switch>
        <Route exact path="/" component={WaitingComponent(HomeContainer)} />
        <Route
          path="/signin"
          component={WaitingComponent(SignInFormContainer)}
        />
        <Route
          path="/register"
          component={WaitingComponent(RegisterFormContainer)}
        />
        <Route
          path="/publications"
          component={WaitingComponent(withAuth(PublicationContainer))}
        />
        <Route
          path="/profile"
          component={WaitingComponent(withAuth(ProfileContainer))}
        />
      </Switch>
    </div>
  )
}

export default compose(
  withRouter,
  withApollo
)(NavigatorContainer)
