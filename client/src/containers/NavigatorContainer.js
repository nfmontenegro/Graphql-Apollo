import React from 'react'
import {Route} from 'react-router-dom'
import {Menu, Icon} from 'antd'

import {SignInFormContainer} from './SignInFormContainer'
import {HomeContainer} from './HomeContainer'
import {UserContainer} from './UserContainer'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export const NavigatorContainer = ({history}) => {
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
        <Menu.Item key="key" onClick={() => history.push('/signin')}>
          <Icon type="key" />
          Login
        </Menu.Item>
      </Menu>

      <Route exact path="/" component={HomeContainer} />
      <Route path="/signin" component={SignInFormContainer} />
      <Route path="/users" component={UserContainer} />
    </div>
  )
}
