import React from 'react'
import {Form, Icon, Input, Button, Row, Col, Card, message} from 'antd'
import {Mutation} from 'react-apollo'
import {SIGN_IN} from '../queries'

const FormItem = Form.Item

class SignInForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  onClose = () => {
    this.setState({email: 'nuevo@gmail.com'})
    console.log('On close!')
  }

  handleSubmit = async (event, payloadLoginUser) => {
    event.preventDefault()
    try {
      const {
        data: {
          payloadLoginUser: {token, user}
        }
      } = await payloadLoginUser({
        variables: this.state
      })

      localStorage.setItem('token', token)
      message
        .success(`Welcome ${user.name}`)
        .then(() => this.props.history.push('/'))
    } catch (err) {
      message.error(err.message)
    }
  }

  render() {
    return (
      <Row style={{marginTop: '70px'}}>
        <Col span={7} offset={8}>
          <Card>
            <Mutation mutation={SIGN_IN}>
              {payloadLoginUser => (
                <Form onSubmit={e => this.handleSubmit(e, payloadLoginUser)}>
                  <FormItem>
                    <Input
                      prefix={
                        <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />
                      }
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </FormItem>
                  <FormItem>
                    <Input
                      prefix={
                        <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />
                      }
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </FormItem>
                  <FormItem>
                    <Button
                      style={{width: '100%'}}
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Log in
                    </Button>
                  </FormItem>
                </Form>
              )}
            </Mutation>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default SignInForm
