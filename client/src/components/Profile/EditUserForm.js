import React from 'react'
import {Button, Form, Icon, Input, message} from 'antd'

const FormItem = Form.Item
class EditUserForm extends React.Component {
  state = {
    _id: this.props.data.user._id,
    name: this.props.data.user.name,
    lastname: this.props.data.user.lastname
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
