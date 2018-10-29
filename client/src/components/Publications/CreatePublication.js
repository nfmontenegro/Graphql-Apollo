import React from 'react'
import {compose} from 'recompose'
import {Form, Row, Col, Card, message} from 'antd'
import {Mutation} from 'react-apollo'

import {CREATE_PUBLICATION, LIST_PUBLICATIONS} from '../../queries'
import withForm from '../../HOC/withForm'
import withUser from '../../HOC/withUser'

function CreatePublication({renderFields, fields, user, cleanFields}) {
  const onSubmit = async (event, submit) => {
    event.preventDefault()
    try {
      fields.loading = true
      await submit({
        variables: {...fields, user: user._id}
      })

      return message.success(`Successful registered publication`).then(() => {
        cleanFields()
        fields.loading = false
      })
    } catch (err) {
      return message.error(`Error ${err}`)
    }
  }

  return (
    <React.Fragment>
      <Mutation
        mutation={CREATE_PUBLICATION}
        refetchQueries={() => [
          {
            query: LIST_PUBLICATIONS
          }
        ]}
      >
        {registerUser => (
          <Row style={{marginTop: '70px'}}>
            <Col span={7} offset={8}>
              <Card>
                <Form
                  onSubmit={event => onSubmit(event, registerUser)}
                  id="create-form"
                >
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
    {inputType: 'text', type: 'edit', name: 'title', placeholder: 'Title'},
    {
      inputType: 'text',
      type: 'edit',
      name: 'description',
      placeholder: 'Description'
    },
    {
      inputType: 'textarea',
      type: 'edit',
      name: 'content',
      placeholder: 'Content'
    }
  ],
  buttonText: 'Create'
}

export default compose(
  withUser,
  withForm(fields)
)(CreatePublication)
