import React from 'react'
import {Form, Icon, Input, Button, Spin} from 'antd'

const FormItem = Form.Item
const {TextArea} = Input

const withForm = ({fieldTypes, buttonText}) => WrappedComponent => {
  return class Form extends React.Component {
    state = {
      loading: false
    }

    onChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    }

    cleandFields = () => {
      document.getElementById('create-form').reset()
    }

    renderFields = () => (
      <div>
        {fieldTypes.map(({inputType, type, name, placeholder}, index) => (
          <FormItem key={index}>
            {inputType === 'textarea' ? (
              <TextArea
                type={inputType}
                name={name}
                placeholder={placeholder}
                onChange={this.onChange}
              />
            ) : (
              <Input
                prefix={<Icon type={type} style={{color: 'rgba(0,0,0,.25)'}} />}
                type={inputType}
                name={name}
                placeholder={placeholder}
                onChange={this.onChange}
              />
            )}
          </FormItem>
        ))}
        <FormItem>
          <Button
            style={{width: '100%'}}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {this.state.loading ? <Spin /> : buttonText}
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
          cleanFields={this.cleandFields}
        />
      )
    }
  }
}

export default withForm
