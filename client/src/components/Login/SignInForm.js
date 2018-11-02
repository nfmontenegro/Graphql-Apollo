import React from 'react'
import {compose} from 'recompose'
import {Mutation} from 'react-apollo'

import {SIGN_IN} from '../../queries'
import CreateFrom from '../Form/CreateForm'

function SignInForm(props) {
  const fields = [
    {inputType: 'text', type: 'inbox', name: 'email', placeholder: 'Email'},
    {
      inputType: 'password',
      type: 'lock',
      name: 'password',
      placeholder: 'Password'
    }
  ]
  const buttonText = 'Sign In'

  return (
    <Mutation mutation={SIGN_IN}>
      {payloadLoginUser => (
        <CreateFrom
          {...props}
          fields={fields}
          buttonText={buttonText}
          route={'/'}
          message="Welcome!"
          mutation={payloadLoginUser}
        />
      )}
    </Mutation>
  )
}

export default compose()(SignInForm)
