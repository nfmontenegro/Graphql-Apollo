import React from 'react'
import {Query} from 'react-apollo'
import {Redirect} from 'react-router-dom'

import {TOKEN} from '../queries'

export default function withAuth(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Query query={TOKEN}>
          {({loading, error}) => {
            if (loading) return 'Loading..'
            if (error) return <Redirect to="/signin" />
            return (
              <React.Fragment>
                <WrappedComponent {...this.props} />
              </React.Fragment>
            )
          }}
        </Query>
      )
    }
  }
}
