import React from 'react'
import {Form, Icon, Input, Button, Row, Col, Card, message} from 'antd'

const FormItem = Form.Item

class FormHOC extends React.Component {
  state = {}

  componentDidMount() {
    this.props.formFields.map(({name}) => this.setState({[name]: ''}))
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('HOC FORM!')
  }

  render() {
    return (
      <React.Fragment>
        <Row style={{marginTop: '70px'}}>
          <Col span={7} offset={8}>
            <Card>
              <Form onSubmit={e => this.handleSubmit(e)}>
                <FormItem>
                  {this.props.formFields.map(({type, name}, index) => (
                    <Input
                      key={index}
                      prefix={
                        <Icon type={type} style={{color: 'rgba(0,0,0,.25)'}} />
                      }
                      type={type}
                      name={name}
                      placeholder={name}
                      value={this.state[name]}
                      onChange={this.handleChange}
                    />
                  ))}
                </FormItem>
                <FormItem>
                  <Button
                    style={{width: '100%'}}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    {this.props.submitButton.text}
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default FormHOC
