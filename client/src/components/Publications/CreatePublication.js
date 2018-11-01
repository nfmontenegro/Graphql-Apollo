import React from 'react'
import {compose} from 'recompose'
import {Form, Row, Col, Card, message} from 'antd'
import {Mutation} from 'react-apollo'

import {uploadImage} from '../../services/aws'
import {CREATE_PUBLICATION, LIST_PUBLICATIONS} from '../../queries'
import withForm from '../../HOC/withForm'
import withUser from '../../HOC/withUser'

function CreatePublication({
  renderFields,
  fields,
  user,
  cleanFields,
  loadingForm,
  removeFile
}) {
  const onSubmit = async (event, submit) => {
    event.preventDefault()
    try {
      loadingForm()

      const paramsUploadImage = {
        Body: fields.inputFile,
        Bucket: process.env.REACT_APP_AWS_BUCKET,
        Key: `${new Date().getTime()}_${user._id}`,
        ContentType: fields.inputFile.type
      }

      await uploadImage(paramsUploadImage)

      await submit({
        variables: {
          ...fields,
          imageUrl: `https://${
            process.env.REACT_APP_AWS_BUCKET
          }.s3.amazonaws.com/${paramsUploadImage.Key}`,
          user: user._id
        }
      })

      return message
        .success(`Successful registered publication`)
        .then(() => {
          cleanFields()
          loadingForm()
          removeFile()
        })
        .catch(err => console.log('Err:', err))
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
    },
    {
      inputType: 'file',
      type: 'edit',
      name: 'image'
    }
  ],
  buttonText: 'Create'
}

export default compose(
  withUser,
  withForm(fields)
)(CreatePublication)
