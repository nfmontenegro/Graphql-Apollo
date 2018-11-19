import React from 'react'
import {Mutation} from 'react-apollo'
import {Row, Col, Card} from 'antd'

import {USER, UPDATE_USER, LIST_PUBLICATIONS} from '../../queries'
import UpdateMutation from '../Form/UpdateMutation'

import {WrapperForm} from '../../styled/'

function EditUser(props) {
  const {password, ...rest} = props.user
  return (
    <React.Fragment>
      <WrapperForm>
        <Row>
          <Col span={7} offset={8}>
            <Card>
              <Mutation
                mutation={UPDATE_USER}
                refetchQueries={() => [
                  {
                    query: USER,
                    variables: {token: props.token}
                  },
                  {
                    query: LIST_PUBLICATIONS
                  }
                ]}
              >
                {updateUser => {
                  return (
                    <UpdateMutation
                      data={rest}
                      mutation={updateUser}
                      router={props.history}
                    />
                  )
                }}
              </Mutation>
            </Card>
          </Col>
        </Row>
      </WrapperForm>
    </React.Fragment>
  )
}

export default EditUser
