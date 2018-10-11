import React from 'react'
import {Switch, Route} from 'react-router-dom'

import UserProfile from '../components/Profile/UserProfile'
import EditUser from '../components/Profile/EditUser'

function ProfileContainer(props) {
  return (
    <React.Fragment>
      <Route exact path="/profile" render={() => <UserProfile {...props} />} />
      <Route path="/profile/user/:id" render={() => <EditUser {...props} />} />
    </React.Fragment>
  )
}

export default ProfileContainer
