import React from 'react'
import {Query, Mutation} from 'react-apollo'
import {Row, Col, Card} from 'antd'

import {USER, UPDATE_USER} from '../../queries'
import EditUserForm from './EditUserForm'

function EditUser(props) {
  const token = localStorage.getItem('token')
  return (
    <React.Fragment>
      <Query query={USER} variables={{token}}>
        {({loading, error, data}) => {
          if (loading) return 'Loading...'
          if (error) return 'Something went wrong!'
          return (
            <Row style={{marginTop: '70px'}}>
              <Col span={7} offset={8}>
                <Card>
                  <Mutation
                    mutation={UPDATE_USER}
                    refetchQueries={[
                      {
                        query: USER,
                        variables: {token}
                      }
                    ]}
                  >
                    {updateUser => {
                      return (
                        <EditUserForm
                          {...props}
                          data={data}
                          updateUser={updateUser}
                        />
                      )
                    }}
                  </Mutation>
                </Card>
              </Col>
            </Row>
          )
        }}
      </Query>
    </React.Fragment>
  )
}

export default EditUser
