import React from 'react'
import {compose} from 'recompose'
import {Form, Row, Col, Card, message} from 'antd'
import {Mutation} from 'react-apollo'
import {SIGN_IN} from '../queries'

import withForm from '../HOC/withForm'

function SignInForm({renderFields, fields, history}) {
  const onSubmit = async (event, submit) => {
    event.preventDefault()
    try {
      const {
        data: {
          payloadLoginUser: {token, user}
        }
      } = await submit({
        variables: fields
      })

      localStorage.setItem('token', token)
      return message
        .success(`Welcome ${user.name}`)
        .then(() => history.push('/'))
    } catch (err) {
      return message.error(err.message)
    }
  }

  return (
    <React.Fragment>
      <Mutation mutation={SIGN_IN}>
        {payloadLoginUser => (
          <Row style={{marginTop: '70px'}}>
            <Col span={7} offset={8}>
              <Card>
                <Form onSubmit={e => onSubmit(e, payloadLoginUser)}>
                  {renderFields()}
                </Form>
              </Card>
            </Col>
          </Row>
        )}
      </Mutation>
    </React.Fragment>
  )
}

const fields = [
  {type: 'inbox', name: 'email', placeholder: 'Email'},
  {type: 'lock', name: 'password', placeholder: 'Password'}
]

export default compose(withForm(fields))(SignInForm)
