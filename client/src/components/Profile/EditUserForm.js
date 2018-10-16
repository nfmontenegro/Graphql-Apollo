import React from 'react'
import {Button, Form, Icon, Input, message, Upload} from 'antd'

const FormItem = Form.Item

class EditUserForm extends React.Component {
  state = {
    _id: this.props.user._id,
    name: this.props.user.name,
    lastname: this.props.user.lastname,
    file: ''
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = async (event, updateUser) => {
    event.preventDefault()
    await updateUser({
      variables: this.state
    })

    message
      .success('User updated!')
      .then(() => this.props.history.push('/profile'))
  }

  render() {
    const props = {
      beforeUpload: file => {
        this.setState({file})
        return false
      },
      onRemove: () => {
        this.setState(prevState => ({...prevState, file: ''}))
      }
    }
    console.log('State:', this.state)
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
          <Upload name="avatar" listType="picture" {...props}>
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
        </FormItem>

        <FormItem>
          <Button
            style={{width: '100%'}}
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
