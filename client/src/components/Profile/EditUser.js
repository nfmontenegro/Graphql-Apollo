import React from 'react'
import {Mutation} from 'react-apollo'
import {Row, Col, Card} from 'antd'

import {USER, UPDATE_USER, LIST_PUBLICATIONS} from '../../queries'
import EditUserForm from './EditUserForm'

function EditUser(props) {
  const token = localStorage.getItem('token')
  return (
    <React.Fragment>
      <Row style={{marginTop: '70px'}}>
        <Col span={7} offset={8}>
          <Card>
            <Mutation
              mutation={UPDATE_USER}
              refetchQueries={() => [
                {
                  query: USER,
                  variables: {token}
                },
                {
                  query: LIST_PUBLICATIONS
                }
              ]}
            >
              {updateUser => {
                return <EditUserForm {...props} updateUser={updateUser} />
              }}
            </Mutation>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default EditUser
