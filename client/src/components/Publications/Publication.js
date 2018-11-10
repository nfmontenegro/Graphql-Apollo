import React from 'react'
import {Row, Col, Card} from 'antd'
import {Query, Mutation} from 'react-apollo'
import {compose} from 'recompose'

import {
  LIST_PUBLICATIONS,
  LIST_PUBLICATION,
  UPDATE_PUBLICATION
} from '../../queries'
import UpdateMutation from '../Form/UpdateMutation'
import withUser from '../../HOC/withUser'

function removeProperty(listPublication) {
  const {user, createdOn, formatDate, ...rest} = listPublication
  return rest
}

function Publication(props) {
  const _id = props.params
  return (
    <Query query={LIST_PUBLICATION} variables={{_id}}>
      {({data, loading, error}) => {
        if (loading) return null
        return (
          <Mutation
            mutation={UPDATE_PUBLICATION}
            refetchQueries={() => [
              {
                query: LIST_PUBLICATIONS
              }
            ]}
          >
            {updatePublication => {
              const publication = removeProperty(data.listPublication)
              return (
                <Row style={{marginTop: '70px'}}>
                  <Col span={7} offset={8}>
                    <Card>
                      <UpdateMutation
                        data={{...publication, userId: props.user._id}}
                        mutation={updatePublication}
                      />
                    </Card>
                  </Col>
                </Row>
              )
            }}
          </Mutation>
        )
      }}
    </Query>
  )
}

export default compose(withUser)(Publication)
