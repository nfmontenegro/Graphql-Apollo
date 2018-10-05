import React from 'react'
import FormHoc from '../HOC/FormHoc'

class RegisterForm extends React.Component {
  state = {
    formFields: [
      {
        type: 'user',
        name: 'name'
      },
      {
        type: 'user',
        name: 'lastname'
      },
      {
        type: 'user',
        name: 'email'
      },
      {
        type: 'lock',
        name: 'password'
      }
    ],
    submitButton: {
      text: 'Register'
    }
  }

  render() {
    return <FormHoc {...this.state} />
  }
}

export default RegisterForm
