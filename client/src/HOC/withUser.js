import React from 'react'
import {Spin} from 'antd'
import {Query} from 'react-apollo'

import {USER} from '../queries'

export default function withUser(WrappedComponent) {
  return class extends React.Component {
    render() {
      const token = localStorage.getItem('token')
      return (
        <Query query={USER} variables={{token}}>
          {({loading, data}) => {
            if (loading) return <Spin size="large" />
            return (
              <React.Fragment>
                <WrappedComponent {...this.props} user={data.user} />
              </React.Fragment>
            )
          }}
        </Query>
      )
    }
  }
}
