import React from 'react'
import {compose} from 'recompose'
import {Mutation} from 'react-apollo'

import {REGISTER_USER} from '../../queries'
import CreateFrom from '../Form/CreateForm'

function RegisterForm(props) {
  const fields = [
    {inputType: 'text', type: 'user', name: 'name'},
    {
      inputType: 'text',
      type: 'user',
      name: 'lastname'
    },
    {
      inputType: 'text',
      type: 'user',
      name: 'nickname'
    },
    {inputType: 'text', type: 'user', name: 'website'},
    {
      inputType: 'number',
      type: 'user',
      name: 'phoneNumber'
    },
    {inputType: 'text', type: 'inbox', name: 'email'},
    {
      inputType: 'password',
      type: 'lock',
      name: 'password'
    }
  ]
  const buttonText = 'Register'

  return (
    <React.Fragment>
      <Mutation mutation={REGISTER_USER}>
        {registerUser => (
          <CreateFrom
            fields={fields}
            buttonText={buttonText}
            route={'/login'}
            {...props}
            mutation={registerUser}
          />
        )}
      </Mutation>
    </React.Fragment>
  )
}

export default compose(RegisterForm)
