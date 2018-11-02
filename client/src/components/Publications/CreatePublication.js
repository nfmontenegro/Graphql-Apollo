import React from 'react'
import {compose} from 'react-apollo'
import {Mutation} from 'react-apollo'

import {CREATE_PUBLICATION, LIST_PUBLICATIONS} from '../../queries'
import CreateFrom from '../Form/CreateForm'
import withUser from '../../HOC/withUser'

function CreatePublication(props) {
  const fields = [
    {inputType: 'text', type: 'edit', name: 'title'},
    {
      inputType: 'text',
      type: 'edit',
      name: 'description'
    },
    {
      inputType: 'textarea',
      type: 'edit',
      name: 'content'
    },
    {
      inputType: 'file',
      type: 'edit',
      name: 'image'
    }
  ]
  const buttonText = 'Create'

  return (
    <Mutation
      mutation={CREATE_PUBLICATION}
      refetchQueries={() => [
        {
          query: LIST_PUBLICATIONS
        }
      ]}
    >
      {createPublication => (
        <CreateFrom
          {...props}
          fields={fields}
          buttonText={buttonText}
          mutation={createPublication}
          message="Success Register Publication!"
        />
      )}
    </Mutation>
  )
}

export default compose(withUser)(CreatePublication)
