import React from 'react'
import {Button, Form, Icon, Input, message, Upload} from 'antd'
import {uploadImage} from '../../services/aws'

const FormItem = Form.Item

class EditUserForm extends React.Component {
  state = {
    _id: this.props.user._id,
    name: this.props.user.name,
    lastname: this.props.user.lastname,
    nickname: this.props.user.nickname || '',
    website: this.props.user.website || '',
    phoneNumber: this.props.user.phoneNumber || '',
    imageUrl: this.props.user.imageUrl,
    file: this.props.user.file
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onChangeFile = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  }

  onSubmit = async (event, updateUser) => {
    try {
      event.preventDefault()
      this.setState({loading: true})

      const options = {
        Body: this.state.file,
        Bucket: process.env.REACT_APP_AWS_BUCKET,
        Key: `${new Date().getTime()}_${this.state._id}`,
        ContentType: this.state.file.type
      }

      await uploadImage(options)

      this.setState(
        {
          file: options.Key,
          imageUrl: `https://${process.env.REACT_APP_AWS_BUCKET}.s3.amazonaws.com/${options.Key}`
        },
        async () => {
          await updateUser({
            variables: this.state
          })

          message
            .success('User updated!')
            .then(() => this.props.history.push('/profile'))
            .catch(err => console.log(err))
        }
      )
    } catch (err) {
      console.log('Error:', err)
      return null
    }
  }

  render() {
    const props = {
      beforeUpload: file => {
        this.setState({file})
        return false
      },
      onRemove: () => {
        this.setState(prevState => ({
          ...prevState,
          file: ''
        }))
      }
    }

    return (
      <Form onSubmit={event => this.onSubmit(event, this.props.updateUser)}>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.lastname}
            name="lastname"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.nickname}
            name="nickname"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.website}
            name="website"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.phoneNumber}
            name="phoneNumber"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Upload name="avatar" listType="picture" {...props}>
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
        </FormItem>

        <FormItem>
          <Button
            style={{width: '100%'}}
            loading={this.state.loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Update
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default EditUserForm
