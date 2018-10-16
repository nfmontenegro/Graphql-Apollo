import React from 'react'
import {compose} from 'recompose'
import {Form, Row, Col, Card, message} from 'antd'
import {Mutation} from 'react-apollo'

import {REGISTER_USER} from '../../queries'
import withForm from '../../HOC/withForm'

function RegisterForm({renderFields, fields, history}) {
  const onSubmit = async (event, submit) => {
    event.preventDefault()
    try {
      const {
        data: {
          registerUser: {name}
        }
      } = await submit({
        variables: fields
      })
      return message
        .success(`Successful registered ${name}`)
        .then(() => history.push('/signin'))
    } catch (err) {
      return message.error(`Email ${fields.email} exist`)
    }
  }

  return (
    <React.Fragment>
      <Mutation mutation={REGISTER_USER}>
        {registerUser => (
          <Row style={{marginTop: '70px'}}>
            <Col span={7} offset={8}>
              <Card>
                <Form onSubmit={event => onSubmit(event, registerUser)}>
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

const fields = {
  fieldTypes: [
    {type: 'user', name: 'name', placeholder: 'Name'},
    {type: 'user', name: 'lastname', placeholder: 'Last Name'},
    {type: 'inbox', name: 'email', placeholder: 'Email'},
    {type: 'lock', name: 'password', placeholder: 'Password'}
  ],
  buttonText: 'Register'
}

export default compose(withForm(fields))(RegisterForm)