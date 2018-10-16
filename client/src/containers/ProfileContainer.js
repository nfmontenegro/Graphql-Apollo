import React from 'react'
import {Route} from 'react-router-dom'
import UserProfile from '../components/Profile/UserProfile'
import EditUser from '../components/Profile/EditUser'

import withUser from '../HOC/withUser'

function ProfileContainer(props) {
  return (
    <React.Fragment>
      <Route exact path="/profile" render={() => <UserProfile {...props} />} />
      <Route path="/profile/user/:id" render={() => <EditUser {...props} />} />
    </React.Fragment>
  )
}

export default withUser(ProfileContainer)
