import React from 'react'
import {
  Form,
  Icon,
  Input,
  Button,
  Spin,
  Upload,
  Row,
  Col,
  Card,
  message
} from 'antd'
import {uploadImage} from '../../services/aws'

import {WrapperForm} from '../../styled/'

const FormItem = Form.Item
const {TextArea} = Input

class CreateForm extends React.Component {
  state = {
    loading: false
  }

  onChange = event => {
    const {name, value, type} = event.target
    this.setState({
      [name]: type === 'number' ? parseInt(value, 10) : value
    })
  }

  onSubmit = async (event, mutation) => {
    event.preventDefault()
    try {
      this.setState({
        loading: true
      })

      let paramsUploadImage
      let imageUrl

      if (this.state.inputFile) {
        paramsUploadImage = {
          Body: this.state.inputFile,
          Bucket: process.env.REACT_APP_AWS_BUCKET,
          Key: `${new Date().getTime()}_${this.props.user._id}`,
          ContentType: this.state.inputFile.type
        }

        imageUrl = `https://${
          process.env.REACT_APP_AWS_BUCKET
        }.s3.amazonaws.com/${paramsUploadImage.Key} `
        await uploadImage(paramsUploadImage)
      }

      const {data} = await mutation({
        variables: {
          ...this.state,
          imageUrl: imageUrl ? imageUrl : '',
          file: paramsUploadImage ? paramsUploadImage.Key : '',
          user: this.props.user ? this.props.user._id : ''
        }
      })

      if (data.payloadLoginUser) {
        //Set token if signinForm
        localStorage.setItem('token', data.payloadLoginUser.token)
      }

      return message
        .success(this.props.message)
        .then(() => {
          if (this.props.route) {
            this.props.history.push(this.props.route)
          } else {
            this.cleanForm()
            this.setState({loading: false})
          }
        })
        .catch(err => console.log(err))
    } catch (err) {
      this.setState({loading: false})
      return message.error(err)
    }
  }

  beforeUpload = inputFile => {
    this.setState({inputFile})
    return false
  }

  onRemove = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        inputFile: ''
      }
    })
  }

  cleanForm = () => {
    this.setState({inputFile: ''})
    document.getElementById('create-form').reset()
  }

  render() {
    return (
      <React.Fragment>
        <WrapperForm>
          <Row>
            <Col span={8} offset={8}>
              <Card>
                <Form
                  id="create-form"
                  onSubmit={event => this.onSubmit(event, this.props.mutation)}
                >
                  {this.props.fields.map(({inputType, type, name}, index) => (
                    <FormItem
                      key={index}
                      label={name.charAt(0).toUpperCase() + name.slice(1)}
                    >
                      {inputType === 'textarea' ? (
                        <TextArea
                          type={inputType}
                          name={name}
                          placeholder={
                            name.charAt(0).toUpperCase() + name.slice(1)
                          }
                          onChange={this.onChange}
                        />
                      ) : inputType === 'text' ||
                        inputType === 'password' ||
                        inputType === 'number' ? (
                        <Input
                          prefix={
                            <Icon
                              type={type}
                              style={{color: 'rgba(0,0,0,.25)'}}
                            />
                          }
                          type={inputType}
                          name={name}
                          placeholder={
                            name.charAt(0).toUpperCase() + name.slice(1)
                          }
                          onChange={this.onChange}
                        />
                      ) : (
                        <Upload
                          name={name}
                          listType="picture"
                          onRemove={this.onRemove}
                          beforeUpload={this.beforeUpload}
                        >
                          <Button>
                            <Icon type={inputType} /> Click to upload
                          </Button>
                        </Upload>
                      )}
                    </FormItem>
                  ))}
                  <FormItem>
                    <Button
                      style={{width: '100%'}}
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? <Spin /> : this.props.buttonText}
                    </Button>
                  </FormItem>
                </Form>
              </Card>
            </Col>
          </Row>
        </WrapperForm>
      </React.Fragment>
    )
  }
}

export default CreateForm
