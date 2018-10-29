import React from 'react'
import {Spin, Row, Col} from 'antd'
import {Query} from 'react-apollo'
import {Redirect} from 'react-router-dom'

import {TOKEN} from '../queries'

export default function withAuth(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Query query={TOKEN}>
          {({loading, error}) => {
            if (loading)
              return (
                <Row style={{marginTop: '70px'}}>
                  <Col span={7} offset={11}>
                    <Spin size="large" />
                  </Col>
                </Row>
              )
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
