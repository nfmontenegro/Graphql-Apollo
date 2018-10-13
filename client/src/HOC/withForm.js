import React from 'react'
import {Form, Icon, Input, Button} from 'antd'

const FormItem = Form.Item

const withForm = ({fieldTypes, buttonText}) => WrappedComponent => {
  return class Form extends React.Component {
    state = {}

    onChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    }

    renderFields = () => (
      <div>
        {fieldTypes.map(({type, name, placeholder}, index) => (
          <FormItem key={index}>
            <Input
              prefix={<Icon type={type} style={{color: 'rgba(0,0,0,.25)'}} />}
              type={name}
              name={name}
              placeholder={placeholder}
              onChange={this.onChange}
            />
          </FormItem>
        ))}
        <FormItem>
          <Button
            style={{width: '100%'}}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {buttonText}
          </Button>
        </FormItem>
      </div>
    )

    render() {
      return (
        <WrappedComponent
          {...this.props}
          renderFields={this.renderFields}
          fields={this.state}
        />
      )
    }
  }
}

export default withForm
